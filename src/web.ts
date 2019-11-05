import { WebPlugin } from '@capacitor/core';

import { IPlayerSize, IPlayerVars, IPlayerState } from './web/models/models';

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
  playersEventsState = new Map<string, IPlayerState>();
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
    // console.log('options', options);
    const playerSize = this.checkSize(options);
    // console.log('playerSize', playerSize);

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
            console.log(`[Youtube Player Plugin Web]: player "${options.playerId}" -> onPlayerReady`);
            const state: IPlayerState = {events: {onReady: {text: 'onReady', value: true}}};
            this.playersEventsState.set(options.playerId, state);
            return resolve({ playerReady: true, player: this.players[options.playerId]});
          },
          'onStateChange': (event: any) => {
            console.log(`[Youtube Player Plugin Web]: player "${options.playerId}" -> onPlayerStateChange`);
            switch (event.data) {
              case PlayerState().PLAYING:
                  console.log(`[Youtube Player Plugin Web]: player "${options.playerId}" -> playing`);
                  this.playersEventsState.get(options.playerId).events.onStateChange = {text: 'playing', value: PlayerState().PLAYING};
                  break;
              case PlayerState().PAUSED:
                  console.log(`[Youtube Player Plugin Web]: player "${options.playerId}" -> paused`);
                  this.playersEventsState.get(options.playerId).events.onStateChange = {text: 'paused', value: PlayerState().PAUSED};
                  break;
              case PlayerState().ENDED:
                  console.log(`[Youtube Player Plugin Web]: player "${options.playerId}" -> ended`);
                  this.playersEventsState.get(options.playerId).events.onStateChange = {text: 'ended', value: PlayerState().ENDED};
                  break;
              case PlayerState().BUFFERING:
                console.log(`[Youtube Player Plugin Web]: player "${options.playerId}" -> buffering`);
                this.playersEventsState.get(options.playerId).events.onStateChange = {text: 'buffering', value: PlayerState().BUFFERING};
                break;
              case PlayerState().CUED:
                console.log(`[Youtube Player Plugin Web]: player "${options.playerId}" -> cued`);
                this.playersEventsState.get(options.playerId).events.onStateChange = {text: 'cued', value: PlayerState().CUED};
                break;
            }
          },
          'onPlaybackQualityChange': (event: any) => {
            console.log(`[Youtube Player Plugin Web]: player "${options.playerId}" -> onPlayerPlaybackQualityChange quality ${event.data}`);
            this.playersEventsState.get(options.playerId).events.onPlaybackQualityChange = {text: 'onPlaybackQualityChange', value: event.data};
          },
          'onError': (error: any) => {
            console.log(`[Youtube Player Plugin Web]: player "${options.playerId}" -> onPlayerError ${error}`);
            this.playersEventsState.get(options.playerId).events.onError = {text: 'onError', value: error};
          }
        }
      });

      // console.log('players', this.players);
      // console.log('player', this.players[options.playerId]);
      console.log('playersEventsState', this.playersEventsState);
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
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> destroy`);
    this.players[playerId].destroy();
    return Promise.resolve({result: { method: 'destroy', value: true }});
  }


  // Methods playback controls and player settings.

  /*********/

  // Stops and cancels loading of the current video. This function should be reserved for rare situations when you know that the user will not be watching
  // additional video in the player. If your intent is to pause the video, you should just call the pauseVideo function. If you want to change the video
  // that the player is playing, you can call one of the queueing functions without calling stopVideo first.
  async stopVideo(playerId: string) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" ->  stopVideo`);
    this.players[playerId].stopVideo();
    return Promise.resolve({result: { method: 'stopVideo', value: true }});
  }

  // Plays the currently cued/loaded video. The final player state after this function executes will be playing (1).
  async playVideo(playerId: string) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> playVideo`);
    this.players[playerId].playVideo();
    return Promise.resolve({result: { method: 'playVideo', value: true }});
  }

  // Pauses the currently playing video. The final player state after this function executes will be paused (2) unless the player is in the ended (0) 
  // state when the function is called, in which case the player state will not change.
  async pauseVideo(playerId: string) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> pauseVideo`);
    this.players[playerId].pauseVideo();
    return Promise.resolve({result: { method: 'pauseVideo', value: true }});
  }

  // Seeks to a specified time in the video. If the player is paused when the function is called, it will remain paused. If the function is called from
  // another state (playing, video cued, etc.), the player will play the video.
  async seekTo(playerId: string, seconds: number, allowSeekAhead: boolean) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> seekTo ${seconds} seconds`);
    this.players[playerId].seekTo(seconds, allowSeekAhead);
    return Promise.resolve({result: { method: 'seekTo', value: true, seconds: seconds, allowSeekAhead: allowSeekAhead }});
  }

  // Loads and plays the specified video.
  async loadVideoById(playerId: string, options: {videoId: string, startSeconds?: number, endSeconds?: number, suggestedQuality?: string}) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> loadVideoById with options ${options}`);
    this.players[playerId].loadVideoById(options);
    return Promise.resolve({result: { method: 'loadVideoById', value: true, options: options }});
  }

  // Loads the specified video's thumbnail and prepares the player to play the video. The player does not request the FLV until playVideo() or seekTo() is called.
  async cueVideoById(playerId: string, options: {videoId: string, startSeconds?: number, endSeconds?: number, suggestedQuality?: string}) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> cueVideoById with options ${options}`);
    this.players[playerId].cueVideoById(options);
    return Promise.resolve({result: { method: 'cueVideoById', value: true, options: options }});
  }

  /*********/

  // Methods changing the player volume.

  /*********/

  // Mutes the player.
  async mute(playerId: string) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> mute`);
    this.players[playerId].mute();
    return Promise.resolve({result: { method: 'mute', value: true }});
  }

  // Unmutes the player.
  async unMute(playerId: string) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> unMute`);
    this.players[playerId].unMute();
    return Promise.resolve({result: { method: 'unMute', value: true }});
  }

  // Returns true if the player is muted, false if not.
  async isMuted(playerId: string) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> isMuted`);
    return Promise.resolve({result: { method: 'isMuted', value: this.players[playerId].isMuted() }});
  }

  // Sets the volume. Accepts an integer between 0 and 100.
  async setVolume(playerId: string, volume: Number) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> setVolume ${volume}`);
    this.players[playerId].setVolume(volume);
    return Promise.resolve({result: { method: 'setVolume', value: volume }});
  }

  // Returns the player's current volume, an integer between 0 and 100. Note that getVolume() will return the volume even if the player is muted.
  async getVolume(playerId: string) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> getVolume`);
    return Promise.resolve({result: { method: 'getVolume', value: this.players[playerId].getVolume() }});
  }

  /*********/

  // Methods setting the player size.

  /*********/

  // Sets the size in pixels of the <iframe> that contains the player.
  async setSize(playerId: string, width:Number, height:Number) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> setSize width: ${width} height: ${height}`);
    this.players[playerId].setSize(width, height);
    return Promise.resolve({result: { method: 'setSize', value: {width: width, height: height} }});
  }

  /*********/

  // Methods playback status.

  /*********/

  // Returns a number between 0 and 1 that specifies the percentage of the video that the player shows as buffered.
  // This method returns a more reliable number than the now-deprecated getVideoBytesLoaded and getVideoBytesTotal methods.
  async getVideoLoadedFraction(playerId: string) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> getVideoLoadedFraction`);
    return Promise.resolve({result: { method: 'getVideoLoadedFraction', value: this.players[playerId].getVideoLoadedFraction() }});
  }

  // Returns the state of the player. Possible values are:
  // -1 – unstarted
  // 0 – ended
  // 1 – playing
  // 2 – paused
  // 3 – buffering
  // 5 – video cued
  async getPlayerState(playerId: string) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> getPlayerState`);
    return Promise.resolve({result: { method: 'getPlayerState', value: this.players[playerId].getPlayerState() }});
  }

  async getAllPlayersEventsState() {
    console.log(`[Youtube Player Plugin Web]: getAllPlayersEventsState`);
    return Promise.resolve({result: { method: 'getAllPlayersEventsState', value: this.playersEventsState }});
  }

  // Returns the elapsed time in seconds since the video started playing.
  async getCurrentTime(playerId: string) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> getCurrentTime`);
    return Promise.resolve({result: { method: 'getCurrentTime', value: this.players[playerId].getCurrentTime() }});
  }

  async toggleFullScreen(playerId: string, isFullScreen: boolean | null | undefined) {
    console.log(`[Youtube Player Plugin Web]: player "${playerId}" -> toggleFullScreen`);
    let { height, width } = this.defaultSizes;

    if (!isFullScreen) {
      height = window.innerHeight;
      width = window.innerWidth;
    }

    this.players[playerId].setSize(width, height);
    return Promise.resolve({result: { method: 'toggleFullScreen', value: isFullScreen }});
  }

  async echo(options: { value: string }) {
    console.log('ECHO', options);
    return Promise.resolve(options);
  }

}

const YoutubePlayerWeb = new YoutubePlayerPluginWeb();

export { YoutubePlayerWeb };
