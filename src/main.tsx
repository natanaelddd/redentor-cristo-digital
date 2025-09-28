import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initCacheHealthCheck, emergencyReload } from './utils/cacheUtils'

// Check for emergency reload flag
const emergencyFlag = new URLSearchParams(window.location.search).get('emergency_reload');
if (emergencyFlag === 'true') {
  console.warn('Emergency reload detected, clearing all cache...');
  emergencyReload();
}

// Initialize cache health check on app start
try {
  initCacheHealthCheck();
} catch (error) {
  console.error('Cache health check failed:', error);
  // If cache check fails, try emergency reload
  setTimeout(() => {
    window.location.href = window.location.pathname + '?emergency_reload=true';
  }, 1000);
}

createRoot(document.getElementById("root")!).render(<App />);
