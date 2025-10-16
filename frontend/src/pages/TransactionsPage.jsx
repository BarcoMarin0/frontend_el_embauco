import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Plus, Search, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const transactions = [
    { id: 1, date: '2025-01-15', description: 'Supermercado Éxito', amount: -85000, type: 'expense', category: 'Alimentación', status: 'completed' },
    { id: 2, date: '2025-01-14', description: 'Cine Procinal', amount: -35000, type: 'expense', category: 'Entretenimiento', status: 'completed' },
    { id: 3, date: '2025-01-12', description: 'Gasolina Terpel', amount: -70000, type: 'expense', category: 'Transporte', status: 'completed' },
    { id: 4, date: '2025-01-10', description: 'Salario Mensual', amount: 2500000, type: 'income', category: 'Ingreso', status: 'completed' },
    { id: 5, date: '2025-01-08', description: 'Restaurante', amount: -120000, type: 'expense', category: 'Alimentación', status: 'completed' },
    { id: 6, date: '2025-01-05', description: 'Uber', amount: -25000, type: 'expense', category: 'Transporte', status: 'completed' },
    { id: 7, date: '2025-01-03', description: 'Freelance Proyecto', amount: 500000, type: 'income', category: 'Ingreso', status: 'pending' },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredTransactions = transactions.filter(t =>
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6" data-testid="transactions-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-[hsl(var(--brand-ocean-900))]">Transacciones</h1>
          <p className="text-muted-foreground mt-1">Gestiona todas tus transacciones</p>
        </div>
        <Button
          className="bg-[hsl(var(--brand-ocean-600))] hover:bg-[hsl(var(--brand-ocean-700))] text-white shadow-[var(--btn-shadow)] transition-colors"
          data-testid="transactions-add-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Transacción
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-custom-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Ingresos</p>
                  <p className="text-2xl font-bold text-[hsl(var(--success))] mt-2">
                    {formatCurrency(totalIncome)}
                  </p>
                </div>
                <div className="p-3 bg-[hsl(var(--success))]/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-[hsl(var(--success))]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="shadow-custom-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Gastos</p>
                  <p className="text-2xl font-bold text-[hsl(var(--danger))] mt-2">
                    {formatCurrency(totalExpenses)}
                  </p>
                </div>
                <div className="p-3 bg-[hsl(var(--danger))]/10 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-[hsl(var(--danger))]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-custom-sm" data-testid="transactions-filters-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar transacciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="transactions-search-input"
              />
            </div>
            <Button variant="outline" className="gap-2" data-testid="transactions-filter-button">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
            <Button variant="outline" className="gap-2" data-testid="transactions-export-button">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="shadow-custom-sm" data-testid="transactions-table-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Todas las Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-[hsl(var(--brand-ocean-100))] transition-colors"
                      data-testid={`transaction-row-${transaction.id}`}
                    >
                      <TableCell className="font-medium">
                        {new Date(transaction.date).toLocaleDateString('es-CO')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded ${
                            transaction.type === 'income'
                              ? 'bg-[hsl(var(--success))]/10'
                              : 'bg-[hsl(var(--danger))]/10'
                          }`}>
                            {transaction.type === 'income' ? (
                              <TrendingUp className="w-3 h-3 text-[hsl(var(--success))]" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-[hsl(var(--danger))]" />
                            )}
                          </div>
                          <span>{transaction.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {transaction.category}
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-right font-semibold tabular-nums ${
                        transaction.type === 'income'
                          ? 'text-[hsl(var(--success))]'
                          : 'text-[hsl(var(--danger))]'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                          className={transaction.status === 'completed' ? 'bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/20' : ''}
                        >
                          {transaction.status === 'completed' ? 'Completada' : 'Pendiente'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}