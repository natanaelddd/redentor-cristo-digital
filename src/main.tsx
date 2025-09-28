import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initCacheHealthCheck, forceRefresh } from './utils/cacheUtils'

// Sistema robusto de cache para resolver problemas do Chrome
try {
  // Initialize cache health check on app start
  initCacheHealthCheck();

  // Detectar problemas de cache do Chrome
  const isChrome = navigator.userAgent.includes('Chrome');
  const hasPerformanceIssues = performance.now() > 5000; // Se demorou mais de 5s para carregar

  if (isChrome && hasPerformanceIssues) {
    console.warn('Detectados problemas de performance, limpando cache...');
    localStorage.setItem('cache_performance_issue', Date.now().toString());
  }

  // Auto-limpeza se detectar problemas repetidos
  const lastIssue = localStorage.getItem('cache_performance_issue');
  if (lastIssue && (Date.now() - parseInt(lastIssue)) < 60000) { // Menos de 1 minuto
    console.log('Problemas de cache detectados recentemente, forçando refresh...');
    localStorage.removeItem('cache_performance_issue');
    if (confirm('O site detectou problemas de cache. Deseja limpar o cache e recarregar?')) {
      forceRefresh();
    }
  }
} catch (error) {
  console.warn('Erro na inicialização do cache:', error);
}

createRoot(document.getElementById("root")!).render(<App />);
