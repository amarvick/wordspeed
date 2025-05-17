import React, { ReactElement, ReactNode } from 'react';
import './BoxContainer.css';

type BoxContainerProps = {
  component: ReactNode;
  maxWidth?: number;
  height?: number;
};

const BoxContainer = ({
  component,
  maxWidth = 500,
  height = 300,
}: BoxContainerProps): ReactElement => (
  <div
    className="box-container"
    style={{
      maxWidth,
      height,
    }}
  >
    {component}
  </div>
);

export default BoxContainer;
