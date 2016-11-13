import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';
import React from 'react';
import Note from './Note';

export default ({fretboard})=>{
  return (
    <div className="fretboard">
      {
        fretboard.map((frets,fretNum)=>(
          <div key={fretNum} className="fret">
            {
              frets.map(note=>(
                <Note key={note.note+fretNum} name="banjo" note={note.note} octave={note.octave}/>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
