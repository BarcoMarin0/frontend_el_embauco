import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';
import { User, Mail, Lock, Globe, DollarSign, Save } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Usuario Demo',
    email: 'usuario@email.com',
    currency: 'COP',
    locale: 'es-CO',
    dayOfMonth: '1'
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileSave = () => {
    toast.success('Perfil actualizado correctamente');
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    toast.success('Contraseña actualizada correctamente');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-6" data-testid="profile-page">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-semibold text-[hsl(var(--brand-ocean-900))]">Mi Perfil</h1>
        <p className="text-muted-foreground mt-1">Administra tu información personal y configuración</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-1"
        >
          <Card className="shadow-custom-sm" data-testid="profile-avatar-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-[hsl(var(--brand-mint-600))] text-white text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-[hsl(var(--brand-ocean-900))]">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                </div>
                <Button variant="outline" className="w-full" data-testid="profile-change-avatar-button">
                  Cambiar Avatar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal Information */}
          <Card className="shadow-custom-sm" data-testid="profile-info-card">
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <User className="w-5 h-5" />
                Información Personal
              </CardTitle>
              <CardDescription>Actualiza tu información personal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    data-testid="profile-name-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    data-testid="profile-email-input"
                  />
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currency" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Moneda
                  </Label>
                  <Select value={profile.currency} onValueChange={(value) => setProfile({ ...profile, currency: value })}>
                    <SelectTrigger id="currency" data-testid="profile-currency-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COP">COP - Peso Colombiano</SelectItem>
                      <SelectItem value="USD">USD - Dólar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locale" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Región
                  </Label>
                  <Select value={profile.locale} onValueChange={(value) => setProfile({ ...profile, locale: value })}>
                    <SelectTrigger id="locale" data-testid="profile-locale-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es-CO">Español (Colombia)</SelectItem>
                      <SelectItem value="es-ES">Español (España)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dayOfMonth">Día de Corte del Mes</Label>
                <Select value={profile.dayOfMonth} onValueChange={(value) => setProfile({ ...profile, dayOfMonth: value })}>
                  <SelectTrigger id="dayOfMonth" data-testid="profile-day-of-month-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                      <SelectItem key={day} value={day.toString()}>Día {day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Selecciona el día del mes en que comienza tu período de presupuesto
                </p>
              </div>

              <Button
                onClick={handleProfileSave}
                className="bg-[hsl(var(--brand-ocean-600))] hover:bg-[hsl(var(--brand-ocean-700))] text-white"
                data-testid="profile-save-button"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="shadow-custom-sm" data-testid="profile-security-card">
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Seguridad
              </CardTitle>
              <CardDescription>Cambia tu contraseña</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  data-testid="profile-current-password-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  data-testid="profile-new-password-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  data-testid="profile-confirm-password-input"
                />
              </div>

              <Button
                onClick={handlePasswordChange}
                variant="outline"
                data-testid="profile-change-password-button"
              >
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}