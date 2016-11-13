import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';
import React from 'react';

export default ({})=>{

  function doKeyDown(e) {
    if (e.keyCode == 13) {
      console.log('here');
      return;
    }
  }
  return (
    <input onKeyDown={doKeyDown} className="searchbar" placeholder="Search a chord or a song"/>
  )
}
