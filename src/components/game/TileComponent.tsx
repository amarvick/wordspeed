import React, { MouseEventHandler, ReactElement } from 'react';

import './TileComponent.css';

type TileComponentProps = {
  type: string;
  value: string;
  points: number;
  key: string;
  isFlipped: boolean;
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isDeck?: boolean;
};

// TODO: implement type. "Char" -> "specChar" (rare, will give more points)
const TileComponent = ({
  type,
  value,
  points,
  key,
  isFlipped,
  onClick,
  isSelected = false,
  isDeck = false,
}: TileComponentProps): ReactElement => (
  <div
    style={{ backgroundColor: isSelected ? 'gray' : 'black' }}
    className="tile"
    onClick={!isFlipped && isDeck ? onClick : undefined}
    key={key}
    tabIndex={0}
  >
    {!isFlipped && (
      <>
        <p className="tile-value">{value}</p>
        <p className="tile-points">{points}</p>
      </>
    )}
  </div>
);

export default TileComponent;
