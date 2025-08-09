import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getAuth } from '../utils/auth';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, role } = getAuth();
  if (!token || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }
  return children;
}
