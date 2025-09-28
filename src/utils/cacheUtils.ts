/**
 * Utility functions for managing browser cache and localStorage
 */

export const clearBrowserCache = () => {
  try {
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
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
          if (value && value.includes('undefined')) {
            problematicKeys.push(key);
          }
        } catch (e) {
          problematicKeys.push(key);
        }
      }
    }
    
    return problematicKeys;
  } catch (error) {
    console.error('Error checking for corrupted data:', error);
    return [];
  }
};

export const initCacheHealthCheck = () => {
  const corrupted = checkForCorruptedData();
  if (corrupted.length > 0) {
    console.warn('Found corrupted cache keys:', corrupted);
    clearSpecificKeys(corrupted);
  }
};