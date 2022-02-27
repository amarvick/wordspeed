import React from 'react';
import './BoxContainer.css'

type HighScoresProps = {
  component: JSX.Element,
  width: number,
  height: number,
}

const HighScores = ({ component, width = 500, height = 300 }: HighScoresProps): JSX.Element => (
  <div
    className="box-container"
    style={{
      width,
      height
    }}>
    {component}
  </div>
);

export default HighScores;
