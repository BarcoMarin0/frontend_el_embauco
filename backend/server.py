from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta, timezone
import jwt
import bcrypt
import os
import uuid
import base64
import json
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

# Load environment variables
load_dotenv()

app = FastAPI(title="Gestor de Gastos", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
JWT_SECRET = os.environ.get('JWT_SECRET', 'expense_manager_secret_key_2024')
JWT_ALGORITHM = 'HS256'

# Database setup
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(MONGO_URL)
db = client.expense_manager

# OpenAI Integration
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', 'sk-emergent-90e3a5514644eA653B')
image_gen = OpenAIImageGeneration(api_key=EMERGENT_LLM_KEY)

# Pydantic Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class UserLogin(BaseModel):
    email: str
    password: str

class ExpenseCategory(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    color: str = "#6366f1"
    user_id: str

class Expense(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    amount: float
    category_id: str
    category_name: str = ""
    description: str
    date: datetime
    attachment_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ExpenseCreate(BaseModel):
    amount: float
    category_id: str
    description: str
    date: datetime

class ExpenseUpdate(BaseModel):
    amount: Optional[float] = None
    category_id: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None

class ChartRequest(BaseModel):
    chart_type: str  # "pie", "bar", "line"
    date_from: datetime
    date_to: datetime
    group_by: str = "category"  # "category", "month", "day"

# Helper functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_jwt_token(user_id: str) -> str:
    payload = {
        'user_id': user_id,
        'exp': datetime.now(timezone.utc) + timedelta(days=7)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> str:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    user_id = verify_jwt_token(credentials.credentials)
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return User(**user)

def prepare_for_mongo(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, datetime):
                data[key] = value.isoformat()
    return data

def parse_from_mongo(item):
    if isinstance(item, dict):
        for key, value in item.items():
            if isinstance(value, str) and key in ['date', 'created_at']:
                try:
                    item[key] = datetime.fromisoformat(value.replace('Z', '+00:00'))
                except:
                    pass
    return item

# Routes

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Gestor de Gastos API"}

# Authentication Routes
@app.post("/api/auth/register")
async def register(user_data: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user = User(
        email=user_data.email,
        name=user_data.name
    )
    
    # Hash password and save
    user_dict = user.dict()
    user_dict['password'] = hash_password(user_data.password)
    user_dict = prepare_for_mongo(user_dict)
    
    await db.users.insert_one(user_dict)
    
    # Create default categories
    default_categories = [
        {"name": "Alimentación", "color": "#ef4444"},
        {"name": "Transporte", "color": "#f97316"},
        {"name": "Entretenimiento", "color": "#8b5cf6"},
        {"name": "Salud", "color": "#10b981"},
        {"name": "Servicios", "color": "#3b82f6"},
        {"name": "Otros", "color": "#6b7280"}
    ]
    
    for cat_data in default_categories:
        category = ExpenseCategory(
            name=cat_data["name"],
            color=cat_data["color"],
            user_id=user.id
        )
        await db.categories.insert_one(category.dict())
    
    token = create_jwt_token(user.id)
    return {"token": token, "user": user}

@app.post("/api/auth/login")
async def login(login_data: UserLogin):
    user = await db.users.find_one({"email": login_data.email})
    if not user or not verify_password(login_data.password, user['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user = parse_from_mongo(user)
    token = create_jwt_token(user['id'])
    return {"token": token, "user": User(**user)}

# Category Routes
@app.get("/api/categories", response_model=List[ExpenseCategory])
async def get_categories(current_user: User = Depends(get_current_user)):
    categories = await db.categories.find({"user_id": current_user.id}).to_list(length=None)
    return [ExpenseCategory(**cat) for cat in categories]

@app.post("/api/categories", response_model=ExpenseCategory)
async def create_category(name: str, color: str = "#6366f1", current_user: User = Depends(get_current_user)):
    category = ExpenseCategory(name=name, color=color, user_id=current_user.id)
    await db.categories.insert_one(category.dict())
    return category

# Expense Routes
@app.get("/api/expenses", response_model=List[Expense])
async def get_expenses(
    limit: int = 50,
    offset: int = 0,
    category_id: Optional[str] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    current_user: User = Depends(get_current_user)
):
    query = {"user_id": current_user.id}
    
    if category_id:
        query["category_id"] = category_id
    
    if date_from or date_to:
        date_query = {}
        if date_from:
            date_query["$gte"] = date_from.isoformat()
        if date_to:
            date_query["$lte"] = date_to.isoformat()
        query["date"] = date_query
    
    expenses = await db.expenses.find(query).skip(offset).limit(limit).sort("date", -1).to_list(length=None)
    
    # Enrich with category names
    for expense in expenses:
        if expense.get('category_id'):
            category = await db.categories.find_one({"id": expense['category_id']})
            if category:
                expense['category_name'] = category['name']
        expense = parse_from_mongo(expense)
    
    return [Expense(**expense) for expense in expenses]

@app.post("/api/expenses", response_model=Expense)
async def create_expense(expense_data: ExpenseCreate, current_user: User = Depends(get_current_user)):
    # Get category name
    category = await db.categories.find_one({"id": expense_data.category_id})
    category_name = category['name'] if category else "Unknown"
    
    expense = Expense(
        user_id=current_user.id,
        amount=expense_data.amount,
        category_id=expense_data.category_id,
        category_name=category_name,
        description=expense_data.description,
        date=expense_data.date
    )
    
    expense_dict = prepare_for_mongo(expense.dict())
    await db.expenses.insert_one(expense_dict)
    return expense

@app.put("/api/expenses/{expense_id}", response_model=Expense)
async def update_expense(
    expense_id: str, 
    expense_data: ExpenseUpdate, 
    current_user: User = Depends(get_current_user)
):
    expense = await db.expenses.find_one({"id": expense_id, "user_id": current_user.id})
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    update_data = {}
    if expense_data.amount is not None:
        update_data["amount"] = expense_data.amount
    if expense_data.category_id is not None:
        update_data["category_id"] = expense_data.category_id
        # Update category name
        category = await db.categories.find_one({"id": expense_data.category_id})
        update_data["category_name"] = category['name'] if category else "Unknown"
    if expense_data.description is not None:
        update_data["description"] = expense_data.description
    if expense_data.date is not None:
        update_data["date"] = expense_data.date.isoformat()
    
    await db.expenses.update_one({"id": expense_id}, {"$set": update_data})
    
    updated_expense = await db.expenses.find_one({"id": expense_id})
    updated_expense = parse_from_mongo(updated_expense)
    return Expense(**updated_expense)

@app.delete("/api/expenses/{expense_id}")
async def delete_expense(expense_id: str, current_user: User = Depends(get_current_user)):
    result = await db.expenses.delete_one({"id": expense_id, "user_id": current_user.id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Expense not found")
    return {"message": "Expense deleted successfully"}

# Dashboard Routes
@app.get("/api/dashboard/stats")
async def get_dashboard_stats(current_user: User = Depends(get_current_user)):
    # Get current month expenses
    now = datetime.now(timezone.utc)
    start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    month_query = {
        "user_id": current_user.id,
        "date": {"$gte": start_of_month.isoformat()}
    }
    
    month_expenses = await db.expenses.find(month_query).to_list(length=None)
    total_month = sum(expense['amount'] for expense in month_expenses)
    
    # Get expenses by category this month
    category_totals = {}
    for expense in month_expenses:
        cat_name = expense.get('category_name', 'Sin categoría')
        category_totals[cat_name] = category_totals.get(cat_name, 0) + expense['amount']
    
    # Get last 6 months totals
    monthly_totals = []
    for i in range(6):
        month_start = (now.replace(day=1) - timedelta(days=i*30)).replace(hour=0, minute=0, second=0, microsecond=0)
        month_end = (month_start + timedelta(days=32)).replace(day=1) - timedelta(seconds=1)
        
        month_expenses = await db.expenses.find({
            "user_id": current_user.id,
            "date": {
                "$gte": month_start.isoformat(),
                "$lte": month_end.isoformat()
            }
        }).to_list(length=None)
        
        total = sum(expense['amount'] for expense in month_expenses)
        monthly_totals.append({
            "month": month_start.strftime("%Y-%m"),
            "total": total
        })
    
    # Total expenses count
    total_expenses = await db.expenses.count_documents({"user_id": current_user.id})
    
    return {
        "total_month": total_month,
        "category_totals": category_totals,
        "monthly_totals": list(reversed(monthly_totals)),
        "total_expenses": total_expenses
    }

# AI Chart Generation
@app.post("/api/charts/generate")
async def generate_chart(chart_request: ChartRequest, current_user: User = Depends(get_current_user)):
    try:
        # Get expenses for the date range
        query = {
            "user_id": current_user.id,
            "date": {
                "$gte": chart_request.date_from.isoformat(),
                "$lte": chart_request.date_to.isoformat()
            }
        }
        
        expenses = await db.expenses.find(query).to_list(length=None)
        
        if not expenses:
            raise HTTPException(status_code=404, detail="No data found for the selected period")
        
        # Process data based on group_by
        data_summary = {}
        if chart_request.group_by == "category":
            for expense in expenses:
                cat_name = expense.get('category_name', 'Sin categoría')
                data_summary[cat_name] = data_summary.get(cat_name, 0) + expense['amount']
        
        # Create chart description for AI
        total_amount = sum(data_summary.values())
        chart_description = f"""
        Create a professional {chart_request.chart_type} chart showing expense data from {chart_request.date_from.strftime('%Y-%m-%d')} to {chart_request.date_to.strftime('%Y-%m-%d')}.
        
        Data to visualize:
        """
        
        for category, amount in data_summary.items():
            percentage = (amount / total_amount) * 100
            chart_description += f"- {category}: ${amount:.2f} ({percentage:.1f}%)\n"
        
        chart_description += f"""
        
        Total: ${total_amount:.2f}
        
        Style requirements:
        - Professional financial chart with clear labels
        - Use modern colors (blues, greens, purples)
        - Include title: "Gastos por Categoría"
        - Show amounts and percentages
        - Clean, business-style design
        - High contrast for readability
        """
        
        # Generate chart with AI
        images = await image_gen.generate_images(
            prompt=chart_description,
            model="gpt-image-1",
            number_of_images=1
        )
        
        if images and len(images) > 0:
            image_base64 = base64.b64encode(images[0]).decode('utf-8')
            return {
                "chart_image": image_base64,
                "data_summary": data_summary,
                "total_amount": total_amount
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to generate chart")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating chart: {str(e)}")

# File Upload for Attachments
@app.post("/api/expenses/{expense_id}/attachment")
async def upload_attachment(
    expense_id: str,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    # Verify expense exists and belongs to user
    expense = await db.expenses.find_one({"id": expense_id, "user_id": current_user.id})
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    # Read file and convert to base64
    file_content = await file.read()
    file_base64 = base64.b64encode(file_content).decode('utf-8')
    file_url = f"data:{file.content_type};base64,{file_base64}"
    
    # Update expense with attachment
    await db.expenses.update_one(
        {"id": expense_id},
        {"$set": {"attachment_url": file_url}}
    )
    
    return {"message": "Attachment uploaded successfully", "attachment_url": file_url}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)