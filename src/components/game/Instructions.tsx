import React from 'react';
import Button from './Button.tsx';
import { MAIN_MENU, GAME_TIME } from './utils/consts.ts';
import BoxContainer from './BoxContainer.tsx';
import GameScreenImg from '../../images/GameScreen.png';
import GenerateWordImg from '../../images/GenerateWord.png';
import SwapTilesImg from '../../images/SwapTiles.png';

type InstructionsProps = {
  setDisplayedScreen: (menu: string) => void;
};

const Instructions = ({ setDisplayedScreen }: InstructionsProps): Element => (
  <BoxContainer
    component={
      <>
        <h1>How to Play</h1>
        <p>
          Write as many words as you can using a hand of 8 Scrabble tiles within{' '}
          {GAME_TIME} seconds.
        </p>
        <img src={GameScreenImg} alt="Example of the game screen layout" />
        <p>
          Type out a word based off your tile hand (for desktop users), or click
          on tiles in your deck. You can remove letters by hitting backspace, or
          clicking on the tile in your deck used in the word that you wish to
          remove.
        </p>
        <p>
          Click &quot;Submit Word&quot; or hit the &quot;Enter&quot; key to
          submit your word. Words must be:
        </p>
        <ul>
          <li>Two or more tiles long</li>
          <li>An actual word</li>
        </ul>
        <br />
        <img src={GenerateWordImg} alt="Instructions on generating a word" />
        <p>Points are awarded based off of:</p>
        <ul>
          <li>The length of the word created</li>
          <li>The total amount of points shown on each tile</li>
        </ul>
        <p>
          Swap tiles by putting the letters you wish to swap on the word board
          and clicking the &quot;swap tiles&quot; button.
        </p>
        <img src={SwapTilesImg} alt="Instructions on swapping tiles" />
        <Button
          text="Back to Menu"
          onClick={() => setDisplayedScreen(MAIN_MENU)}
        />
      </>
    }
    maxWidth={800}
    height={500}
  />
);

export default Instructions;
