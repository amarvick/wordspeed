import React, { useState } from 'react';

// @ts-ignore
import FlippedTiles from './FlippedTiles.tsx';
// @ts-ignore
import UserStand from './UserStand.tsx';
import './FullGameBoard.css';

// @ts-ignore
import { initializeTiles } from './utils/helpers.ts';
import LinkedList from './utils/classes/LinkedList';
import { Tile } from './utils/types/Tile';

function FullGameBoard(): JSX.Element {
  const [initTiles, initDeck] = initializeTiles();

  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [error, setError] = useState('');

  const [currWordTiles, setCurrWordTiles] = useState([]);
  const [currTiles, setCurrTiles] = useState(initDeck);
  const [flippedTiles, setFlippedTiles] = useState(initTiles);

  const setTiles = (flippedTiles: LinkedList, currTiles: LinkedList): void => {
    setFlippedTiles(flippedTiles);
    setCurrTiles(currTiles);
  };

  const swapTiles = (tileIds: Set<string>): LinkedList => {
    const tilesToRemove: Tile[] = currTiles.deleteBulk(tileIds);

    tilesToRemove.forEach(tile => {
      flippedTiles.prepend(tile);
      const newTile = flippedTiles.deleteTail();
      if (newTile) currTiles.append(newTile);
    });

    setTiles(flippedTiles, currTiles);
    return currTiles;
  };

  const acceptWord = (tileIds: Set<string>): LinkedList => {
    const tilesToRemove: Tile[] = currTiles.deleteBulk(tileIds);

    // TODO - Score counting is broken.
    setScore(score + (
      tilesToRemove.reduce((acc: number, tile: Tile) => {
        const newTile = flippedTiles.deleteTail();
        if (newTile) currTiles.append(newTile);

        return acc + tile.points;
      }, 0)
    ));

    setTiles(flippedTiles, currTiles);
    return currTiles;
  };

  return time ? (
    <div className="full-game-board">
      <FlippedTiles tiles={flippedTiles} />
      <UserStand
        tiles={currTiles}
        acceptWord={acceptWord} // can stay here in FullGameBoard
        swapTiles={swapTiles} // can stay here in FullGameBoard
        setError={setError}
        remainingTiles={flippedTiles.listSize}
      />
      {error}
      <h3>
        Score: {score}
      </h3>
      <h3>
        Time: {time}
      </h3>
    </div>
  ) : (
    <div>
      <h1>Game Over</h1>
      <h2>
        Final Score:
        {score}
      </h2>
    </div>
  );
}

export default FullGameBoard;
