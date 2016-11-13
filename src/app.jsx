import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import Fretboard from './components/Fretboard';
import ChordChart from './components/ChordChart';
import Searchbar from './components/Searchbar';
import SongGame from './components/SongGame';
import songs from './static/songs';
import chordGenerator from './utils/chordGenerator';
import teoria from './utils/teoria';
import 'whatwg-fetch';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.notes = ['G','Gs','A','As','B','C','Cs','D','Ds','E','F','Fs'];
    this.tuning = ['G','C','E','A'];
    this.interval = null;
    this.server = "http://rodqgzqaza.localtunnel.me/";
    this.state = {
      menu: null,
      chord: 'C',
      song: null
    }
  }
  parseGameText(text) {
    const arr = text.replace(/[^A-Za-z0-9]/g, ' ').replace(/\s+/g, " ").split(' ');
    let phrase = [];
    let chords = [];
    let words = [];
    let inChords = true;
    arr.forEach(word=>{
      if (typeof word[0] === 'undefined') return;
      //make sure it could be a chord
      if (word[0] !== word[0].toLowerCase()) {
        try {
          let chord = chordGenerator(word);
          if (!inChords && word.length && chords.length) {
            phrase.push({chords,words: words.join(' ')});
            chords = [];
            words = [];
          }
          chords.push({name: word, fingering: chord[0]});
          inChords = true;
        }catch(e){
          if (inChords && word.length && chords.length) {
            phrase.push({chords,words: words.join(' ')});
            chords = [];
            words = [];
          }
          words.push(word);
          inChords = false;
        }
      }else{
        words.push(word);
      }
    })

    return phrase;
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
    fetch(this.server,{
      method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({strings: chordGenerator(note)[0].split('').map(x=>parseInt(x))})});
    this.setState({
      song: null,
      chord: note,
      menu: 'chords',
      fingering: chordGenerator(note)[0]
    })
  }
  showSongs(song) {
    const game = this.parseGameText(song.text[0]);
    this.setState({
      song: song.title,
      album: song.album,
      artist: song.artist,
      text: song.text[0],

      progress: 0,
      chords: game[0].chords,
      words: game[0].words,
      game: game,

      chord: null,
      menu: 'songs',
      fingering: null
    })
    clearInterval(this.interval);
    this.gameStart();
  }
  gameStart() {
    //next cycle
    this.interval = setInterval(()=>{
      if (this.state.progress == this.state.game.length-1) {
        this.setState({menu: null});
        clearInterval(this.interval);
        return;
      }
      this.setState({
        progress: ++this.state.progress,
        chords: this.state.game[this.state.progress].chords,
        words: this.state.game[this.state.progress].words
      });
    },4000);
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
    const req = setInterval(()=>{
      fetch(this.server).then((d)=>d.json()).then(d=>{
        // console.log(d.neck.reverse(), this.state.fingering);
        // fetch(this.server,{
        //   method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({strings: this.state.fingering.split('').map((x,i)=>{
        //   if (parseInt(x) == d.neck.reverse()[i])
        //     return 0
        //   else
        //     return parseInt(x)
        // })})});
        this.setState({
          userfingering: d.neck.reverse(),
          userclicked: d.body.reverse().map((x,i)=>{
            if (x)
              return d.neck[i]
            else
              return null
          }),
          userbody: d.body
        })
      });
    },50);
  }
  render() {
    let subtitle = '';
    let gameText = '';
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
            <Fretboard fretboard={this.fretboard()} short={this.state.menu == 'songs'} highlighted={this.state.userfingering} userbody={this.state.userbody} clicked={this.state.userclicked}/>
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
            <SongGame chords={this.state.chords} words={this.state.words}/>
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
