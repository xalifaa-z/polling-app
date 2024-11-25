import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const authUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.users);
  
  if (!users || Object.keys(users).length === 0) {
    return <div>Loading...</div>;
  }
  
  return authUser ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute; 