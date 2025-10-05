import React from 'react';
import ReactDOM from 'react-dom/client';
import './test.css';

// Create a minimal app component
function MinimalApp() {
  return (
    React.createElement('div', { className: 'test-container' },
      React.createElement('h1', { className: 'test-title' }, 'JavaScript Test'),
      React.createElement('p', { className: 'test-content' }, 'If you can see this, JavaScript is working!'),
      React.createElement('div', { style: { marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' } },
        React.createElement('p', null, 'This tests if JavaScript compilation is working.')
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null,
    React.createElement(MinimalApp, null)
  )
);