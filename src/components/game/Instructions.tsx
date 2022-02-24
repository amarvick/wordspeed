import React from 'react';
import './Instructions.css';
// @ts-ignore
import Button from './Button.tsx';
// @ts-ignore
import { MAIN_MENU } from './utils/consts.ts';

type InstructionsProps = {
  setDisplayedScreen: (menu: string) => void
}

const Instructions = ({ setDisplayedScreen }: InstructionsProps): JSX.Element => (
  <div className="instructions-container">
      <h1>How to Play</h1>
      <p></p>
      <Button
        text="Back to Menu"
        onClick={() => setDisplayedScreen(MAIN_MENU)}
      />
  </div>
);

export default Instructions;
