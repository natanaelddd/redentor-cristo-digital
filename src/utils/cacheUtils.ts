/**
 * Sistema robusto de gerenciamento de cache
 */

// Configurações de cache
const CACHE_CONFIG = {
  VERSION: '1.0.0',
  PREFIX: 'redentor_cache_',
  MAX_AGE: 24 * 60 * 60 * 1000, // 24 horas
  CHECK_INTERVAL: 60 * 60 * 1000, // 1 hora
};

interface CacheItem {
  data: any;
  timestamp: number;
  version: string;
  ttl?: number;
}

export class CacheManager {
  private static instance: CacheManager;
  private storageAvailable: boolean;

  constructor() {
    this.storageAvailable = this.checkStorageAvailability();
    this.initPeriodicCleanup();
    this.handleVersionUpdate();
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private checkStorageAvailability(): boolean {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  }

  private getKey(key: string): string {
    return `${CACHE_CONFIG.PREFIX}${key}`;
  }

  private handleVersionUpdate(): void {
    const currentVersion = localStorage.getItem('cache_version');
    if (currentVersion !== CACHE_CONFIG.VERSION) {
      console.log('Detectada nova versão, limpando cache...');
      this.clearAll();
      localStorage.setItem('cache_version', CACHE_CONFIG.VERSION);
    }
  }

  set(key: string, data: any, ttl?: number): boolean {
    if (!this.storageAvailable) return false;

    try {
      const cacheItem: CacheItem = {
        data,
        timestamp: Date.now(),
        version: CACHE_CONFIG.VERSION,
        ttl: ttl || CACHE_CONFIG.MAX_AGE,
      };

      localStorage.setItem(this.getKey(key), JSON.stringify(cacheItem));
      return true;
    } catch (error) {
      console.warn('Erro ao salvar no cache:', error);
      // Se quota excedida, limpar cache antigo
      if (error.name === 'QuotaExceededError') {
        this.cleanExpired();
        try {
          localStorage.setItem(this.getKey(key), JSON.stringify({
            data,
            timestamp: Date.now(),
            version: CACHE_CONFIG.VERSION,
            ttl: ttl || CACHE_CONFIG.MAX_AGE,
          }));
          return true;
        } catch {
          return false;
        }
      }
      return false;
    }
  }

  get(key: string): any | null {
    if (!this.storageAvailable) return null;

    try {
      const cached = localStorage.getItem(this.getKey(key));
      if (!cached) return null;

      const cacheItem: CacheItem = JSON.parse(cached);
      
      // Verificar versão
      if (cacheItem.version !== CACHE_CONFIG.VERSION) {
        this.remove(key);
        return null;
      }

      // Verificar expiração
      const now = Date.now();
      const age = now - cacheItem.timestamp;
      const maxAge = cacheItem.ttl || CACHE_CONFIG.MAX_AGE;

      if (age > maxAge) {
        this.remove(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.warn('Erro ao ler do cache:', error);
      this.remove(key);
      return null;
    }
  }

  remove(key: string): boolean {
    if (!this.storageAvailable) return false;

    try {
      localStorage.removeItem(this.getKey(key));
      return true;
    } catch {
      return false;
    }
  }

  clearAll(): boolean {
    if (!this.storageAvailable) return false;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(CACHE_CONFIG.PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch {
      return false;
    }
  }

  cleanExpired(): number {
    if (!this.storageAvailable) return 0;

    let cleaned = 0;
    const keys = Object.keys(localStorage);
    const now = Date.now();

    keys.forEach(key => {
      if (key.startsWith(CACHE_CONFIG.PREFIX)) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const cacheItem: CacheItem = JSON.parse(cached);
            const age = now - cacheItem.timestamp;
            const maxAge = cacheItem.ttl || CACHE_CONFIG.MAX_AGE;

            if (age > maxAge || cacheItem.version !== CACHE_CONFIG.VERSION) {
              localStorage.removeItem(key);
              cleaned++;
            }
          }
        } catch {
          localStorage.removeItem(key);
          cleaned++;
        }
      }
    });

    console.log(`Cache limpo: ${cleaned} itens removidos`);
    return cleaned;
  }

  getStats(): { total: number; size: string; version: string } {
    if (!this.storageAvailable) return { total: 0, size: '0 KB', version: CACHE_CONFIG.VERSION };

    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter(key => key.startsWith(CACHE_CONFIG.PREFIX));
    
    let totalSize = 0;
    cacheKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        totalSize += new Blob([value]).size;
      }
    });

    return {
      total: cacheKeys.length,
      size: `${(totalSize / 1024).toFixed(2)} KB`,
      version: CACHE_CONFIG.VERSION,
    };
  }

  private initPeriodicCleanup(): void {
    // Limpeza automática a cada hora
    setInterval(() => {
      this.cleanExpired();
    }, CACHE_CONFIG.CHECK_INTERVAL);

    // Limpeza ao sair da página
    window.addEventListener('beforeunload', () => {
      this.cleanExpired();
    });
  }

  // Força atualização do cache
  invalidatePattern(pattern: string): number {
    if (!this.storageAvailable) return 0;

    let invalidated = 0;
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
      if (key.startsWith(CACHE_CONFIG.PREFIX) && key.includes(pattern)) {
        localStorage.removeItem(key);
        invalidated++;
      }
    });

    return invalidated;
  }
}

// Funções utilitárias para compatibilidade
export const clearBrowserCache = (): boolean => {
  try {
    // Limpar cache customizado
    const cache = CacheManager.getInstance();
    cache.clearAll();

    // Limpar localStorage e sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Força reload da página para limpar cache do navegador
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }

    console.log('Cache completo limpo com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao limpar cache:', error);
    return false;
  }
};

export const clearSpecificKeys = (keys: string[]): boolean => {
  try {
    const cache = CacheManager.getInstance();
    keys.forEach(key => {
      cache.remove(key);
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    console.log('Chaves específicas limpas:', keys);
    return true;
  } catch (error) {
    console.error('Erro ao limpar chaves específicas:', error);
    return false;
  }
};

export const checkForCorruptedData = (): string[] => {
  try {
    const problematicKeys: string[] = [];
    
    // Verificar localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          const value = localStorage.getItem(key);
          if (value && (value.includes('undefined') || value === 'undefined')) {
            problematicKeys.push(key);
          }
          // Tentar parsear JSON para verificar se está válido
          if (value && (value.startsWith('{') || value.startsWith('['))) {
            JSON.parse(value);
          }
        } catch (e) {
          problematicKeys.push(key);
        }
      }
    }
    
    return problematicKeys;
  } catch (error) {
    console.error('Erro ao verificar dados corrompidos:', error);
    return [];
  }
};

export const initCacheHealthCheck = (): void => {
  const cache = CacheManager.getInstance();
  
  // Verificar dados corrompidos
  const corrupted = checkForCorruptedData();
  if (corrupted.length > 0) {
    console.warn('Dados corrompidos encontrados:', corrupted);
    clearSpecificKeys(corrupted);
  }

  // Limpeza inicial
  cache.cleanExpired();

  // Log de estatísticas
  const stats = cache.getStats();
  console.log('Cache inicializado:', stats);
};

// Função para forçar reload sem cache
export const forceRefresh = (): void => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => registration.unregister());
    });
  }
  
  window.location.reload();
};

// Export da instância para uso direto
export const cache = CacheManager.getInstance();