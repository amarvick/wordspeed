import React, { ReactElement } from 'react';

import TileComponent from './TileComponent.tsx';
import './FlippedTiles.css';
import { Tile } from './utils/types/Tile';

type FlippedTilesProps = {
  tiles: Tile[];
};

const FlippedTiles = ({ tiles }: FlippedTilesProps): ReactElement => (
  <div className="flipped-tiles">
    {tiles.map((tile: Tile) => (
      <TileComponent
        type={tile.type}
        value={tile.value}
        key={`flipped-tile-${tile.id}`}
        points={tile.points}
        isFlipped
      />
    ))}
  </div>
);

export default FlippedTiles;
