{
  "app": {
    "name": "El Embauco",
    "type": "Personal expense management (fintech)",
    "audience": "Individuals, non-technical users",
    "primary_tasks": [
      "View current balance, income, expenses",
      "Add/Edit/Delete transactions",
      "Track budgets and progress",
      "Visualize spend by category and over time",
      "Filter by date range and category",
      "Manage profile and preferences"
    ],
    "success_actions": [
      "User adds a transaction in <30s",
      "Understands where money went this month at a glance",
      "Budget over/under clearly indicated",
      "Charts readable on mobile",
      "Sidebar navigation is obvious and consistent"
    ],
    "brand_personality": ["trustworthy", "calm", "modern", "clear", "secure"]
  },

  "color_system": {
    "notes": "Fintech aesthetic with ocean blues + mint greens for trust and clarity. Avoid purple/pink and saturated dark gradients. Maintain WCAG AA contrast.",
    "tokens_hex": {
      "brand.ocean.900": "#0E2A35",
      "brand.ocean.700": "#14556B",
      "brand.ocean.600": "#186882",
      "brand.ocean.500": "#1C7D9E",
      "brand.ocean.100": "#E9F5F9",
      "brand.mint.600": "#0DAD8D",
      "brand.mint.400": "#43C6A8",
      "brand.mint.200": "#B7ECDE",
      "neutral.900": "#0E1113",
      "neutral.700": "#343A40",
      "neutral.500": "#6B7380",
      "neutral.200": "#E6E8EB",
      "neutral.100": "#F5F7F9",
      "success": "#20A05F",
      "warning": "#F59E0B",
      "danger": "#DC3545",
      "info": "#2F7DD0"
    },
    "css_variables_for_index.css": """
      @layer base {
        :root {
          /* Brand base (overrides/additions compatible with existing tokens) */
          --brand-ocean-900: 198 61% 13%; /* #0E2A35 */
          --brand-ocean-700: 197 67% 25%; /* #14556B */
          --brand-ocean-600: 197 68% 30%; /* #186882 */
          --brand-ocean-500: 197 69% 37%; /* #1C7D9E */
          --brand-ocean-100: 196 54% 95%; /* #E9F5F9 */

          --brand-mint-600: 168 86% 36%; /* #0DAD8D */
          --brand-mint-400: 167 57% 52%; /* #43C6A8 */
          --brand-mint-200: 165 62% 82%; /* #B7ECDE */

          --success: 152 67% 38%;
          --warning: 38 92% 50%;
          --danger: 354 70% 54%;
          --info: 210 62% 50%;

          /* UI Surfaces */
          --surface-default: var(--background);
          --surface-subtle: 210 20% 98%;
          --surface-elevated: 210 25% 99%;
          --ring-brand: var(--brand-ocean-600);

          /* Shadows & radii */
          --shadow-sm: 0 1px 2px rgba(14, 42, 53, 0.06);
          --shadow-md: 0 6px 16px rgba(14, 42, 53, 0.10);
          --shadow-lg: 0 16px 40px rgba(14, 42, 53, 0.12);
          --radius-sm: 6px;
          --radius-md: 10px;
          --radius-lg: 14px;

          /* Buttons */
          --btn-radius: var(--radius-md);
          --btn-shadow: 0 4px 10px rgba(28, 125, 158, 0.18);
          --btn-motion: 180ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .dark {
          --surface-subtle: 210 7% 10%;
          --surface-elevated: 210 9% 12%;
          --shadow-sm: 0 1px 2px rgba(0,0,0,0.25);
          --shadow-md: 0 6px 16px rgba(0,0,0,0.35);
          --shadow-lg: 0 16px 40px rgba(0,0,0,0.45);
        }
      }
    """,
    "usage": {
      "primary": "bg-[hsl(var(--brand-ocean-600))] text-white",
      "primary-hover": "hover:bg-[hsl(var(--brand-ocean-700))]",
      "accent": "text-[hsl(var(--brand-mint-600))]",
      "surface": "bg-[hsl(var(--surface-elevated))]",
      "card": "bg-card text-card-foreground border border-[hsl(var(--border))]",
      "focus": "ring-2 ring-[hsl(var(--ring-brand))] ring-offset-2"
    },
    "charts_palette": [
      "#1C7D9E", "#43C6A8", "#F59E0B", "#2F7DD0", "#20A05F", "#6B7380"
    ],
    "gradient_rules": {
      "allowed": [
        "Section backgrounds (hero/top bar accent) using 2–3 light colors only",
        "Decorative overlays not covering content blocks"
      ],
      "example_gradients_css": [
        "bg-[linear-gradient(135deg,theme(colors.sky.50),theme(colors.teal.50))]",
        "bg-[linear-gradient(180deg,#E9F5F9_0%,#FFFFFF_100%)]"
      ],
      "prohibited": [
        "Dark/saturated purple/pink/blue mixes",
        "Gradients on content-heavy cards, tables, or small UI elements"
      ]
    }
  },

  "typography": {
    "fonts": {
      "heading": "Space Grotesk",
      "body": "Figtree",
      "mono": "Source Code Pro"
    },
    "google_fonts_import": "<link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Figtree:wght@400;500;600;700&display=swap\" rel=\"stylesheet\">",
    "base_classes": {
      "h1": "font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--brand-ocean-900))]",
      "h2": "text-base md:text-lg font-medium text-[hsl(var(--brand-ocean-700))]",
      "body": "text-base sm:text-sm text-foreground",
      "muted": "text-sm text-muted-foreground"
    },
    "rules": [
      "Use Space Grotesk for headings, Figtree for paragraphs/UI",
      "Increase spacing line-height to 1.5–1.7 for body",
      "Avoid all caps for long labels; use case-sensitive forms"
    ]
  },

  "layout": {
    "pattern": "Left sidebar + top header + content grid",
    "grid": {
      "mobile": "single column, section spacing 32–40px",
      "tablet": "2-column content grid (minmax(0,1fr) x2)",
      "desktop": "3-column grid for dashboard cards where relevant",
      "container": "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8"
    },
    "sidebar": {
      "width": "280px desktop, 76px collapsed",
      "mobile": "use Sheet component for slide-in",
      "style": "bg-[hsl(var(--surface-subtle))] border-r",
      "nav_item": "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-[hsl(var(--brand-ocean-100))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring-brand))]"
    },
    "header": {
      "height": "64px",
      "style": "backdrop-blur bg-white/70 border-b supports-[backdrop-filter]:bg-white/60",
      "contents": ["page title", "date range filter (Calendar)", "quick add transaction Button", "profile menu"]
    },
    "cards": {
      "base": "rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border bg-[hsl(var(--surface-elevated))]",
      "hover": "hover:shadow-[var(--shadow-md)] transition-shadow",
      "metric": "p-5 sm:p-6 flex items-start justify-between"
    },
    "spacing": {
      "section_y": "py-8 sm:py-12 lg:py-16",
      "gap": "gap-4 sm:gap-6 lg:gap-8"
    },
    "do_not": [
      "Do not center the entire app container; keep left-aligned flow",
      "Avoid applying .App-header centering styles from CRA boilerplate"
    ]
  },

  "pages": {
    "login": {
      "goal": "Fast, reassuring sign-in with strong visual trust cues",
      "layout": "Split-screen on desktop (left: brand panel with light gradient/illustration; right: Card with form). Single-column stacked on mobile.",
      "components": ["Card", "Input", "Label", "Button", "Checkbox", "Sonner", "Alert"],
      "form_fields": ["email", "password", "remember me"],
      "classes": {
        "panel": "bg-[linear-gradient(180deg,#E9F5F9_0%,#FFFFFF_100%)]",
        "brand": "text-[hsl(var(--brand-ocean-700))]",
        "button": "bg-[hsl(var(--brand-ocean-600))] hover:bg-[hsl(var(--brand-ocean-700))] text-white rounded-[var(--btn-radius)] shadow-[var(--btn-shadow)]"
      },
      "js_scaffold": """
        // LoginPage.jsx
        import React from 'react'
        import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card'
        import { Input } from './components/ui/input'
        import { Label } from './components/ui/label'
        import { Button } from './components/ui/button'
        import { Checkbox } from './components/ui/checkbox'
        import { Toaster, toast } from './components/ui/sonner'

        export default function LoginPage() {
          function onSubmit(e){
            e.preventDefault()
            toast.success('Welcome back')
          }
          return (
            <div className="min-h-screen grid lg:grid-cols-2">
              <div className="hidden lg:flex items-center justify-center p-10 bg-[linear-gradient(135deg,#E9F5F9,#FFFFFF)]">
                <div className="max-w-sm">
                  <h1 className="font-heading text-5xl text-[hsl(var(--brand-ocean-900))]">El Embauco</h1>
                  <p className="mt-3 text-muted-foreground">Track expenses with clarity and confidence.</p>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 sm:p-10">
                <Card className="w-full max-w-md" data-testid="login-card">
                  <CardHeader>
                    <CardTitle className="font-heading">Sign in</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={onSubmit} className="grid gap-4" data-testid="login-form">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required data-testid="login-form-email-input" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required data-testid="login-form-password-input" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox id="remember" data-testid="login-form-remember-checkbox" />
                          <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <a href="/reset" className="text-sm text-[hsl(var(--brand-ocean-600))]" data-testid="login-forgot-link">Forgot?</a>
                      </div>
                      <Button type="submit" className="bg-[hsl(var(--brand-ocean-600))] hover:bg-[hsl(var(--brand-ocean-700))]" data-testid="login-form-submit-button">Sign in</Button>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Toaster />
                  </CardFooter>
                </Card>
              </div>
            </div>
          )
        }
      """
    },
    "password_reset": {
      "layout": "Single card form with email input and send/reset actions",
      "components": ["Card", "Input", "Label", "Button", "Alert"],
      "notes": "Make success state explicit and reassuring with info coloring"
    },
    "dashboard": {
      "sections": [
        "KPIs: income, expenses, balance (3–4 metric cards)",
        "Budget tracker with Progress",
        "Charts: monthly trend (line/area), category distribution (pie/treemap)",
        "Recent transactions table",
        "Filters: date range (Calendar), category select"
      ],
      "bento_grid": "Responsive cards with varied spans; use CSS grid with auto-fit and minmax for flexibility"
    },
    "transactions": {
      "features": ["CRUD with Dialog for create/edit", "Table with sorting, search, pagination", "Bulk delete with Confirm"],
      "filters": ["date range", "category", "type (income/expense)"]
    },
    "charts": {
      "features": ["Line/Area over time", "Pie/Donut by category", "Stacked bars by month", "Empty states with helpful copy"],
      "interactions": ["hover tooltip", "legend toggle", "range select"]
    },
    "profile": {
      "features": ["avatar & name", "currency & locale", "security (password)", "theme toggle"]
    }
  },

  "components": {
    "buttons": {
      "style": "Professional/Corporate",
      "variants": {
        "primary": "bg-[hsl(var(--brand-ocean-600))] text-white hover:bg-[hsl(var(--brand-ocean-700))] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring-brand))] rounded-[var(--btn-radius)] shadow-[var(--btn-shadow)] transition-colors",
        "secondary": "bg-[hsl(var(--brand-mint-200))] text-[hsl(var(--brand-ocean-900))] hover:bg-[hsl(var(--brand-mint-400))]/20 rounded-[var(--btn-radius)] border transition-colors",
        "ghost": "bg-transparent hover:bg-[hsl(var(--brand-ocean-100))] text-[hsl(var(--brand-ocean-700))] rounded-[var(--btn-radius)]"
      },
      "sizes": {
        "sm": "h-9 px-3 text-sm",
        "md": "h-10 px-4 text-sm",
        "lg": "h-12 px-5 text-base"
      },
      "testid_rule": "Every Button must include data-testid describing action, e.g., data-testid=\"add-transaction-button\""
    },
    "nav": {
      "items": ["Dashboard", "Transactions", "Charts", "Budget", "Profile"],
      "active_class": "bg-[hsl(var(--brand-ocean-100))] text-[hsl(var(--brand-ocean-700))]",
      "badge": "ml-auto rounded-full bg-[hsl(var(--brand-mint-200))] text-[hsl(var(--brand-ocean-700))] px-2 py-0.5 text-xs"
    },
    "cards": {
      "metric_kpi": {
        "structure": ["label", "value", "delta"],
        "colors": {
          "positive": "text-[hsl(var(--success))]",
          "negative": "text-[hsl(var(--danger))]"
        },
        "example_html": "<div class=\"p-5 rounded-[var(--radius-lg)] bg-[hsl(var(--surface-elevated))] border shadow-[var(--shadow-sm)]\" data-testid=\"kpi-balance-card\"></div>"
      },
      "budget": {
        "use": "Progress component with goal, spent, remaining, ETA",
        "class": "p-5",
        "over_class": "text-[hsl(var(--danger))]"
      }
    },
    "forms": {
      "input": "border-input focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring-brand))]",
      "select": "focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring-brand))]",
      "error": "text-[hsl(var(--danger))] text-sm mt-1"
    },
    "tables": {
      "row": "hover:bg-[hsl(var(--brand-ocean-100))] transition-colors",
      "money_cell": "tabular-nums text-right"
    }
  },

  "charts_and_viz": {
    "library": "Recharts (primary). D3.js optional for custom legends/treemaps.",
    "install": [
      "npm i recharts",
      "npm i d3 --save (optional)"
    ],
    "color_mapping": {
      "income": "#20A05F",
      "expense": "#DC3545",
      "transfer": "#2F7DD0",
      "neutral": "#6B7380"
    },
    "patterns": {
      "time_series": "Use AreaChart with gradient fill from brand.ocean.100 to transparent; axis with muted labels",
      "category_pie": "PieChart with innerRadius for donut; max 8 categories + 'Others'",
      "budget_progress": "Progress bar + percentage + remaining amount",
      "empty_state": "Muted icon, helpful text, and CTA to add first transaction"
    },
    "js_example": """
      // Charts.jsx
      import React from 'react'
      import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

      const COLORS = ['#1C7D9E','#43C6A8','#F59E0B','#2F7DD0','#20A05F','#6B7380']

      export function MonthlyTrend({ data = [] }){
        return (
          <div className="h-64" data-testid="monthly-trend-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                <defs>
                  <linearGradient id="oceanFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1C7D9E" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1C7D9E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6E8EB" />
                <XAxis dataKey="label" tick={{ fill: '#6B7380', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6B7380', fontSize: 12 }} tickFormatter={(v)=>`$${v}`} />
                <Tooltip formatter={(v)=>`$${v}`} contentStyle={{ borderRadius: 10 }} />
                <Area type="monotone" dataKey="amount" stroke="#1C7D9E" fillOpacity={1} fill="url(#oceanFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )
      }

      export function CategoryDonut({ data = [] }){
        return (
          <div className="h-64" data-testid="category-donut-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={24} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )
      }
    """
  },

  "motion_and_microinteractions": {
    "principles": [
      "Every interactive element has a hover/focus/active state",
      "Use entrance animations for cards and charts; keep durations short (160–240ms)",
      "Respect prefers-reduced-motion: reduce movement, fade instead of move"
    ],
    "install": ["npm i framer-motion"],
    "examples": {
      "card_enter": "motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.22, ease: [0.22,1,0.36,1] }}",
      "button_hover": "transition-colors duration-200 hover:-translate-y-0 focus-visible:translate-y-0", 
      "avoid": "Never use transition-all; specify transition-colors/opacity/transform individually"
    }
  },

  "accessibility": {
    "contrast": "Maintain at least 4.5:1 for text. Use ocean-700 on white and white on ocean-600.",
    "focus": "Always visible ring using ring-[hsl(var(--ring-brand))] ring-offset-2",
    "keyboard": "All dialogs, menus, and forms must be keyboard navigable",
    "screen_reader": "Use aria-live for toasts and error messages",
    "reduced_motion": "Use prefers-reduced-motion media queries to disable large movements"
  },

  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid in kebab-case with role-based names.",
    "examples": [
      "data-testid=\"add-transaction-button\"",
      "data-testid=\"transactions-table\"",
      "data-testid=\"balance-kpi-value\"",
      "data-testid=\"budget-progress-bar\"",
      "data-testid=\"date-range-calendar\""
    ]
  },

  "shadcn_components_and_paths": {
    "Button": "./components/ui/button",
    "Card": "./components/ui/card",
    "Input": "./components/ui/input",
    "Label": "./components/ui/label",
    "Checkbox": "./components/ui/checkbox",
    "Alert": "./components/ui/alert",
    "Dialog": "./components/ui/dialog",
    "Drawer (Sheet)": "./components/ui/sheet",
    "Select": "./components/ui/select",
    "Tabs": "./components/ui/tabs",
    "Table": "./components/ui/table",
    "Progress": "./components/ui/progress",
    "Calendar": "./components/ui/calendar",
    "Tooltip": "./components/ui/tooltip",
    "Popover": "./components/ui/popover",
    "Separator": "./components/ui/separator",
    "ScrollArea": "./components/ui/scroll-area",
    "Skeleton": "./components/ui/skeleton",
    "Sonner (Toaster)": "./components/ui/sonner"
  },

  "page_skeletons_js": {
    "DashboardPage.jsx": """
      import React from 'react'
      import { Card } from './components/ui/card'
      import { Button } from './components/ui/button'
      import { Progress } from './components/ui/progress'
      import { Calendar } from './components/ui/calendar'
      import { MonthlyTrend, CategoryDonut } from './Charts'

      export default function DashboardPage(){
        return (
          <div className="space-y-6" data-testid="dashboard-page">
            <div className="flex items-center justify-between gap-3">
              <h1 className="font-heading text-2xl sm:text-3xl">Overview</h1>
              <div className="flex items-center gap-2">
                <div className="hidden md:block" data-testid="date-range-calendar">
                  <Calendar mode="range" numberOfMonths={2} />
                </div>
                <Button className="bg-[hsl(var(--brand-ocean-600))] hover:bg-[hsl(var(--brand-ocean-700))]" data-testid="add-transaction-button">Add transaction</Button>
              </div>
            </div>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="p-5" data-testid="kpi-income-card">{/* income KPI */}</Card>
              <Card className="p-5" data-testid="kpi-expenses-card">{/* expenses KPI */}</Card>
              <Card className="p-5" data-testid="kpi-balance-card">{/* balance KPI */}</Card>
            </section>

            <section className="grid gap-4 lg:grid-cols-3">
              <Card className="p-5 lg:col-span-2" data-testid="monthly-trend-card"><MonthlyTrend data={[]} /></Card>
              <Card className="p-5" data-testid="category-donut-card"><CategoryDonut data={[]} /></Card>
            </section>

            <section className="grid gap-4">
              <Card className="p-0" data-testid="recent-transactions-card">{/* table here */}</Card>
            </section>
          </div>
        )
      }
    """,
    "TransactionsPage.jsx": """
      import React from 'react'
      import { Card } from './components/ui/card'
      import { Table } from './components/ui/table'
      import { Button } from './components/ui/button'
      import { Dialog } from './components/ui/dialog'

      export default function TransactionsPage(){
        return (
          <div className="space-y-6" data-testid="transactions-page">
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-2xl">Transactions</h1>
              <Button data-testid="transactions-add-button">Add</Button>
            </div>
            <Card className="p-0" data-testid="transactions-table-card">{/* shadcn Table */}</Card>
          </div>
        )
      }
    """
  },

  "images_and_textures": {
    "usage": "Use light abstract ocean/mint textures for hero or empty-state backgrounds only. Do not interfere with content readability.",
    "image_urls": [
      {
        "url": "https://images.unsplash.com/photo-1687868803274-b800be48c907?crop=entropy&cs=srgb&fm=jpg&q=85",
        "category": "hero/section background",
        "description": "Blue-green soft waves; use as decorative section background with overlay to keep text readable"
      },
      {
        "url": "https://images.unsplash.com/photo-1747940920075-a7d374028543?crop=entropy&cs=srgb&fm=jpg&q=85",
        "category": "texture overlay",
        "description": "Subtle teal/blue fabric-like texture for noise overlay at 6–10% opacity"
      },
      {
        "url": "https://images.unsplash.com/photo-1615714571974-773b34093d23?crop=entropy&cs=srgb&fm=jpg&q=85",
        "category": "empty states",
        "description": "Striped blue-green gradient blocks; crop as a small decorative edge, not under text"
      }
    ]
  },

  "libraries_and_integration": {
    "primary": ["shadcn/ui components from ./components/ui", "TailwindCSS"],
    "charts": ["Recharts", "D3.js (optional)"] ,
    "motion": ["Framer Motion"],
    "icons": ["lucide-react via CDN or package if already configured"],
    "toasts": ["Sonner from ./components/ui/sonner"],
    "date": ["shadcn Calendar for range filter"],
    "installation_steps": [
      "npm i recharts",
      "npm i framer-motion",
      "(optional) npm i d3"
    ]
  },

  "component_path": {
    "button": "/app/frontend/src/components/ui/button.jsx",
    "card": "/app/frontend/src/components/ui/card.jsx",
    "input": "/app/frontend/src/components/ui/input.jsx",
    "label": "/app/frontend/src/components/ui/label.jsx",
    "checkbox": "/app/frontend/src/components/ui/checkbox.jsx",
    "alert": "/app/frontend/src/components/ui/alert.jsx",
    "dialog": "/app/frontend/src/components/ui/dialog.jsx",
    "sheet": "/app/frontend/src/components/ui/sheet.jsx",
    "select": "/app/frontend/src/components/ui/select.jsx",
    "tabs": "/app/frontend/src/components/ui/tabs.jsx",
    "table": "/app/frontend/src/components/ui/table.jsx",
    "progress": "/app/frontend/src/components/ui/progress.jsx",
    "calendar": "/app/frontend/src/components/ui/calendar.jsx",
    "tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
    "popover": "/app/frontend/src/components/ui/popover.jsx",
    "separator": "/app/frontend/src/components/ui/separator.jsx",
    "scroll_area": "/app/frontend/src/components/ui/scroll-area.jsx",
    "skeleton": "/app/frontend/src/components/ui/skeleton.jsx",
    "sonner": "/app/frontend/src/components/ui/sonner.jsx"
  },

  "instructions_to_main_agent": """
    1) Update /app/frontend/src/index.css: paste the provided css_variables_for_index.css under @layer base to extend tokens. Do not center the app container.
    2) Use shadcn components listed in shadcn_components_and_paths. Do not use native HTML replacements for dropdowns, calendars, or toasts.
    3) Implement sidebar layout with Sheet on mobile. Keep left-aligned reading flow. Avoid transition-all.
    4) Apply color_system. Adhere to Gradient Restriction Rule: gradients only for section backgrounds; keep under 20% viewport and never on text-heavy content.
    5) Implement charts with Recharts using charts_and_viz.js_example as reference. Ensure tooltips, legends, and empty states. Add data-testid to all interactive and key informational elements.
    6) Respect typography and spacing. Import Google Fonts in index.html and set font-family: heading -> Space Grotesk; body -> Figtree.
    7) Use Calendar for date range filters in Dashboard and Transactions. If a calendar is shown, it MUST be the shadcn Calendar component.
    8) Add microinteractions via Framer Motion for section/card entrances and specific hover transitions (colors/opacity only). Respect prefers-reduced-motion.
    9) Use Sonner toasts for confirmation/success/error. Make sure aria-live is used and include data-testid in toast content wrappers if tested.
    10) Ensure WCAG AA contrast and keyboard accessibility across dialogs, menus, forms.
  """,

  "inspiration_sources": {
    "fintech_dashboards": [
      {
        "title": "Finance Tracker App – Income/Expense Report Dashboard",
        "url": "https://dribbble.com/shots/26557637-Finance-Tracker-App-Income-Expense-Report-Dashboard"
      },
      {
        "title": "Behance – Fintech Dashboard UI Collections",
        "url": "https://www.behance.net/search/projects/fintech%20dashboard%20ui?locale=en_US"
      }
    ],
    "palette_references": [
      {
        "title": "Blue + Mint palette considerations",
        "url": "https://piktochart.com/tips/blue-mint-green-color-palette"
      },
      {
        "title": "Accessible colors guidance",
        "url": "https://venngage.com/blog/accessible-colors/"
      }
    ]
  },

  "general_ui_ux_design_guidelines_appendix": """
- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
- NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**


- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
  """
}
