import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import Fretboard from './components/Fretboard';
import ChordChart from './components/ChordChart';
import songs from './static/songs';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = 'lmao';
    this.notes = ['G','Gs','A','As','B','C','Cs','D','Ds','E','F','Fs'];
    this.tuning = ['G','C','E','A'];
    this.state = {
      menu: null,
      chord: 'C'
    }
  }
  fretboard() {
    const maxFrets = 4;

    const frets=[];
    for (let i=0;i<maxFrets; i++) {
      frets.push(this.tuning.map(note=>this.nextFret(note,i)));
    }
    return frets;
  };
  nextFret(note, offset) {
    const base = 3;

    return {
      note: this.notes[(this.notes.indexOf(note)+offset) % (this.notes.length)],
      octave: base+Math.floor((this.notes.indexOf(note)+offset)/(this.notes.length))
    };
  }
  suggestedChords(notes) {
    return (
      notes.filter(note=>note.indexOf('s')==-1).map(note=>(
        <a className="" key={note} onClick={this.showChords(note)}>
          {note} Major
        </a>
      ))
    )
  }
  showChords(note) {

  }
  showSongs(note) {

  }
  suggestedSongs() {
    for (let i=0;i<10;i++) {
      return (
        <a className="" key={i} onClick={this.showSongs(songs[i])}>
          {songs[i].title}
        </a>
      )
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <h1>Banjo</h1>
        <ChordChart chord="C"/>
        <div className="row">
          <div className="col-md-12">
            <Fretboard fretboard={this.fretboard()}/>
          </div>
        </div>
        <div className="row menu">
          <div className="col-md-4">
            <h2>Learn Chords</h2>
            {this.suggestedChords(this.notes)}
          </div>
          <div className="col-md-4">
            <h2>Learn Songs</h2>
            {this.suggestedSongs()}
          </div>
          <div className="col-md-4">
            <h2>Jam Session</h2>
          </div>
        </div>

        {/* <p>This React project just works including <span className="redBg">module</span> local styles.</p>
        <p>Global bootstrap css import works too as you can see on the following button.</p>
        <p><a href="/" className="btn btn-primary btn-lg">Enjoy!</a></p> */}
      </div>
    )
  }
}
