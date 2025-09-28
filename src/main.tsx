import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initCacheHealthCheck } from './utils/cacheUtils'

// Initialize cache health check on app start
initCacheHealthCheck();

createRoot(document.getElementById("root")!).render(<App />);
