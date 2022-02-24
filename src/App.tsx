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
// @ts-ignore
import background from './images/GrayDeskBg.jpeg'

const App = (): JSX.Element => {
  const [displayedScreen, setDisplayedScreen] = useState(MAIN_MENU)
  // TODO - Make localstorage, and then maybe do all hiscores
  const highScores = [
    500,
    400,
    300,
    200,
    100
  ];
  
  const screens = {
    [MAIN_MENU]: <MainMenu setDisplayedScreen={setDisplayedScreen} />,
    [GAME_SCREEN]: <FullGameBoard setDisplayedScreen={setDisplayedScreen}/>,
    [INSTRUCTIONS]: <Instructions setDisplayedScreen={setDisplayedScreen}/>,
    [HIGH_SCORES]: <HighScores highScores={highScores} setDisplayedScreen={setDisplayedScreen}/>,
  }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        textAlign: 'center',
      }}
      className="App"
    >
      {screens[displayedScreen]}
    </div>
  );
}

export default App;
