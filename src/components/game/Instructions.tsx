import React from 'react';
// @ts-ignore
import Button from './Button.tsx';
// @ts-ignore
import { MAIN_MENU, GAME_TIME } from './utils/consts.ts';
// @ts-ignore
import BoxContainer from './BoxContainer.tsx';

type InstructionsProps = {
  setDisplayedScreen: (menu: string) => void
}

const Instructions = ({ setDisplayedScreen }: InstructionsProps): JSX.Element => (
  <BoxContainer
    component={(
      <>
        <h1>How to Play</h1>
        <p>
          Given a standard 98-tile set of scrabble tiles (without blanks), your goal is to use up as many tiles as possible to create words using a deck of 8 tiles maximum in {GAME_TIME} seconds. You can generate
          words by typing out the word based off the letters you have in your deck (for desktop users), or by simply clicking on a tile in your deck. You can remove letters from your generated word by hitting backspace,
          or clicking on the tile in your deck that&apos;s being used in the word that you wish to remove.
        </p>
        <p>
          Points are awarded based off of the length of the word you create, as well as how many points each tile used to make the word has. The amount of points a tile contains is shown on the tile.
        </p>
        <p>
          Additionally, if you are not satisfied with your current deck of tiles, you may swap them out simply by putting the letters you wish to swap up on the word board and click the &apos;swap tiles&apos; button.
        </p>
        <Button
          text="Back to Menu"
          onClick={() => setDisplayedScreen(MAIN_MENU)}
        />
      </>
    )}
    width={800}
    height={500}
  />

);

export default Instructions;
