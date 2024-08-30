import React, { FC } from 'react';
import './Button.scss';

type Props = {
  text: string;
  onClick: () => void;
  className: string;
  background?: string;
  disabled?: boolean;
  style?: any;
  icon?: any;
};

const Button: FC<Props> = ({
  text,
  onClick,
  className = '',
  background,
  disabled,
  style,
  icon,
}) => (
  <button
    type="button"
    className={`basic-button ${className}`}
    onClick={onClick}
    tabIndex={0}
    style={{
      backgroundColor: background,
      ...(disabled ? { opacity: 0.3 } : {}),
      outline: 'none',
      ...style,
    }}
    disabled={disabled}
  >
    {text}
    {icon && icon}
  </button>
);

export default Button;
