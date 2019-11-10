import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { YoutubePlayerWeb } from 'capacitor-youtube-player';

import { Plugins, Capacitor } from '@capacitor/core';

const App: React.FC = () => {

  useEffect(() => {
    console.log('App::componentDidMount() | method called')

    async function initializeYoutubePlayerPluginWeb() {
      console.log('App::initializeYoutubePlayerPluginWeb() | method called');
      const options = {playerId: 'youtube-player', playerSize: {width: 640, height: 360}, videoId: 'tDW2C6rcH6M', debug: true};
      const result = await YoutubePlayerWeb.initialize(options);
      console.log('playerReady', result);
      (result as any).player.addEventListener('onPlaybackQualityChange', (event: any) => {
        console.log('playback quality is', event);
      });
      (result as any).player.addEventListener('onStateChange', (event: any) => {
        console.log('state is', event);
      });
    };

    async function initializeYoutubePlayerPluginNative() {
    };

    if (Capacitor.platform === 'web') {
      initializeYoutubePlayerPluginWeb();
    } else { // Native
      initializeYoutubePlayerPluginNative();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to Your React.js + TypeScript + Capacitor App</h1>
        <p>
          For a guide and recipes on how to configure / use capacitor youtube player,
          check out the
          <a href="https://github.com/abritopach/capacitor-youtube-player" target="_blank" rel="noopener"> capacitor-youtube-player documentation</a>.
        </p>
        {/* The <iframe> (and video player) will replace this <div> tag. */}
        <div id="youtube-player"></div>
      </header>
    </div>
  );
}

export default App
