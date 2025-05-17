import React from 'react';
import FullGameBoard from './FullGameBoard.tsx';
import './GameScreen.css';

type GameScreenProps = {
  setDisplayedScreen: (screen: string) => void;
};

const GameScreen = ({ setDisplayedScreen }: GameScreenProps): Element => {
  return (
    <div className="GameScreen">
      <FullGameBoard setDisplayedScreen={setDisplayedScreen} />
    </div>
  );
};

export default GameScreen;
