import React from 'react';

// @ts-ignore
import TileComponent from './TileComponent.tsx';
import './FlippedTiles.css';
// @ts-ignore
import { LinkedList } from './utils/classes/LinkedList';

type FlippedTilesProps = {
  tiles: LinkedList
}

function FlippedTiles({ tiles }: FlippedTilesProps): JSX.Element {
  return (
    <div className="flipped-tiles">
      {tiles.map(tile => (
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
}

export default FlippedTiles;
