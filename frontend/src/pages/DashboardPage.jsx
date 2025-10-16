import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Plus, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MonthlyTrendChart, CategoryDonutChart } from '../components/Charts';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export default function DashboardPage() {
  const [dateRange] = useState('Este mes');

  // Mock data
  const stats = {
    income: 5500000,
    expenses: 3200000,
    balance: 2300000,
    incomeChange: 12.5,
    expensesChange: -8.3,
    balanceChange: 15.2
  };

  const budgets = [
    { name: 'Alimentación', used: 450000, total: 600000, color: 'hsl(var(--brand-ocean-500))' },
    { name: 'Transporte', used: 180000, total: 200000, color: 'hsl(var(--brand-mint-600))' },
    { name: 'Entretenimiento', used: 280000, total: 300000, color: 'hsl(var(--warning))' },
  ];

  const recentTransactions = [
    { id: 1, description: 'Supermercado', amount: -85000, type: 'expense', category: 'Alimentación', date: '2025-01-15' },
    { id: 2, description: 'Salario', amount: 2500000, type: 'income', category: 'Ingreso', date: '2025-01-10' },
    { id: 3, description: 'Cine', amount: -35000, type: 'expense', category: 'Entretenimiento', date: '2025-01-14' },
    { id: 4, description: 'Gasolina', amount: -70000, type: 'expense', category: 'Transporte', date: '2025-01-12' },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6" data-testid="dashboard-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[hsl(var(--brand-ocean-900))]">Dashboard</h1>
          <p className="text-muted-foreground mt-1">{dateRange}</p>
        </div>
        <Button
          className="bg-[hsl(var(--brand-ocean-600))] hover:bg-[hsl(var(--brand-ocean-700))] text-white shadow-[var(--btn-shadow)] transition-colors"
          data-testid="add-transaction-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Transacción
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="shadow-custom-sm hover:shadow-custom-md transition-shadow" data-testid="kpi-income-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ingresos</p>
                  <p className="text-2xl font-bold text-[hsl(var(--brand-ocean-900))] mt-2" data-testid="kpi-income-value">
                    {formatCurrency(stats.income)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-[hsl(var(--success))]" />
                    <span className="text-sm text-[hsl(var(--success))]">{stats.incomeChange}%</span>
                  </div>
                </div>
                <div className="p-3 bg-[hsl(var(--success))]/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-[hsl(var(--success))]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="shadow-custom-sm hover:shadow-custom-md transition-shadow" data-testid="kpi-expenses-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gastos</p>
                  <p className="text-2xl font-bold text-[hsl(var(--brand-ocean-900))] mt-2" data-testid="kpi-expenses-value">
                    {formatCurrency(stats.expenses)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowDownRight className="w-4 h-4 text-[hsl(var(--success))]" />
                    <span className="text-sm text-[hsl(var(--success))]">{Math.abs(stats.expensesChange)}%</span>
                  </div>
                </div>
                <div className="p-3 bg-[hsl(var(--danger))]/10 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-[hsl(var(--danger))]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="shadow-custom-sm hover:shadow-custom-md transition-shadow" data-testid="kpi-balance-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Balance</p>
                  <p className="text-2xl font-bold text-[hsl(var(--brand-ocean-900))] mt-2" data-testid="kpi-balance-value">
                    {formatCurrency(stats.balance)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-[hsl(var(--success))]" />
                    <span className="text-sm text-[hsl(var(--success))]">{stats.balanceChange}%</span>
                  </div>
                </div>
                <div className="p-3 bg-[hsl(var(--brand-ocean-100))] rounded-lg">
                  <Wallet className="w-6 h-6 text-[hsl(var(--brand-ocean-600))]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="lg:col-span-2"
        >
          <Card className="shadow-custom-sm" data-testid="monthly-trend-card">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Tendencia Mensual</CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlyTrendChart />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={4} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="shadow-custom-sm" data-testid="category-donut-card">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Gastos por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryDonutChart />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Budget Progress */}
      <motion.div custom={5} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="shadow-custom-sm" data-testid="budget-progress-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Presupuestos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {budgets.map((budget, index) => {
              const percentage = (budget.used / budget.total) * 100;
              const isOverBudget = percentage > 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[hsl(var(--brand-ocean-900))]">{budget.name}</span>
                    <span className={`font-semibold ${isOverBudget ? 'text-[hsl(var(--danger))]' : 'text-muted-foreground'}`}>
                      {formatCurrency(budget.used)} / {formatCurrency(budget.total)}
                    </span>
                  </div>
                  <Progress
                    value={Math.min(percentage, 100)}
                    className="h-2"
                    data-testid={`budget-progress-${budget.name.toLowerCase()}`}
                  />
                  <p className="text-xs text-muted-foreground">
                    {percentage.toFixed(0)}% utilizado
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div custom={6} initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="shadow-custom-sm" data-testid="recent-transactions-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Transacciones Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[hsl(var(--brand-ocean-100))] transition-colors"
                  data-testid={`transaction-item-${transaction.id}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income'
                        ? 'bg-[hsl(var(--success))]/10'
                        : 'bg-[hsl(var(--danger))]/10'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-4 h-4 text-[hsl(var(--success))]" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-[hsl(var(--danger))]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-[hsl(var(--brand-ocean-900))]">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${
                      transaction.type === 'income'
                        ? 'text-[hsl(var(--success))]'
                        : 'text-[hsl(var(--danger))]'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                    </p>
                    <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString('es-CO')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}