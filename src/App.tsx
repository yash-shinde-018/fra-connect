import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import FieldOfficerDashboardPage from './pages/FieldOfficerDashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import MapPage from './pages/MapPage';
import ClaimsPage from './pages/ClaimsPage';
import ClaimDetailPage from './pages/ClaimDetailPage';
import DigitizePage from './pages/DigitizePage';
import AssetMappingPage from './pages/AssetMappingPage';
import DSSPage from './pages/DSSPage';
import ReportsPage from './pages/ReportsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminLayersPage from './pages/AdminLayersPage';

// Simple error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#fee', color: '#c33', minHeight: '100vh' }}>
          <h1>Application Error</h1>
          <p>Something went wrong. Please try refreshing the page.</p>
          {this.state.error && (
            <details style={{ marginTop: '20px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
              <summary>Error Details</summary>
              <pre>{this.state.error.message}</pre>
            </details>
          )}
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '10px', padding: '5px 10px' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/field/dashboard" element={<FieldOfficerDashboardPage />} />
          <Route path="/user/dashboard" element={<UserDashboardPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/claims" element={<ClaimsPage />} />
          <Route path="/claim/:id" element={<ClaimDetailPage />} />
          <Route path="/digitize" element={<DigitizePage />} />
          <Route path="/asset-mapping" element={<AssetMappingPage />} />
          <Route path="/dss" element={<DSSPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/layers" element={<AdminLayersPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;