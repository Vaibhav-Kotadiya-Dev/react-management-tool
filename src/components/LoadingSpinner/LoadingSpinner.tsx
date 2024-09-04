import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';

import './LoadingSpinner.scss';

type Props = {
  size?: number
  color?: string
}

const LoadingSpinner: FC<Props> = ({ size, color }) => {
  return (
    <div className="loader">
      <CircularProgress style={{ color: color ?? '#fff' }} size={size ?? 30} />
    </div>
  );
};

export default LoadingSpinner;
