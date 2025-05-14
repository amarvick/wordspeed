import React from 'react';

// @ts-ignore
import TileComponent from './TileComponent.tsx';
import './FlippedTiles.css';
// @ts-ignore
import { LinkedList } from './utils/classes/LinkedList';
import { Tile } from './utils/types/Tile';

type FlippedTilesProps = {
  tiles: LinkedList
}

const FlippedTiles = ({ tiles }: FlippedTilesProps): JSX.Element => (
  <div className="flipped-tiles">
    {tiles.map((tile: Tile) => (
      <TileComponent
        type={tile.type}
        value={tile.value}
        key={`flipped-tile-${tile.id}`}
        points={tile.points}
        isFlipped
        backgroundColor="black"
      />
    ))}
  </div>
);

export default FlippedTiles;
