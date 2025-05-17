import React, { useState, ReactElement } from 'react';

import GameScreen from './components/game/GameScreen';
import MainMenu from './components/game/MainMenu';
import Instructions from './components/game/Instructions';
import HighScores from './components/game/HighScores';
import {
  MAIN_MENU,
  GAME_SCREEN,
  INSTRUCTIONS,
  HIGH_SCORES,
} from './components/game/utils/consts';

type ScreenKey =
  | typeof MAIN_MENU
  | typeof GAME_SCREEN
  | typeof INSTRUCTIONS
  | typeof HIGH_SCORES;

const App = (): ReactElement => {
  const [displayedScreen, setDisplayedScreen] = useState<ScreenKey>(MAIN_MENU);

  const screens: Record<
    ScreenKey,
    React.FC<{ setDisplayedScreen: (screen: ScreenKey) => void }>
  > = {
    [MAIN_MENU]: MainMenu,
    [GAME_SCREEN]: GameScreen,
    [INSTRUCTIONS]: Instructions,
    [HIGH_SCORES]: HighScores,
  };

  const CurrentScreen = screens[displayedScreen];

  return (
    <div>
      <CurrentScreen setDisplayedScreen={setDisplayedScreen} />
    </div>
  );
};

export default App;
