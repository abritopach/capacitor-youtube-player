import { WebPlugin } from '@capacitor/core';

import { IPlayerSize, IPlayerVars } from './web/models/models';

export function YT() {
  return (<any>window)['YT'];
}

export function Player() {
  return YT().Player;
}

export function PlayerState() {
  return YT().PlayerState;
}

export class YoutubePlayerPluginWeb extends WebPlugin {

  players: any = [];
  player: any;
  playerApiLoaded: Boolean = false;
  private readonly defaultSizes: IPlayerSize = {
    height: 270,
    width: 367
  };

  constructor() {
    super({
      name: 'YoutubePlayerPluginWeb',
      platforms: ['web']
    });
  }

  async loadPlayerApi() {
    console.log('[Youtube Player Plugin Web]: loadPlayerApi');
    return await new Promise(resolve => {

      (<any>window).onYouTubeIframeAPIReady = () => {
        console.log('[Youtube Player Plugin Web]: onYouTubeIframeAPIReady');
        this.playerApiLoaded = true;
        resolve(true);
      }

      // This code loads the IFrame Player API code asynchronously.
      const tag = document.createElement('script');
      
      /*
      const callback = () => {
        console.log('[Youtube Player Plugin Web]: script loaded.');
        resolve(true);
      }
      tag.onload = callback;
      */
      tag.type = 'text/javascript';
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    });
  }

  checkSize(options: {playerId: string, playerSize: IPlayerSize, playerVars?: IPlayerVars, videoId: string}) {
    const playerSize = {
      height: options.playerSize.height || this.defaultSizes.height,
      width: options.playerSize.width || this.defaultSizes.width
    };
    if (playerSize.height > window.innerHeight) playerSize.height = window.innerHeight;
    if (playerSize.width > window.innerWidth) playerSize.width = window.innerWidth;

    return playerSize;
  }

  // This function creates an <iframe> (and YouTube player)
  // after the API code downloads.
  async createPlayer(options: {playerId: string, playerSize: IPlayerSize, playerVars?: IPlayerVars, videoId: string}) {
    console.log('[Youtube Player Plugin Web]: createPlayer');
    console.log('options', options);
    const playerSize = this.checkSize(options);
    console.log('playerSize', playerSize);

    return await new Promise(resolve => {
      console.log(YT());

      const player = Player();

      this.players[options.playerId] = new player(options.playerId, {
        ...options.playerVars,
        ...playerSize,
        videoId: options.videoId,
        events: {
          // The API will call this function when the video player is ready.
          'onReady': () => {
            console.log('[Youtube Player Plugin Web]: onPlayerReady');
            return resolve({ playerReady: true, player: this.players[options.playerId]});
          },
          'onStateChange': (event: any) => {
            console.log('[Youtube Player Plugin Web]: onPlayerStateChange', event.data);
            switch (event.data) {
              case PlayerState().PLAYING:
                  console.log('[Youtube Player Plugin Web]: playing');
                  break;
              case PlayerState().PAUSED:
                  console.log('[Youtube Player Plugin Web]: paused');
                  break;
              case PlayerState().ENDED:
                  console.log('[Youtube Player Plugin Web]: ended');
                  break;
              case PlayerState().BUFFERING:
                console.log('[Youtube Player Plugin Web]: buffering');
                break;
              case PlayerState().CUED:
                console.log('[Youtube Player Plugin Web]: cued');
                break;
          }
          },
          'onPlaybackQualityChange': () => {
            console.log('[Youtube Player Plugin Web]: onPlayerPlaybackQualityChange');
          },
          'onError': () => {
            console.log('[Youtube Player Plugin Web]: onPlayerError');
          }
        }
      });

      console.log('players', this.players);
      console.log('player', this.players[options.playerId]);
    });
  }

  async initialize(options: {playerId: string, playerSize: IPlayerSize, playerVars?: IPlayerVars, videoId: string}) {
    console.log('[Youtube Player Plugin Web]: initialize');
    if (!this.playerApiLoaded) {
      const result = await this.loadPlayerApi();
      console.log('[Youtube Player Plugin Web]: loadPlayerApi result', result);
    }
    if (Player && this.playerApiLoaded) { 
      const playerReady = await this.createPlayer(options);
      console.log('[Youtube Player Plugin Web]: initialize completed', playerReady);
      return Promise.resolve(playerReady);
    }
  }

  async destroy(playerId: string) {
    console.log('[Youtube Player Plugin Web]: destroy');
    this.players[playerId].destroy();
    return Promise.resolve({result: { method: 'destroy', value: true }});
  }


  // Methods playing video.

  /*********/

  async stopVideo(playerId: string) {
    console.log('[Youtube Player Plugin Web]: stopVideo');
    this.players[playerId].stopVideo();
    return Promise.resolve({result: { method: 'stopVideo', value: true }});
  }

  async playVideo(playerId: string) {
    console.log('[Youtube Player Plugin Web]: playVideo');
    this.players[playerId].playVideo();
    return Promise.resolve({result: { method: 'playVideo', value: true }});
  }

  async pauseVideo(playerId: string) {
    console.log('[Youtube Player Plugin Web]: pauseVideo');
    this.players[playerId].pauseVideo();
    return Promise.resolve({result: { method: 'pauseVideo', value: true }});
  }

  async seekTo(playerId: string, seconds: number, allowSeekAhead: boolean) {
    console.log('[Youtube Player Plugin Web]: seekTo');
    this.players[playerId].seekTo(seconds, allowSeekAhead);
    return Promise.resolve({result: { method: 'seekTo', value: true, seconds: seconds, allowSeekAhead: allowSeekAhead }});
  }

  async clearVideo(playerId: string) {
    this.players[playerId].clearVideo();
    return Promise.resolve({result: { method: 'clearVideo', value: true }});
  }

  async loadVideoById(playerId: string, options: {videoId: string, startSeconds?: number, endSeconds?: number, suggestedQuality?: string}) {
    this.players[playerId].loadVideoById(options);
    return Promise.resolve({result: { method: 'loadVideoById', value: true, options: options }});
  }

  async cueVideoById(playerId: string, options: {videoId: string, startSeconds?: number, endSeconds?: number, suggestedQuality?: string}) {
    this.players[playerId].cueVideoById(options);
    return Promise.resolve({result: { method: 'cueVideoById', value: true, options: options }});
  }

  /*********/

  // Methods modifying the player volume.

  /*********/

  /*********/

  async echo(options: { value: string }) {
    console.log('ECHO', options);
    return Promise.resolve(options);
  }

}

const YoutubePlayerWeb = new YoutubePlayerPluginWeb();

export { YoutubePlayerWeb };
