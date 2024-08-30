import React from 'react';
import { CircularProgress } from '@mui/material';

import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="loader">
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
