import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    // Mock authentication
    if ((username === 'admin' && password === 'password') || 
        (username === 'field-officer' && password === 'password') ||
        (username === 'user' && password === 'password')) {
      // Set user data in localStorage
      localStorage.setItem('authToken', 'mock-token');
      let role = 'user';
      if (username === 'admin') {
        role = 'admin';
      } else if (username === 'field-officer') {
        role = 'field-officer';
      }
      
      localStorage.setItem('userData', JSON.stringify({ username, role }));
      
      // Redirect based on role
      if (username === 'admin') {
        navigate('/admin/dashboard');
      } else if (username === 'field-officer') {
        navigate('/field/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  const fillDemo = (demoUsername: string, demoPassword: string) => {
    setUsername(demoUsername);
    setPassword(demoPassword);
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f3f4f6', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      margin: 0 
    }}>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '0.5rem', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>FRA Atlas Login</h2>
        
        {/* Demo notice */}
        <div style={{ 
          backgroundColor: '#fffbeb', 
          color: '#92400e', 
          padding: '1rem', 
          borderRadius: '0.25rem', 
          marginBottom: '1rem',
          border: '1px solid #f59e0b'
        }}>
          <strong>Demo Only:</strong> This is a demonstration application. All data and features shown are for 
          demonstration purposes only. Real-world applications will have more accurate and working features.
        </div>
        
        {error && (
          <div style={{ 
            backgroundColor: '#fee2e2', 
            color: '#b91c1c', 
            padding: '0.75rem', 
            borderRadius: '0.25rem', 
            marginBottom: '1rem' 
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username" style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold' 
            }}>
              Username
            </label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.25rem', 
                boxSizing: 'border-box' 
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold' 
            }}>
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.25rem', 
                boxSizing: 'border-box' 
              }}
            />
          </div>
          
          <button 
            type="submit"
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              backgroundColor: '#4f46e5', 
              color: 'white', 
              border: 'none', 
              borderRadius: '0.25rem', 
              cursor: 'pointer', 
              fontWeight: 'bold' 
            }}
          >
            Sign In
          </button>
        </form>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem', 
          marginTop: '1rem' 
        }}>
          <button 
            onClick={() => fillDemo('admin', 'password')}
            style={{ 
              padding: '0.5rem', 
              backgroundColor: '#e5e7eb', 
              color: '#374151', 
              border: 'none', 
              borderRadius: '0.25rem', 
              cursor: 'pointer', 
              fontSize: '0.875rem' 
            }}
          >
            Admin Demo
          </button>
          <button 
            onClick={() => fillDemo('field-officer', 'password')}
            style={{ 
              padding: '0.5rem', 
              backgroundColor: '#e5e7eb', 
              color: '#374151', 
              border: 'none', 
              borderRadius: '0.25rem', 
              cursor: 'pointer', 
              fontSize: '0.875rem' 
            }}
          >
            Officer Demo
          </button>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '1rem', 
          marginTop: '1rem' 
        }}>
          <button 
            onClick={() => fillDemo('user', 'password')}
            style={{ 
              padding: '0.5rem', 
              backgroundColor: '#e5e7eb', 
              color: '#374151', 
              border: 'none', 
              borderRadius: '0.25rem', 
              cursor: 'pointer', 
              fontSize: '0.875rem' 
            }}
          >
            User Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;