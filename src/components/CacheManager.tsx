import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  clearBrowserCache, 
  emergencyReload, 
  checkForCorruptedData,
  detectAndFixCacheIssues 
} from '@/utils/cacheUtils';

export function CacheManager() {
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [cacheStatus, setCacheStatus] = useState<{
    hasIssues: boolean;
    corruptedKeys: string[];
    lastCheck: Date | null;
  }>({
    hasIssues: false,
    corruptedKeys: [],
    lastCheck: null
  });

  const handleCacheCheck = async () => {
    setIsChecking(true);
    try {
      const hasIssues = detectAndFixCacheIssues();
      const corruptedKeys = checkForCorruptedData();
      
      setCacheStatus({
        hasIssues,
        corruptedKeys,
        lastCheck: new Date()
      });

      if (hasIssues || corruptedKeys.length > 0) {
        toast({
          title: "Problemas de cache detectados",
          description: `Encontrados ${corruptedKeys.length} problemas. Cache foi limpo automaticamente.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Cache saudável",
          description: "Nenhum problema detectado no cache.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao verificar cache",
        description: "Ocorreu um erro durante a verificação.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleClearCache = () => {
    try {
      clearBrowserCache();
      toast({
        title: "Cache limpo",
        description: "Cache do navegador foi limpo com sucesso.",
      });
      
      // Recarregar após limpar
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao limpar cache.",
        variant: "destructive",
      });
    }
  };

  const handleEmergencyReload = () => {
    if (confirm('Isso irá limpar todos os dados do cache e recarregar a página. Continuar?')) {
      emergencyReload();
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Gerenciador de Cache
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cacheStatus.lastCheck && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Última verificação: {cacheStatus.lastCheck.toLocaleString()}
                {cacheStatus.hasIssues || cacheStatus.corruptedKeys.length > 0 ? (
                  <span className="text-orange-600 ml-2">
                    - {cacheStatus.corruptedKeys.length} problemas encontrados
                  </span>
                ) : (
                  <span className="text-green-600 ml-2">- Cache saudável</span>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              onClick={handleCacheCheck}
              disabled={isChecking}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
              {isChecking ? 'Verificando...' : 'Verificar Cache'}
            </Button>

            <Button
              onClick={handleClearCache}
              variant="outline"
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Cache
            </Button>

            <Button
              onClick={handleEmergencyReload}
              variant="destructive"
              className="w-full"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Reload de Emergência
            </Button>
          </div>

          {cacheStatus.corruptedKeys.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-semibold mb-2">Chaves corrompidas encontradas:</div>
                <div className="text-sm text-muted-foreground max-h-32 overflow-y-auto">
                  {cacheStatus.corruptedKeys.map((key, index) => (
                    <div key={index} className="font-mono text-xs">
                      {key}
                    </div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-muted-foreground">
            <p><strong>Verificar Cache:</strong> Analisa problemas no cache sem fazer alterações</p>
            <p><strong>Limpar Cache:</strong> Remove dados corrompidos e recarrega</p>
            <p><strong>Reload de Emergência:</strong> Limpa tudo e força recarregamento completo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}