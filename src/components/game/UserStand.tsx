import React, { ReactElement } from 'react';

import TileComponent from './TileComponent';
import Button from './Button';
import './UserStand.css';
import { Tile } from './utils/types/Tile';

type UserStandProps = {
  currWordTiles: string[];
  allTiles: Map<string, Tile>;
  removeTile: (tileId: string) => void;
  toggleTile: (tileId: string) => void;
  submitWord: () => void;
  onSwap: () => void;
  remainingTiles: number;
  error: string;
};

const UserStand = ({
  currWordTiles,
  allTiles,
  removeTile,
  toggleTile,
  submitWord,
  onSwap,
  remainingTiles,
  error,
}: UserStandProps): ReactElement => (
  <div className="user-stand">
    <div className="user-stand-tile-box user-word">
      {currWordTiles.map((tileId: string) => {
        const tile: Tile = allTiles[tileId];
        return (
          <TileComponent
            type={tile.type}
            value={tile.value}
            key={`${tile.id}-word-tile`}
            points={tile.points}
            isFlipped={false}
            onClick={() => removeTile(tileId)}
          />
        );
      })}
    </div>
    <p>{error}</p>

    <div className="user-stand-tile-box user-tiles">
      {Object.values(allTiles).map((tile: Tile) => (
        <TileComponent
          type={tile.type}
          value={tile.value}
          key={`${tile.id}-dash-tile`}
          points={tile.points}
          isFlipped={false}
          isSelected={currWordTiles.includes(tile.id)}
          onClick={() => toggleTile(tile.id)}
          isDeck
        />
      ))}
    </div>
    <div className="btn-class">
      <Button text="Submit Word" onClick={() => submitWord()} />
      <Button
        text="Swap Tiles"
        disabled={remainingTiles < currWordTiles.length}
        onClick={onSwap}
      />
    </div>
  </div>
);

export default UserStand;
