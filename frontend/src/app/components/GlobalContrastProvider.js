"use client";

import { useGlobalContrast } from '../hooks/useDynamicContrast';
import { initDynamicContrast } from '../utils/applyDynamicContrast';

function GlobalContrastProvider({ children }) {
  useGlobalContrast();
  
  // Initialize dynamic contrast system
  if (typeof window !== 'undefined') {
    // Initialize on client side
    initDynamicContrast();
  }
  
  return children;
}

export default GlobalContrastProvider;
