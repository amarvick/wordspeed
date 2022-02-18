import React, { useState } from 'react';

// @ts-ignore
import FullGameBoard from './components/game/FullGameBoard.tsx';
// @ts-ignore
import MainMenu from './components/game/MainMenu.tsx';
// @ts-ignore
import { MAIN_MENU, GAME_SCREEN } from './components/game/utils/consts.ts';
import background from './images/GrayDeskBg.jpeg'

const App = (): JSX.Element => {
  const [displayedScreen, setDisplayedScreen] = useState(MAIN_MENU)
  
  const screens = {
    [MAIN_MENU]: <MainMenu setDisplayedScreen={setDisplayedScreen} />,
    [GAME_SCREEN]: <FullGameBoard setDisplayedScreen={setDisplayedScreen}/>
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
