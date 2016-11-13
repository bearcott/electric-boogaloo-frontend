import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';
import React from 'react';
import Note from './Note';

export default ({fretboard, highlighted, clicked, short, userbody})=>{
  highlighted = (highlighted) ? highlighted : "";
  clicked = (clicked) ? clicked : "";
  userbody = (userbody) ? userbody : "";
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
          <span className={((userbody[3])?"vibrate":'')}></span>
          <span className={((userbody[2])?"vibrate":'')}></span>
          <span className={((userbody[1])?"vibrate":'')}></span>
          <span className={((userbody[0])?"vibrate":'')}></span>
        </div>
      </div>
    </div>
  )
}
