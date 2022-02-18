import React from 'react'
import './DataComponent.css';

type DataComponentProps = {
  header: string,
  text: string
}

const DataComponent = ({
  header,
  text,
}: DataComponentProps): JSX.Element => (
  <div className="data-component">
    <h2>{header}</h2>
    <p>{text}</p>
  </div>
)

export default DataComponent;