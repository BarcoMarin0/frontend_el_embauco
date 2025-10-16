import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MonthlyTrendChart, CategoryDonutChart, MonthlyBarChart } from '../components/Charts';
import { Calendar, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

export default function ChartsPage() {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="space-y-6" data-testid="charts-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[hsl(var(--brand-ocean-900))]">Gráficas y Reportes</h1>
          <p className="text-muted-foreground mt-1">Visualiza tus gastos e ingresos</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]" data-testid="charts-time-range-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mes</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs for different chart views */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="overview" data-testid="charts-tab-overview">
            <TrendingUp className="w-4 h-4 mr-2" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="categories" data-testid="charts-tab-categories">
            <PieChartIcon className="w-4 h-4 mr-2" />
            Categorías
          </TabsTrigger>
          <TabsTrigger value="trends" data-testid="charts-tab-trends">
            <TrendingUp className="w-4 h-4 mr-2" />
            Tendencias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-custom-sm" data-testid="overview-monthly-trend-card">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Tendencia de Gastos e Ingresos</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonthlyTrendChart />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="shadow-custom-sm" data-testid="overview-category-donut-card">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Distribución por Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <CategoryDonutChart />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="shadow-custom-sm" data-testid="overview-monthly-bar-card">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Comparación Mensual</CardTitle>
              </CardHeader>
              <CardContent>
                <MonthlyBarChart />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-custom-sm" data-testid="categories-expense-donut-card">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Gastos por Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <CategoryDonutChart />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="shadow-custom-sm" data-testid="categories-summary-card">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Resumen de Categorías</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Alimentación', amount: 850000, percentage: 35, color: 'hsl(var(--brand-ocean-500))' },
                      { name: 'Transporte', amount: 420000, percentage: 17, color: 'hsl(var(--brand-mint-600))' },
                      { name: 'Entretenimiento', amount: 380000, percentage: 16, color: 'hsl(var(--warning))' },
                      { name: 'Servicios', amount: 320000, percentage: 13, color: 'hsl(var(--info))' },
                      { name: 'Otros', amount: 480000, percentage: 19, color: 'hsl(var(--chart-5))' },
                    ].map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="font-medium text-sm">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">
                            {new Intl.NumberFormat('es-CO', {
                              style: 'currency',
                              currency: 'COP',
                              minimumFractionDigits: 0
                            }).format(category.amount)}
                          </p>
                          <p className="text-xs text-muted-foreground">{category.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-custom-sm" data-testid="trends-monthly-bar-card">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Tendencia Anual</CardTitle>
              </CardHeader>
              <CardContent>
                <MonthlyBarChart />
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="shadow-custom-sm" data-testid="trends-income-card">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Tendencia de Ingresos</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonthlyTrendChart />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="shadow-custom-sm" data-testid="trends-expenses-card">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Tendencia de Gastos</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonthlyTrendChart />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}