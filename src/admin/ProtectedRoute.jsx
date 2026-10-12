import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading, configured, ensureInit } = useAuth();
  const location = useLocation();
  useEffect(() => {
    ensureInit();
  }, [ensureInit]);

  if (loading) {
    return (
      <div className="admin-splash">
        <div className="admin-spinner" />
      </div>
    );
  }

  if (!configured) {
    return <Navigate to="/admin/setup" replace />;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
