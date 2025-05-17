import React, { ReactElement } from 'react';
import FullGameBoard from './FullGameBoard';
import './GameScreen.css';

type GameScreenProps = {
  setDisplayedScreen: (screen: string) => void;
};

const GameScreen = ({ setDisplayedScreen }: GameScreenProps): ReactElement => {
  return (
    <div className="GameScreen">
      <FullGameBoard setDisplayedScreen={setDisplayedScreen} />
    </div>
  );
};

export default GameScreen;
