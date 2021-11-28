import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { YoutubePlayer } from 'capacitor-youtube-player';
import { IPlayerOptions } from 'capacitor-youtube-player/dist/esm/web/models/models';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.page.html',
  styleUrls: ['./video-list.page.scss'],
})
export class VideoListPage implements OnInit {

  currentYear = new Date().getFullYear();

  videos = [
    {id: 'youtube-player-1', videoId: 'aafHvwRU-BU'},
    {id: 'youtube-player-2', videoId: 'HampVpMVL4I'},
    {id: 'youtube-player-3', videoId: 'Kf7o9DMc14Q'},
    {id: 'youtube-player-4', videoId: 'IykMiS2mnVk'},
    {id: 'youtube-player-5', videoId: '3S6r2_nxMho'},
    {id: 'youtube-player-6', videoId: 'NVJX3C_bttg'},
    {id: 'youtube-player-7', videoId: 'LREz3II0lTQ'},
    {id: 'youtube-player-8', videoId: '0E1l2UgXh5k'},
    {id: 'youtube-player-9', videoId: '2AezKG8_0u4'},
    {id: 'youtube-player-10', videoId: '60EVeLNAFUQ'},
  ];

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

    let options: IPlayerOptions = {playerId: this.videos[0].id, playerSize: {width: 640, height: 360}, videoId: this.videos[0].videoId, fullscreen: true, debug: true};
    const result = await YoutubePlayer.initialize(options);
    console.log('playerReady', result);

    const promisesArray = [];
    this.videos.slice(1).forEach(video => {
      console.log('video', video);
      options = {...options, playerId: video.id, videoId: video.videoId};
      promisesArray.push(YoutubePlayer.initialize(options));
    });

    await Promise.all(promisesArray);
  }

}
