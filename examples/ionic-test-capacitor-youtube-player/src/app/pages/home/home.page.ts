import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { YoutubePlayer } from 'capacitor-youtube-player';
import { IPlayerOptions, PlayerEvent } from 'capacitor-youtube-player/dist/esm/web/models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {

  currentYear = new Date().getFullYear();

  constructor() {
    console.log('HomePage::constructor() | method called');
  }

  ngOnInit() {
    console.log('HomePage::ngOnInit() | method called');
  }

  ngAfterViewInit() {
    if (Capacitor.getPlatform() === 'web') {
      this.initializeYoutubePlayerPluginWeb();
    } else { // Native
      this.initializeYoutubePlayerPluginNative();
    }
  }

  ngOnDestroy() {
    console.log('HomePage::ngOnDestroy() | method called');
  }

  async initializeYoutubePlayerPluginWeb() {
    console.log('HomePage::initializeYoutubePlayerPluginWeb() | method called');
    const options: IPlayerOptions = {
      playerId: 'youtube-player',
      playerSize: {width: 640, height: 360},
      playerVars: {
        autoplay: 1,
        rel: 0,
        color: 'white',
        showinfo: 1,
      },
      videoId: 'tDW2C6rcH6M',
      fullscreen: false,
      debug: true
    };
    const result = await YoutubePlayer.initialize(options);
    console.log('playerReady', result);

    (result as any).player.addEventListener('onPlaybackQualityChange', (event) => {
      console.log('playback quality is', event);
    });

    (result as any).player.addEventListener('onStateChange', (event) => {
      console.log('state is', event);
    });

    const options1: IPlayerOptions = {playerId: 'youtube-player1', playerSize: {width: 640, height: 360}, videoId: 'M1F81V-NhP0'};
    const result1 = await YoutubePlayer.initialize(options1);
    console.log('playerReady', result1);

    YoutubePlayer.addEventListener(options1.playerId, 'onStateChange', (event: PlayerEvent) => {
      console.log(`Player ${options1.playerId} state is`, event);
    });
  }

  async destroyYoutubePlayerPluginWeb() {
    console.log('HomePage::destroyYoutubePlayerPluginWeb() | method called');
    const result = await YoutubePlayer.destroy('youtube-player');
    console.log('destroyYoutubePlayer', result);
  }

  async getPlayersEventsStatePluginWeb() {
    console.log('HomePage::getPlayersEventsStatePluginWeb() | method called');
    const result = await YoutubePlayer.getAllPlayersEventsState();
    console.log('allPlayersEventsState', result);
  }

  async initializeYoutubePlayerPluginNative() {

    const options: IPlayerOptions = {playerSize: {width: 640, height: 360}, videoId: 'tDW2C6rcH6M', fullscreen: true};
    const playerReady = await YoutubePlayer.initialize(options);
  }

}
