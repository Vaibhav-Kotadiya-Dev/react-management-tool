import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import session from 'utils/session'

const AuthWrapper = (props: any) => {
  const token = session.getValue('token')

  const location = useLocation();

  const currentPath = location.pathname;

  if (currentPath === '/logout') {
    window.location.replace('/logout');
  }

  if (token) return <props.component />;

  return <Navigate to="/login" replace />;
};

export default AuthWrapper;
