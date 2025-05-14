import React from 'react'
import './StickyNote.css';

type DataComponentProps = {
  header: string,
  text: string
}

const DataComponent = ({
  header,
  text,
}: DataComponentProps): Element => (
  <div className="sticky-note">
    <h1>{header}</h1>
    <p>{text}</p>
  </div>
)

export default DataComponent;