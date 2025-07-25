import React, { useState, createElement, ReactElement } from 'react';

import GameScreen from './components/game/GameScreen.tsx';
import MainMenu from './components/game/MainMenu.tsx';
import Instructions from './components/game/Instructions.tsx';
import HighScores from './components/game/HighScores.tsx';
import {
  MAIN_MENU,
  GAME_SCREEN,
  INSTRUCTIONS,
  HIGH_SCORES,
} from './components/game/utils/consts.ts';

const App = (): ReactElement => {
  const [displayedScreen, setDisplayedScreen] = useState(MAIN_MENU);
  const screens = {
    [MAIN_MENU]: MainMenu,
    [GAME_SCREEN]: GameScreen,
    [INSTRUCTIONS]: Instructions,
    [HIGH_SCORES]: HighScores,
  };

  return (
    <div>{createElement(screens[displayedScreen], { setDisplayedScreen })}</div>
  );
};

export default App;
