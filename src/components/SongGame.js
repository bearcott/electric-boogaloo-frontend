import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';
import React from 'react';
import chordDrawer from '../utils/chordDrawer';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = 'lmao';
  }
  componentDidMount() {
    chordDrawer.drawChord(this.canvas.getContext('2d'),this.props.chord,this.props.fingering);
  }
  componentWillReceiveProps(next) {
    chordDrawer.drawChord(this.canvas.getContext('2d'),next.chord,next.fingering);
  }
  render() {
    return (
      <div className="chordCanvas">
        <canvas ref={x=>this.canvas=x}/>
      </div>
    )
  }
}
