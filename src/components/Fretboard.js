import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';
import React from 'react';
import Note from './Note';

export default ({fretboard, highlighted, clicked, short})=>{
  highlighted = (highlighted) ? highlighted : "";
  clicked = (clicked) ? clicked : "";
  return (
    <div className={"fretboard-container "+((short)?'short':'')}>
      <div className="body">
      </div>
      <div className="fretboard">
        {
          fretboard.map((frets,fretNum)=>(
            <div key={fretNum} className="fret">
              {
                frets.map((note,noteNum)=>(
                  <Note
                    key={note.note+fretNum}
                    name="banjo" note={note.note}
                    octave={note.octave}
                    isActive={(parseInt(highlighted[noteNum]) == fretNum)}
                    isClicked={(parseInt(clicked[noteNum]) == fretNum)}
                    />
                ))
              }
            </div>
          ))
        }
        <div className="fret filler"></div>
        <div className="fret filler"></div>
        <div className="fret filler"></div>
        <div className="fret filler"></div>
        <div className="fret filler"></div>
        <div className="head"></div>
        <div className="strings">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}
