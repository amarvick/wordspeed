import React from 'react';
import './Button.css';

type ButtonProps = {
  text: string,
  onClick: React.ButtonHTMLAttributes<HTMLButtonElement>,
  disabled?: boolean,
}

const Button = ({ text, onClick, disabled = false }: ButtonProps): Element => (
  <div
    className="button"
    onClick={onClick}
    disabled={disabled}
  >
    <p className="button-text">{text}</p>
  </div>
);

export default Button;
