import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import Fretboard from './components/Fretboard';

export default class App extends React.Component {
  fretboard() {
    const maxFrets = 4;
    const tuning = ['G','C','E','A'];

    const frets=[];
    for (let i=0;i<maxFrets; i++) {
      frets.push(tuning.map(note=>this.nextFret(note,i)));
    }
    console.log(frets);
    return frets;
  };
  nextFret(tuning, offset) {
    const notes = ['G','Gs','A','As','B','C','Cs','D','Ds','E','F','Fs'];
    const base = 3;

    return {
      note: notes[(notes.indexOf(tuning)+offset) % (notes.length)],
      octave: base+Math.floor((notes.indexOf(tuning)+offset)/(notes.length))
    };
  }
  render() {
    return (
      <div>
        <h1>Banjo</h1>
        <div className="row">
          <div className="col-md-12">
            <Fretboard fretboard={this.fretboard()}/>
          </div>
        </div>
        <div className="row menu">
          <div className="col-md-4">
            <h2>Learn Chords</h2>
          </div>
          <div className="col-md-4">
            <h2>Learn Songs</h2>
          </div>
          <div className="col-md-4">
            <h2>Jam Out</h2>
          </div>
        </div>


        <p>This React project just works including <span className="redBg">module</span> local styles.</p>
        <p>Global bootstrap css import works too as you can see on the following button.</p>
        <p><a href="/" className="btn btn-primary btn-lg">Enjoy!</a></p>
      </div>
    )
  }
}
