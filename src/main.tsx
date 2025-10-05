import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Render with additional error handling
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found in HTML');
  }
  
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; background-color: #fee; color: #c33; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: Arial, sans-serif;">
      <h1 style="color: #c33;">Critical Initialization Error</h1>
      <p>Failed to initialize the application.</p>
      <div style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 4px; max-width: 80%;">
        <strong>Error:</strong>
        <pre style="font-size: 0.8em; white-space: pre-wrap;">${error instanceof Error ? error.message : String(error)}</pre>
      </div>
      <button 
        onclick="window.location.reload()" 
        style="margin-top: 20px; padding: 10px 20px; background-color: #c33; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        Reload Page
      </button>
    </div>
  `;
}