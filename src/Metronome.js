import React, { Component} from 'react';
import './Metronome.css';

// Webpack loads these
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };

    // Create audio objects with Webpack
    // and play them
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }


    playClick =() => {
      const { count, beatsPerMeasure } = this.state;

      // The first beat will have a different sound than the others
      if (count % beatsPerMeasure === 0) {
        this.click2.play();
      } else {
        this.click1.play();
      }

      // Keep track of which beat we are on
      this.setState(state => ({
        count: (state.count + 1) % state.beatsPerMeasure
      }));
    }

    startStop = () => {
      if (this.state.playing) {
        // Stop the timer
        clearInterval(this.timer);
        this.setState({
          playing: false
        });
      } else {
        // Start a timer with current bpm
        this.timer = setInterval(this.playClick,(60 / this.state.bpm) * 100);
        this.setState({
            count: 0,
            playing: true
            // Play a click immediatel after setState finishes
          }, this.playClick);
      }
    }


  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing) {
      // Stop old timer and start new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set the new BPM with slider in the frontend which resets the beat counter
      this.setState({
        count: 0,
        bpm
      });
    } else {
      // Otherwise update BPM
      this.setState({ bpm });
    }
  }

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop}>
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}
export default Metronome;
