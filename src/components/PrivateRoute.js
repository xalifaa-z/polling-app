import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const authUser = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (!authUser) {
    return <Navigate 
      to="/login" 
      state={{ from: location.pathname }}
      replace 
    />;
  }

  return children;
}

export default PrivateRoute; 