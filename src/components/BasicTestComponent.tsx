import React, { useState, useEffect } from 'react';

const BasicTestComponent: React.FC = () => {
  const [status, setStatus] = useState<string>('Initializing...');
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setStatus('React component loaded successfully!');
    
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-blue-50 p-4">
      <h1 className="text-2xl font-bold text-blue-800">Basic React Test</h1>
      <p className="mt-2 text-lg">{status}</p>
      <p className="mt-4 text-gray-600">If you can see this, React is working correctly.</p>
      <div className="mt-6 p-4 bg-white rounded shadow">
        <p className="text-sm">Component has been running for {count} seconds</p>
      </div>
      <button 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
};

export default BasicTestComponent;