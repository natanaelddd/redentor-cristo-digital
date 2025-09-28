import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, Zap } from 'lucide-react';
import { emergencyReload, clearBrowserCache } from '@/utils/cacheUtils';

export function EmergencyRecovery() {
  const [attempts, setAttempts] = useState(0);
  const [showEmergency, setShowEmergency] = useState(false);

  useEffect(() => {
    // Show emergency recovery if user has been trying to access admin
    const urlParams = new URLSearchParams(window.location.search);
    const adminAttempt = urlParams.get('admin_error');
    const cacheError = urlParams.get('cache_error');
    
    if (adminAttempt === 'true' || cacheError === 'true') {
      setShowEmergency(true);
    }

    // Check if we're in an error loop
    const errorCount = parseInt(sessionStorage.getItem('recovery_attempts') || '0');
    setAttempts(errorCount);
    
    if (errorCount > 0) {
      setShowEmergency(true);
    }
  }, []);

  const handleQuickFix = () => {
    try {
      clearBrowserCache();
      sessionStorage.setItem('recovery_attempts', '0');
      window.location.href = '/auth';
    } catch (error) {
      handleEmergencyReload();
    }
  };

  const handleEmergencyReload = () => {
    sessionStorage.setItem('recovery_attempts', (attempts + 1).toString());
    emergencyReload();
  };

  const handleDirectAdminAccess = () => {
    // Try direct access with cache bypass
    const timestamp = Date.now();
    window.location.href = `/auth?cache_bust=${timestamp}&admin_redirect=true`;
  };

  if (!showEmergency && attempts === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Recuperação de Emergência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Detectamos problemas de cache que podem estar impedindo o acesso ao admin. 
              {attempts > 0 && (
                <span className="block mt-2 text-sm text-muted-foreground">
                  Tentativas de recuperação: {attempts}
                </span>
              )}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Button 
              onClick={handleQuickFix} 
              className="w-full"
              variant="default"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Correção Rápida
            </Button>

            <Button 
              onClick={handleDirectAdminAccess} 
              className="w-full"
              variant="outline"
            >
              Tentar Acesso Direto ao Admin
            </Button>

            <Button 
              onClick={handleEmergencyReload} 
              className="w-full"
              variant="destructive"
            >
              <Zap className="h-4 w-4 mr-2" />
              Reload de Emergência
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Correção Rápida:</strong> Limpa cache e redireciona para login</p>
            <p><strong>Acesso Direto:</strong> Tenta bypass do cache para admin</p>
            <p><strong>Reload de Emergência:</strong> Limpa tudo e força recarregamento</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}