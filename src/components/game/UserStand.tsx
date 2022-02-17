import React from 'react';

// @ts-ignore
import TileComponent from './TileComponent.tsx';
import './UserStand.css';
import { Tile } from './utils/types/Tile';

type UserStandProps = {
  currWordTiles: string[],
  allTiles: Map<String, Tile>,
  removeTile: (string) => void,
  toggleTile: (string) => void,
  submitWord: () => void,
  onSwap: () => void,
  remainingTiles: number,
}

const UserStand = ({
  currWordTiles,
  allTiles,
  removeTile,
  toggleTile,
  submitWord,
  remainingTiles,
  onSwap
}: UserStandProps): JSX.Element => (
  <div
    className="user-stand"
  >
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
      <button
        className="button"
        onClick={() => submitWord()}
      >
        Submit Word
      </button>
      <button
        className="button"
        disabled={remainingTiles < currWordTiles.length}
        onClick={onSwap}
      >
        Swap Tiles
      </button>
    </div>
  </div>
);

export default UserStand;
