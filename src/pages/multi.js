import React, { Component } from 'react';
// import '../styles/css/imports.scss';
// import ReactHowler from 'react-howler'

import MainButtons from '../components/MainButtons';
import Notification from '../components/Notification';
// import StationsWrapper from '../components/StationsWrapper';
import VolumeSlider from '../components/VolumeSlider';
// import Cassette from '../components/Cassette';

import StationManager from '../services/StationManager';

export default class Radio extends Component {
  constructor() {
    super();
    this.state = {
      currentStation: null,
      isPlaying: false,
      isLoading: false,
      volume: 0.5,
    };

    this.stationManager = new StationManager(() => {
      this.setState({ isLoading: false, isPlaying: true });
    });
    this.stationManager.volume = 0.5;

    this.play = this.play.bind(this);
    this.continue = this.continue.bind(this);
    this.stop = this.stop.bind(this);
  }


  onVolumeChange(volume) {
    this.setState({ volume });
    this.stationManager.volumeValue = volume;
  }

  play(station = "soro-soke-live") {
    this.setState({ isLoading: true, isPlaying: false, currentStation: station });
    this.stop();
    this.stationManager.play(station);
  }

  continue() {
    const { currentStation } = this.state;
    this.setState({ isLoading: true, isPlaying: false });
    this.stationManager.play(currentStation);
  }

  stop() {
    this.setState({ isPlaying: false });
    this.stationManager.stop();
  }

  render() {
    const { currentStation, isPlaying, isLoading, volume } = this.state;
    return (
      <div className="App">


        <Notification isLoading={isLoading} />


        {/*   
          
          <StationsWrapper
            onPlay={this.play}
            onStop={this.stop}
            isPlaying={isPlaying}
            isLoading={isLoading}
            currentStation={currentStation}
          />
          <ReactHowler
            src='https://s4.radio.co/s99d55c85b/listen'
            playing={true}
            ref={(ref) => (this.player = ref)}
          />
          
          <Cassette nowPlaying={currentStation} isPlaying={isPlaying} />
        */}



        <MainButtons
          onPlay={this.continue}
          onStop={this.stop}
          isPlaying={isPlaying}
          isLoading={isLoading}
          currentStation={currentStation}
        />
        <VolumeSlider
          currentVolume={volume}
          setVolume={(volumeValue) => { this.onVolumeChange(volumeValue); }}
        />
      </div>
    );
  }
}