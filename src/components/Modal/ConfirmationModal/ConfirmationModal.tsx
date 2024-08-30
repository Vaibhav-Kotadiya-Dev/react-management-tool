import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import './ConfirmationModalStyle.scss';

type Props = {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
  okButtonText?: string;
  okButtonIcon?: string;
  cancelButtonText?: string;
  cancelButtonIcon?: string;
  title?: string;
  description?: string;
  okButtonStyle?: React.CSSProperties;
  cancelButtonStyle?: React.CSSProperties,
  isOkButtonLoading?: boolean
};

function ConfirmationModal(props: Props) {
  const {
    isOpen,
    onOk,
    onCancel,
    okButtonStyle = {},
    okButtonIcon,
    cancelButtonStyle = {},
    cancelButtonIcon,
    okButtonText = 'Yes',
    cancelButtonText = 'Cancel',
    title = 'Confirmation',
    description = 'Do you proceed?',
    isOkButtonLoading = false,

  } = props;

  return (
    <div className=" ">
      <Dialog
        open={isOpen}
        maxWidth="xl"
        onClose={onCancel}
        aria-labelledby="alert-dialog-confirmation"
        aria-describedby="alert-dialog-confirmation-description"
      >
        <DialogTitle className="confirmationModalContainer__dialogTitle" id="alert-dialog-confirmation">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-confirmation-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ paddingBottom: '18px' }}>
          <Button className="confirmationModalContainer__cancelBtn" style={cancelButtonStyle} onClick={onCancel}>
            {cancelButtonIcon && <img src={cancelButtonIcon} alt="cancel" />}
            {cancelButtonText}
          </Button>
          <Button className="confirmationModalContainer__okBtn" onClick={onOk} autoFocus style={okButtonStyle} disabled={isOkButtonLoading}>
            {isOkButtonLoading ? (
              <div
                className="loading-spinner confirmationModalContainer__okBtn__loader"
              >
                <div className="spinner" />
              </div>
            ) : (
              <>
                {okButtonIcon && <img src={okButtonIcon} alt="delete" />}
                {okButtonText}
              </>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationModal;
