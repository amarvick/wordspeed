import React, { MouseEvent } from 'react';
import './Button.css';

type ButtonProps = {
  text: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button = ({ text, onClick, disabled = false }: ButtonProps): Element => (
  <button className="button" onClick={onClick} disabled={disabled}>
    <p className="button-text">{text}</p>
  </button>
);

export default Button;
