import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import Fretboard from './components/Fretboard';
import ChordChart from './components/ChordChart';
import Searchbar from './components/Searchbar';
import SongGame from './components/SongGame';
import songs from './static/songs';
import chordGenerator from './utils/chordGenerator';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.notes = ['G','Gs','A','As','B','C','Cs','D','Ds','E','F','Fs'];
    this.tuning = ['G','C','E','A'];
    this.state = {
      menu: null,
      chord: 'C',
      song: null
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
        <a
          className={(note == this.state.chord) ? 'selected' : ''}
          key={note}
          onClick={()=>this.showChords(note)}>
          {note} Major
        </a>
      ))
    )
  }
  showChords(note) {
    console.log(note);
    this.setState({
      song: null,
      chord: note,
      menu: 'chords',
      fingering: chordGenerator(note)[0]
    })
  }
  showSongs(song) {
    this.setState({
      song: song.title,
      album: song.album,
      artist: song.artist,
      chord: null,
      menu: 'songs',
      fingering: null
    })
  }
  suggestedSongs() {
    const links = [];
    for (let i=0;i<10;i++) {
      links.push(
        <a className={(songs[i].title == this.state.song) ? 'selected' : ''}
         key={i}
         onClick={()=>this.showSongs(songs[i])}>
          {songs[i].artist} <b>{songs[i].title}</b>
        </a>
      )
    }
    return links
  }
  componentDidMount() {

  }
  render() {
    let subtitle = '';
    switch (this.state.menu) {
      case 'chords':
        subtitle = `> ${this.state.chord} chord`;
        break;
      case 'songs':
        subtitle = `> ${this.state.song}`;
        break;
    }
    return (
      <div>
        <h1 className="title">Banjo <span>{subtitle}</span></h1>
        <Searchbar />
        <div className="row">
          <div className="col-md-10">
            <Fretboard fretboard={this.fretboard()} short={this.state.menu == 'songs'} highlighted={this.state.fingering}/>
          </div>
          { (this.state.menu == 'chords') ? (
          <div className="col-md-2 info chords">
            <div className="title">
              <span>chord</span>
              <h1>{this.state.chord}</h1>
            </div>
            <ChordChart chord={this.state.chord} fingering={this.state.fingering}/>
          </div>
          ) : null}
          { (this.state.menu == 'songs') ? (
            <SongGame/>
          ) : null}
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
