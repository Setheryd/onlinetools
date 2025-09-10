/**
 * Global Error Capture Utility
 * Captures and logs all errors for debugging purposes
 */

class ErrorCapture {
  constructor() {
    this.errors = [];
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    
    // Capture JavaScript errors
    window.addEventListener('error', (event) => {
      this.captureError({
        type: 'JavaScript Error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString()
      });
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        type: 'Unhandled Promise Rejection',
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        timestamp: new Date().toISOString()
      });
    });

    // Capture fetch errors
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok) {
          this.captureError({
            type: 'Fetch Error',
            message: `HTTP ${response.status}: ${response.statusText}`,
            url: args[0],
            status: response.status,
            timestamp: new Date().toISOString()
          });
        }
        return response;
      } catch (error) {
        this.captureError({
          type: 'Fetch Error',
          message: error.message,
          url: args[0],
          stack: error.stack,
          timestamp: new Date().toISOString()
        });
        throw error;
      }
    };

    this.isInitialized = true;
    console.log('Error capture initialized');
  }

  captureError(errorInfo) {
    const fullErrorInfo = {
      ...errorInfo,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: errorInfo.timestamp || new Date().toISOString()
    };

    this.errors.push(fullErrorInfo);
    console.log('Captured Error:', fullErrorInfo);
    
    // Store in localStorage for persistence
    try {
      const storedErrors = JSON.parse(localStorage.getItem('capturedErrors') || '[]');
      storedErrors.push(fullErrorInfo);
      // Keep only last 50 errors
      if (storedErrors.length > 50) {
        storedErrors.splice(0, storedErrors.length - 50);
      }
      localStorage.setItem('capturedErrors', JSON.stringify(storedErrors));
    } catch (e) {
      console.warn('Failed to store error in localStorage:', e);
    }
  }

  getErrors() {
    return [...this.errors];
  }

  getStoredErrors() {
    try {
      return JSON.parse(localStorage.getItem('capturedErrors') || '[]');
    } catch (e) {
      return [];
    }
  }

  clearErrors() {
    this.errors = [];
    localStorage.removeItem('capturedErrors');
  }

  exportErrors() {
    const allErrors = [...this.errors, ...this.getStoredErrors()];
    const errorData = {
      timestamp: new Date().toISOString(),
      tool: 'Global Error Capture',
      errors: allErrors,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    const blob = new Blob([JSON.stringify(errorData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `global-errors-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Method to manually capture errors
  captureManualError(error, context = {}) {
    this.captureError({
      type: 'Manual Error',
      message: error.message || String(error),
      stack: error.stack,
      context: context,
      timestamp: new Date().toISOString()
    });
  }
}

// Create global instance
const errorCapture = new ErrorCapture();

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
  errorCapture.init();
}

export default errorCapture;
