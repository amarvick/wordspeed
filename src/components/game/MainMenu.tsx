import React from 'react';
// @ts-ignore
import Button from './Button.tsx';
import './MainMenu.css';
// @ts-ignore
import { GAME_SCREEN } from './utils/consts.ts';

type MainMenuProps = {
  setDisplayedScreen: (game: string) => void
}

const MainMenu = ({ setDisplayedScreen }: MainMenuProps): JSX.Element => (
  <div className="main-menu">
    Main Menu <br/>
    <Button
      text="Play Game"
      onClick={() => setDisplayedScreen(GAME_SCREEN)}
    />
  </div>
);

export default MainMenu;
