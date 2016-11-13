import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';
import React from 'react';

export default ({name, note, octave, isActive, isClicked})=>{
  const url = require(`../static/${name}_${note}${octave}_very-long_forte_normal.mp3`);
  let audio;
  let div;

  const doClick = ()=>{
    audio.pause();
    audio.currentTime=0.15;
    audio.play();
  }
  return (
    <div ref={x=>div=x} onClick={doClick} className={"note "+((isActive)?"active":'')}>
      {note}
      {/* {(div)?div.click():null}
      {(isClicked)?div.click():''} */}
      <audio src={url} ref={x=>audio=x}></audio>
    </div>
  )
}
