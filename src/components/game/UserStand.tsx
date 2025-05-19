import React, { ReactElement } from 'react';
import TileComponent from './TileComponent.tsx';
import Button from './Button.tsx';
import './UserStand.css';
import { Tile } from './utils/types/Tile';

type UserStandProps = {
  currWordTiles: string[];
  allTiles: Map<string, Tile>;
  deckTiles: Tile[];
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
  deckTiles,
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
        const tile = allTiles.get(tileId);
        if (!tile) return null;
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
      {deckTiles.map((tile: Tile) => (
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
