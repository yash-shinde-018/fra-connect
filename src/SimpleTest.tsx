import React from 'react';

const SimpleTest: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
      <h1 style={{ color: '#333' }}>Simple Test Component</h1>
      <p style={{ color: '#666' }}>If you can see this, React is working!</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
        <p>This is a simple test to verify the React environment.</p>
      </div>
    </div>
  );
};

export default SimpleTest;