/**
 * Utility functions for managing browser cache and localStorage
 */

export const clearBrowserCache = () => {
  try {
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear service worker cache if available
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
        });
      });
    }
    
    // Clear IndexedDB if available
    if ('indexedDB' in window) {
      indexedDB.databases?.().then(databases => {
        databases.forEach(db => {
          if (db.name) {
            indexedDB.deleteDatabase(db.name);
          }
        });
      });
    }
    
    console.log('Cache cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing cache:', error);
    return false;
  }
};

export const clearSpecificKeys = (keys: string[]) => {
  try {
    keys.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    console.log('Specific keys cleared:', keys);
    return true;
  } catch (error) {
    console.error('Error clearing specific keys:', error);
    return false;
  }
};

export const checkForCorruptedData = () => {
  try {
    const problematicKeys = [];
    
    // Check localStorage for corrupted data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          const value = localStorage.getItem(key);
          if (value && (
            value.includes('undefined') || 
            value.includes('null') ||
            value === 'undefined' ||
            value === 'null' ||
            value.includes('NaN') ||
            value === 'Infinity' ||
            value === '[object Object]' ||
            !value.trim() ||
            value.includes('__proto__') ||
            value.includes('constructor')
          )) {
            problematicKeys.push(key);
          }
          // Try to parse JSON values
          if (value && (value.startsWith('{') || value.startsWith('['))) {
            JSON.parse(value);
          }
        } catch (e) {
          problematicKeys.push(key);
        }
      }
    }
    
    // Check sessionStorage as well
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        try {
          const value = sessionStorage.getItem(key);
          if (value && (
            value.includes('undefined') || 
            value.includes('null') ||
            value === 'undefined' ||
            value === 'null' ||
            value.includes('NaN') ||
            !value.trim()
          )) {
            problematicKeys.push(`session_${key}`);
          }
        } catch (e) {
          problematicKeys.push(`session_${key}`);
        }
      }
    }
    
    return problematicKeys;
  } catch (error) {
    console.error('Error checking for corrupted data:', error);
    return [];
  }
};

export const forceReload = () => {
  try {
    // Clear all storage
    clearBrowserCache();
    
    // Force reload without cache
    window.location.reload();
  } catch (error) {
    console.error('Error forcing reload:', error);
  }
};

export const detectAndFixCacheIssues = () => {
  try {
    // Check for common cache corruption indicators
    const indicators = [
      // Check if React Query cache is corrupted
      () => {
        const queryCache = localStorage.getItem('react-query-cache');
        return queryCache && (queryCache.includes('undefined') || queryCache === 'null');
      },
      // Check if app state is corrupted
      () => {
        const appState = localStorage.getItem('app-state');
        return appState && (appState.includes('undefined') || appState === 'null');
      },
      // Check for quota exceeded errors
      () => {
        try {
          localStorage.setItem('__test__', 'test');
          localStorage.removeItem('__test__');
          return false;
        } catch (e) {
          return e.name === 'QuotaExceededError';
        }
      }
    ];

    const hasIssues = indicators.some(check => check());
    
    if (hasIssues) {
      console.warn('Cache issues detected, clearing cache...');
      clearBrowserCache();
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error detecting cache issues:', error);
    return false;
  }
};

export const emergencyReload = () => {
  console.warn('Emergency reload initiated due to persistent cache issues');
  
  // Clear everything possible
  try {
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies for current domain
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    
  } catch (e) {
    console.error('Error in emergency clear:', e);
  }
  
  // Force hard reload
  window.location.href = window.location.href.split('?')[0] + '?cache_bust=' + Date.now();
};

export const initCacheHealthCheck = () => {
  try {
    // First, try to detect and fix cache issues
    const hadIssues = detectAndFixCacheIssues();
    
    // Then check for corrupted data
    const corrupted = checkForCorruptedData();
    
    if (corrupted.length > 0) {
      console.warn('Found corrupted cache keys:', corrupted);
      clearSpecificKeys(corrupted);
      
      // If there are many corrupted keys or we already had issues, emergency reload
      if (corrupted.length > 5 || hadIssues) {
        console.warn('Severe cache corruption detected, initiating emergency reload...');
        setTimeout(() => emergencyReload(), 1500);
        return;
      }
    }
    
    // Check if we're in a cache error loop
    const errorCount = parseInt(sessionStorage.getItem('cache_error_count') || '0');
    if (errorCount > 3) {
      console.warn('Cache error loop detected, initiating emergency reload...');
      sessionStorage.removeItem('cache_error_count');
      setTimeout(() => emergencyReload(), 1000);
      return;
    }
    
    console.log('Cache health check completed successfully');
  } catch (error) {
    console.error('Cache health check failed:', error);
    // Increment error count
    const errorCount = parseInt(sessionStorage.getItem('cache_error_count') || '0') + 1;
    sessionStorage.setItem('cache_error_count', errorCount.toString());
    
    // If we keep failing, emergency reload
    if (errorCount > 2) {
      setTimeout(() => emergencyReload(), 1000);
    }
  }
};