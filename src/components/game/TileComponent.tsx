import React from 'react';

import './TileComponent.css';

type TileComponentProps = {
  type: string,
  value: string,
  points: number,
  isFlipped: boolean,
  isSelected: boolean,
  onClick: () => void,
  isDeck: boolean,
}

// TODO: implement type. "Char" -> "specChar" (rare, will give more points)
const TileComponent = ({
  type,
  value,
  points,
  isFlipped,
  onClick,
  isSelected = false,
  isDeck = false,
}: TileComponentProps): Element => (
  <div
    style={{ backgroundColor: isSelected ? 'gray' : 'black' }}
    className="tile"
    onClick={!isFlipped && isDeck ? onClick : null}
  >
    { !isFlipped && (
      <>
        <p className="tile-value">{value}</p>
        <p className="tile-points">{points}</p>
      </>
    )}
  </div>
);

export default TileComponent;
