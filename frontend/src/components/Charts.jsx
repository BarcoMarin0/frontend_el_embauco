import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from 'recharts';

const COLORS = ['#1C7D9E', '#43C6A8', '#F59E0B', '#2F7DD0', '#20A05F', '#6B7380'];

// Monthly Trend Chart
export function MonthlyTrendChart() {
  const data = [
    { label: 'Ene', amount: 2200000 },
    { label: 'Feb', amount: 2800000 },
    { label: 'Mar', amount: 2400000 },
    { label: 'Abr', amount: 3100000 },
    { label: 'May', amount: 2900000 },
    { label: 'Jun', amount: 3400000 },
  ];

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="h-64" data-testid="monthly-trend-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="oceanFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1C7D9E" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#1C7D9E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E6E8EB" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#6B7380', fontSize: 12 }}
            axisLine={{ stroke: '#E6E8EB' }}
          />
          <YAxis
            tick={{ fill: '#6B7380', fontSize: 12 }}
            tickFormatter={formatCurrency}
            axisLine={{ stroke: '#E6E8EB' }}
          />
          <Tooltip
            formatter={(value) => [`${formatCurrency(value)}`, 'Monto']}
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #E6E8EB',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#1C7D9E"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#oceanFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Category Donut Chart
export function CategoryDonutChart() {
  const data = [
    { name: 'Alimentación', value: 850000 },
    { name: 'Transporte', value: 420000 },
    { name: 'Entretenimiento', value: 380000 },
    { name: 'Servicios', value: 320000 },
    { name: 'Otros', value: 480000 },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="h-64" data-testid="category-donut-chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Monthly Bar Chart
export function MonthlyBarChart() {
  const data = [
    { month: 'Ene', ingresos: 2500000, gastos: 1800000 },
    { month: 'Feb', ingresos: 2800000, gastos: 2100000 },
    { month: 'Mar', ingresos: 2600000, gastos: 1900000 },
    { month: 'Abr', ingresos: 3200000, gastos: 2400000 },
    { month: 'May', ingresos: 2900000, gastos: 2200000 },
    { month: 'Jun', ingresos: 3500000, gastos: 2600000 },
  ];

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="h-80" data-testid="monthly-bar-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E6E8EB" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#6B7380', fontSize: 12 }}
            axisLine={{ stroke: '#E6E8EB' }}
          />
          <YAxis
            tick={{ fill: '#6B7380', fontSize: 12 }}
            tickFormatter={formatCurrency}
            axisLine={{ stroke: '#E6E8EB' }}
          />
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #E6E8EB',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
          />
          <Bar dataKey="ingresos" fill="#20A05F" radius={[8, 8, 0, 0]} />
          <Bar dataKey="gastos" fill="#DC3545" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}