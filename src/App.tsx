import React, { useState } from 'react';

// @ts-ignore
import FullGameBoard from './components/game/FullGameBoard.tsx';
// @ts-ignore
import MainMenu from './components/game/MainMenu.tsx';
// @ts-ignore
import Instructions from './components/game/Instructions.tsx';
// @ts-ignore
import HighScores from './components/game/HighScores.tsx';
// @ts-ignore
import { MAIN_MENU, GAME_SCREEN, INSTRUCTIONS, HIGH_SCORES } from './components/game/utils/consts.ts';

const App = (): JSX.Element => {
  const [displayedScreen, setDisplayedScreen] = useState(MAIN_MENU)
  const highScores = JSON.parse(localStorage.getItem("HighScores")) || []
  const screens = {
    [MAIN_MENU]: <MainMenu setDisplayedScreen={setDisplayedScreen} />,
    [GAME_SCREEN]: <FullGameBoard setDisplayedScreen={setDisplayedScreen} />,
    [INSTRUCTIONS]: <Instructions setDisplayedScreen={setDisplayedScreen} />,
    [HIGH_SCORES]: <HighScores highScores={highScores} setDisplayedScreen={setDisplayedScreen} />,
  }

  return (
    <div className="App">
      {screens[displayedScreen]}
    </div>
  );
}

export default App;
