import React from 'react';
import Button from './Button.tsx';
import { GAME_SCREEN, INSTRUCTIONS, HIGH_SCORES } from './utils/consts.ts';
import BoxContainer from './BoxContainer.tsx';

type MainMenuProps = {
  setDisplayedScreen: (game: string) => void;
};

const MainMenu = ({ setDisplayedScreen }: MainMenuProps): Element => {
  const buttons = [
    { text: 'Play Game', action: () => setDisplayedScreen(GAME_SCREEN) },
    { text: 'High Scores', action: () => setDisplayedScreen(HIGH_SCORES) },
    { text: 'How To Play', action: () => setDisplayedScreen(INSTRUCTIONS) },
  ];

  return (
    <BoxContainer
      component={
        <>
          <h1>WordSpeed</h1>
          {buttons.map(({ text, action }) => (
            <Button key={text} text={text} onClick={action} />
          ))}
        </>
      }
    />
  );
};

export default MainMenu;
