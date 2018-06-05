import { WebPlugin } from '@capacitor/core';

import { IPlayerSize, IPlayerVars } from './web/models/models';

export function YT() {
  return (<any>window)['YT'];
}

export function Player() {
  return YT().Player;
}

export class YoutubePlayerPluginWeb extends WebPlugin {

  players: any = {};
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

  async createPlayer(options: {playerId: string, playerSize: IPlayerSize, playerVars?: IPlayerVars, videoId: string}) {
    console.log('[Youtube Player Plugin Web]: createPlayer');
    console.log('options', options);
    const playerSize = this.checkSize(options);
    console.log('playerSize', playerSize);

    return await new Promise(resolve => {
      console.log('Inside promise');
      // This function creates an <iframe> (and YouTube player)
      // after the API code downloads.
      // (<any>window).onYouTubeIframeAPIReady = () => {
        console.log((<any>window).YT);
        this.players[options.playerId] = new (<any>window).YT.Player(options.playerId, {
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
                case (<any>window).YT.PlayerState.PLAYING:
                    console.log('[Youtube Player Plugin Web]: playing');
                    break;
                case (<any>window).YT.PlayerState.PAUSED:
                    console.log('[Youtube Player Plugin Web]: paused');
                    break;
                case (<any>window).YT.PlayerState.ENDED:
                    console.log('[Youtube Player Plugin Web]: ended');
                    break;
                case (<any>window).YT.PlayerState.BUFFERING:
                  console.log('[Youtube Player Plugin Web]: buffering');
                  break;
                case (<any>window).YT.PlayerState.CUED:
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
        console.log('player', this.players[options.playerId]);
      // };
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


  // Methods playing video.

  /*********/

  async stopVideo() {
    console.log('[Youtube Player Plugin Web]: stopVideo');
    this.player.stopVideo();
    return Promise.resolve({result: { method: 'stopVideo', value: true }});
  }

  async playVideo() {
    console.log('[Youtube Player Plugin Web]: playVideo');
    this.player.playVideo();
    return Promise.resolve({result: { method: 'playVideo', value: true }});
  }

  async pauseVideo() {
    console.log('[Youtube Player Plugin Web]: pauseVideo');
    this.player.pauseVideo();
    return Promise.resolve({result: { method: 'pauseVideo', value: true }});
  }

  async seekTo(seconds: number, allowSeekAhead: boolean) {
    console.log('[Youtube Player Plugin Web]: seekTo');
    this.player.seekTo(seconds, allowSeekAhead);
    return Promise.resolve({result: { method: 'seekTo', value: true, seconds: seconds, allowSeekAhead: allowSeekAhead }});
  }

  async clearVideo() {
    this.player.clearVideo();
    return Promise.resolve({result: { method: 'clearVideo', value: true }});
  }

  async loadVideoById(options: {videoId: string, startSeconds?: number, endSeconds?: number, suggestedQuality?: string}) {
    this.player.loadVideoById(options);
    return Promise.resolve({result: { method: 'loadVideoById', value: true, options: options }});
  }

  async cueVideoById(options: {videoId: string, startSeconds?: number, endSeconds?: number, suggestedQuality?: string}) {
    this.player.cueVideoById(options);
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
