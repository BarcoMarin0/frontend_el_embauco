import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { DollarSign, ArrowLeft, Mail } from 'lucide-react';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      toast.success('Correo de recuperación enviado');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[linear-gradient(180deg,#E9F5F9_0%,#FFFFFF_100%)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--brand-mint-200))] rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[hsl(var(--brand-ocean-100))] rounded-full opacity-30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="p-2 bg-[hsl(var(--brand-ocean-600))] rounded-lg shadow-custom-md">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-[hsl(var(--brand-ocean-900))]">El Embauco</h1>
          </div>
        </div>

        <Card className="shadow-custom-lg border-0" data-testid="reset-password-card">
          <CardHeader className="space-y-1">
            <CardTitle className="font-heading text-2xl font-semibold text-[hsl(var(--brand-ocean-900))]">Recuperar Contraseña</CardTitle>
            <CardDescription className="text-muted-foreground">
              Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="reset-password-form">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring-brand))]"
                      data-testid="reset-password-email-input"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[hsl(var(--brand-ocean-600))] hover:bg-[hsl(var(--brand-ocean-700))] text-white rounded-[var(--btn-radius)] shadow-[var(--btn-shadow)] transition-colors"
                  disabled={loading}
                  data-testid="reset-password-submit-button"
                >
                  {loading ? 'Enviando...' : 'Enviar Instrucciones'}
                </Button>
              </form>
            ) : (
              <Alert className="border-[hsl(var(--success))] bg-[hsl(var(--success))]/10" data-testid="reset-password-success-alert">
                <AlertDescription className="text-[hsl(var(--success))]">
                  ✓ Hemos enviado un correo con instrucciones para restablecer tu contraseña. Por favor revisa tu bandeja de entrada.
                </AlertDescription>
              </Alert>
            )}

            <Button
              variant="ghost"
              className="w-full text-[hsl(var(--brand-ocean-600))] hover:bg-[hsl(var(--brand-ocean-100))] transition-colors"
              onClick={() => navigate('/login')}
              data-testid="reset-password-back-button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio de sesión
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}