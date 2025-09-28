import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, ExternalLink } from 'lucide-react';
import { clearBrowserCache } from '@/utils/cacheUtils';

export function PreviewGuard() {
  const [isPreviewDead, setIsPreviewDead] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Check if we're on a preview URL and if it's working
    const checkPreviewHealth = async () => {
      const isPreviewUrl = window.location.hostname.includes('lovable') || 
                           window.location.hostname.includes('preview');
      
      if (isPreviewUrl) {
        try {
          // Try to fetch a simple resource to check connectivity
          const response = await fetch('/favicon.ico', { 
            method: 'HEAD',
            cache: 'no-cache'
          });
          
          if (!response.ok) {
            setIsPreviewDead(true);
          }
        } catch (error) {
          console.error('Preview health check failed:', error);
          setIsPreviewDead(true);
        }
      }
    };

    // Check on mount
    checkPreviewHealth();

    // Check periodically if we detected issues
    const interval = setInterval(() => {
      if (isPreviewDead && retryCount < 3) {
        checkPreviewHealth();
        setRetryCount(prev => prev + 1);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isPreviewDead, retryCount]);

  const handleRetry = () => {
    clearBrowserCache();
    window.location.reload();
  };

  const handleGoToStable = () => {
    // Try to redirect to a stable version or main URL
    const currentPath = window.location.pathname + window.location.search;
    const stableUrl = window.location.protocol + '//' + 
                     window.location.hostname.replace('preview--', '') +
                     currentPath;
    window.location.href = stableUrl;
  };

  if (!isPreviewDead) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <Alert className="bg-destructive/10 border-destructive/20">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <strong>Preview indisponível</strong>
            <p className="text-sm mt-1">
              O link de preview está temporariamente offline. 
              Tentativas: {retryCount}/3
            </p>
          </div>
          <div className="flex gap-2 ml-4">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleRetry}
              disabled={retryCount >= 3}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Tentar Novamente
            </Button>
            <Button 
              size="sm" 
              onClick={handleGoToStable}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Versão Estável
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}