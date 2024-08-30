import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const AuthWrapper = (props: any) => {
  const {
    user,
    isAuthenticating,
  } = props;

  const location = useLocation();

  const currentPath = location.pathname;

  if (currentPath === '/logout') {
    window.location.replace('/logout');
  }

  if (isAuthenticating) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</p>;
  }

  // if (user) return <props.component />;
  if (true) return <props.component />;

  return <Navigate to="/login" replace />;
};

export default AuthWrapper;
