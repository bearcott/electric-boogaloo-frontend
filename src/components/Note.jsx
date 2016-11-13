import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';
import React from 'react';

export default ({name, note, octave, isActive, isClicked})=>{
  const url = require(`../static/${name}_${note}${octave}_very-long_forte_normal.mp3`);
  let audio;

  const doClick = ()=>{
    audio.pause();
    audio.currentTime=0.15;
    audio.play();
  }
  return (
    <div onClick={doClick} className={"note "+((isActive)?"active":'')}>
      {note}
      {(isClicked)?doClick():''}
      <audio src={url} ref={x=>audio=x}></audio>
    </div>
  )
}
