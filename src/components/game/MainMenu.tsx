import React from 'react';
// @ts-ignore
import Button from './Button.tsx';
// @ts-ignore
import { GAME_SCREEN, INSTRUCTIONS, HIGH_SCORES } from './utils/consts.ts';
// @ts-ignore
import BoxContainer from './BoxContainer.tsx';

type MainMenuProps = {
  setDisplayedScreen: (game: string) => void
}

const MainMenu = ({ setDisplayedScreen }: MainMenuProps): JSX.Element => (
  <BoxContainer
    component={(
      <>
        <h1>WordSpeed</h1>
        <Button
          text="Play Game"
          onClick={() => setDisplayedScreen(GAME_SCREEN)}
        />
        <Button
          text="High Scores"
          onClick={() => setDisplayedScreen(HIGH_SCORES)}
        />
        <Button
          text="How To Play"
          onClick={() => setDisplayedScreen(INSTRUCTIONS)}
        />
      </>
    )}
  />
);

export default MainMenu;
