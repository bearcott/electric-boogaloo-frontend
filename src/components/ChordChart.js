import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../index.scss';
import React from 'react';
import chordGenerator from '../utils/chordGenerator';
import chordDrawer from '../utils/chordDrawer';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = 'lmao';
  }
  componentDidMount() {
    chordDrawer.drawChord(this.canvas.getContext('2d'),this.props.chord,chordGenerator(this.props.chord)[0]);
  }
  render() {
    return (
      <canvas ref={x=>this.canvas=x}/>
    )
  }
}
