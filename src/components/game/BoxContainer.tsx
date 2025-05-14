import React from 'react';
import './BoxContainer.css'

type HighScoresProps = {
  component: JSX.Element,
  maxWidth: number,
  height: number,
}

const HighScores = ({ component, maxWidth = 500, height = 300 }: HighScoresProps): JSX.Element => (
  <div
    className="box-container"
    style={{
      maxWidth,
      height
    }}>
    {component}
  </div>
);

export default HighScores;
