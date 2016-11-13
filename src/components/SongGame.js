
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';
import React from 'react';
import chordDrawer from '../utils/chordDrawer';
import ChordChart from './ChordChart';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.wat = null;
  }
  componentWillReceiveProps() {
    console.log(this.wat.classList);
    this.wat.classList.remove("progress");
    void this.wat.offsetWidth;
    this.wat.classList.add("progress");
  }

  render() {
    console.log(this.props.chords);
    return (
      <div className="songspace">
        <div className="stuff">
          {
            this.props.chords.map((chord,i)=>(
              <div key={i} className="lmao">
                <h1>{chord.name}</h1>
                <ChordChart chord={chord.name} fingering={chord.fingering} />
              </div>
            ))
          }
        </div>
        <div ref={x=>this.wat=x} className="progress"><div className="bar"></div></div>
        <div className="lyrics">{this.props.words}</div>
      </div>
    )
  }
}
