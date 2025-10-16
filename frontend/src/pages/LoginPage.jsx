import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Alert, AlertDescription } from '../components/ui/alert';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, PieChart } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        toast.success('¡Bienvenido de vuelta!');
        navigate('/dashboard');
      } else {
        setError('Por favor ingresa email y contraseña');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex items-center justify-center p-10 bg-[linear-gradient(135deg,#E9F5F9,#FFFFFF)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--brand-mint-200))] rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[hsl(var(--brand-ocean-100))] rounded-full opacity-30 blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md z-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[hsl(var(--brand-ocean-600))] rounded-xl shadow-custom-md">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading text-5xl font-bold text-[hsl(var(--brand-ocean-900))]">El Embauco</h1>
          </div>
          <p className="text-lg text-[hsl(var(--brand-ocean-700))] mb-8">
            Gestiona tus gastos con claridad y confianza. Control total de tus finanzas personales.
          </p>
          
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur rounded-xl"
            >
              <TrendingUp className="w-6 h-6 text-[hsl(var(--brand-mint-600))]" />
              <span className="text-[hsl(var(--brand-ocean-700))]">Visualiza tus gastos mensuales</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur rounded-xl"
            >
              <PieChart className="w-6 h-6 text-[hsl(var(--brand-mint-600))]" />
              <span className="text-[hsl(var(--brand-ocean-700))]">Reportes detallados por categoría</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="p-2 bg-[hsl(var(--brand-ocean-600))] rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-heading text-3xl font-bold text-[hsl(var(--brand-ocean-900))]">El Embauco</h1>
            </div>
          </div>

          <Card className="shadow-custom-lg border-0" data-testid="login-card">
            <CardHeader className="space-y-1">
              <CardTitle className="font-heading text-2xl font-semibold text-[hsl(var(--brand-ocean-900))]">Iniciar Sesión</CardTitle>
              <CardDescription className="text-muted-foreground">
                Ingresa tus credenciales para acceder a tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
                {error && (
                  <Alert variant="destructive" data-testid="login-error-alert">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring-brand))]"
                    data-testid="login-form-email-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring-brand))]"
                    data-testid="login-form-password-input"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={remember}
                      onCheckedChange={setRemember}
                      data-testid="login-form-remember-checkbox"
                    />
                    <Label htmlFor="remember" className="text-sm cursor-pointer">Recordarme</Label>
                  </div>
                  <a
                    href="/reset-password"
                    className="text-sm text-[hsl(var(--brand-ocean-600))] hover:text-[hsl(var(--brand-ocean-700))] transition-colors"
                    data-testid="login-forgot-link"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[hsl(var(--brand-ocean-600))] hover:bg-[hsl(var(--brand-ocean-700))] text-white rounded-[var(--btn-radius)] shadow-[var(--btn-shadow)] transition-colors"
                  disabled={loading}
                  data-testid="login-form-submit-button"
                >
                  {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}