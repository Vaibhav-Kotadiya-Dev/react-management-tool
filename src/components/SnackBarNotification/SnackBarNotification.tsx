import React from 'react';
import { Snackbar, SnackbarOrigin } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import './SnackBarNotificationStyle.scss';

export enum AlertTypeProps {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
}

export type SnackBarNotificationProps = {
  isOpen: boolean;
  closeNotification: () => void;
  autoHideDuration?: number;
  alertPosition?: SnackbarOrigin;
  alertTitle?: string;
  alertDescription?: string;
  alertType?: AlertTypeProps;
};

function SnackBarNotification(props: SnackBarNotificationProps) {
  const {
    isOpen,
    closeNotification,
    autoHideDuration = 6000,
    alertPosition = {
      vertical: 'bottom',
      horizontal: 'right',
    } as SnackbarOrigin,
    alertTitle = 'Alert',
    alertDescription = 'This is the message from alert',
    alertType = AlertTypeProps.SUCCESS,
  } = props;
  return (
    <Snackbar
      style={{ marginRight: '100px' }}
      open={isOpen}
      autoHideDuration={autoHideDuration}
      onClose={closeNotification}
      anchorOrigin={alertPosition}
    >
      <MuiAlert onClose={closeNotification} severity={alertType} elevation={6} variant="filled">
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertDescription}
      </MuiAlert>
    </Snackbar>
  );
}
export default SnackBarNotification;
