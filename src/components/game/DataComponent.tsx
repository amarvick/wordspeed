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
    <h1>{header}</h1>
    <p>{text}</p>
  </div>
)

export default DataComponent;