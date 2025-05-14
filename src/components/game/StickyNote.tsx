import React from 'react'
import './StickyNote.css';

type StickyNoteProps = {
  header: string,
  text: string
}

const StickyNote = ({
  header,
  text,
}: StickyNoteProps): Element => (
  <div className="sticky-note">
    <h1>{header}</h1>
    <p>{text}</p>
  </div>
)

export default StickyNote;