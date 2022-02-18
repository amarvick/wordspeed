import React from 'react';
import './Button.css';

type ButtonProps = {
  text: string,
  onClick: React.ButtonHTMLAttributes<HTMLButtonElement>,
  disabled: boolean,
}

const Button = ({ text, onClick, disabled = false }: ButtonProps): JSX.Element => (
  <button
    className="button"
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;
