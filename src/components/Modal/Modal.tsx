import React, { CSSProperties } from 'react';
import './Modal.scss';

type Props = {
  children?: any;
  overlayStyles?: CSSProperties;
  modalContainerStyles?: CSSProperties;
  className?: string;
  onOverlayClick?(e?: any): void;
};

const Modal = (props: Props) => {
  const { modalContainerStyles, overlayStyles, children, onOverlayClick, className } = props;
  return (
    <>
      <div
        role="button"
        onClick={e => {
          if (onOverlayClick) {
            onOverlayClick(e);
          }
        }}
        className="overlay"
        style={{
          ...(overlayStyles || {}),
        }}
      />
      <div
        role="none"
        onClick={e => {
          e.preventDefault();
        }}
        className={`${className || 'modalContainer'}`}
        style={{
          ...(modalContainerStyles || {}),
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
