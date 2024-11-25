// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';

// Check if the user is authenticated and is an admin
const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.user_type === 'admin'; // Use user_type to check admin status
};

const ProtectedRoute = ({ children }) => {
  // If the user is authenticated and an admin, render the children (protected component)
  if (isAuthenticated()) {
    return children;
  }
  // If not authenticated or not an admin, redirect to the `/admins` page
  return <Navigate to="/admin-login" />;
};

export default ProtectedRoute;



