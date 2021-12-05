import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { YoutubePlayer } from 'capacitor-youtube-player';
import { IPlayerOptions, IPlaylistOptions } from 'capacitor-youtube-player/dist/esm/web/models/models';

@Component({
  selector: 'app-video-playlist',
  templateUrl: './video-playlist.page.html',
  styleUrls: ['./video-playlist.page.scss'],
})
export class VideoPlaylistPage implements OnInit, AfterViewInit {

  currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (Capacitor.getPlatform() === 'web') {
      this.initializeYoutubePlayerPluginWeb();
    }
  }

  async initializeYoutubePlayerPluginWeb() {
    console.log('HomePage::initializeYoutubePlayerPluginWeb() | method called');

    const optionsPlayer1: IPlayerOptions = {playerId: 'youtube-player-playlist1', playerSize: {width: 640, height: 360}, videoId: 'atAeP-rR8Xs', fullscreen: false, debug: true};
    const resultPlayer1 = await YoutubePlayer.initialize(optionsPlayer1);
    console.log('playerReady', resultPlayer1);

    const playlistOptions1: IPlaylistOptions = {listType: 'playlist', list: 'PLOMESIqyrpf-A8O-Hym9pvX1D4vDSDcDT', index: 0};
    const resultCuePlaylist = await YoutubePlayer.cuePlaylist('youtube-player-playlist1', playlistOptions1);
    console.log('cuePlaylist', resultCuePlaylist);


    const optionsPlayer2: IPlayerOptions = {playerId: 'youtube-player-playlist2', playerSize: {width: 640, height: 360}, videoId: 'OB2zbmS7bW4', fullscreen: false, debug: true};
    const resultPlayer2 = await YoutubePlayer.initialize(optionsPlayer2);
    console.log('playerReady', resultPlayer2);

    const playlistOptions2: IPlaylistOptions = {listType: 'playlist', playlist: ['PLOMESIqyrpf8yoq4MbK28VemFpoX9PB7k', 'PLOMESIqyrpf9EbG_25aGtgZwgR1TCnrBr'], index: 0};
    const resultLoadPlaylist = await YoutubePlayer.loadPlaylist('youtube-player-playlist2', playlistOptions2);
    console.log('loadPlaylist', resultLoadPlaylist);

  }

}
