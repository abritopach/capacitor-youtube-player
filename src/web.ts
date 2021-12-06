import { WebPlugin } from '@capacitor/core';

import type { YoutubePlayerPlugin } from './definitions';
import { Log } from './log';
import type { IPlayerSize, IPlayerState, IPlayerOptions, RequiredKeys, IPlaylistOptions, IPlaybackQuality,
  IVideoOptionsById, IVideoOptionsByUrl, Events, PlayerEvent } from './web/models/models';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function YT() {
  return (window as any)['YT'];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Player() {
  return YT().Player;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function PlayerState() {
  return YT().PlayerState;
}

export class YoutubePlayerPluginWeb extends WebPlugin implements YoutubePlayerPlugin{

  players: any = [];
  playersEventsState = new Map<string, IPlayerState>();
  player: any;
  playerApiLoaded = false;
  private readonly defaultSizes: IPlayerSize = {
    height: 270,
    width: 367
  };
  playerLogger: any;

  constructor() {
    super({
      name: 'YoutubePlayerPluginWeb',
      platforms: ['web']
    });
  }

  async loadPlayerApi(): Promise<boolean> {
    this.playerLogger.log("loadPlayerApi");
    return await new Promise(resolve => {

      (window as any).onYouTubeIframeAPIReady = () => {
        this.playerLogger.log("onYouTubeIframeAPIReady");
        this.playerApiLoaded = true;
        resolve(true);
      }

      // This code loads the IFrame Player API code asynchronously.
      const tag = document.createElement('script');
      tag.type = 'text/javascript';
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
    });
  }

  checkSize(options: IPlayerOptions): IPlayerSize {
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
  async createPlayer(options: RequiredKeys<IPlayerOptions, 'playerId'>): Promise<{playerReady: boolean, player: string}> {
    this.playerLogger.log("createPlayer");
    const playerSize = this.checkSize(options);

    return await new Promise(resolve => {

      const player = Player();

      this.players[options.playerId] = new player(options.playerId, {
        playerVars: options.playerVars,
        ...playerSize,
        fullscreen: options.fullscreen,
        videoId: options.videoId,
        events: {
          // The API will call this function when the video player is ready.
          'onReady': (event: any) => {
            this.playerLogger.log(`player "${options.playerId}" -> onPlayerReady`);
            const state: IPlayerState = {events: {onReady: {text: 'onReady', value: true}}};
            this.playersEventsState.set(options.playerId, state);
            if (options?.playerVars?.autoplay === 1) {
              event.target.mute();
              event.target.playVideo();
            }
            return resolve({ playerReady: true, player: this.players[options.playerId]});
          },
          'onStateChange': (event: any) => {
            this.playerLogger.log(`player "${options.playerId}" -> onPlayerStateChange`);
            switch (event.data) {
              case PlayerState().PLAYING:
                  this.playerLogger.log(`player "${options.playerId}" -> playing`);
                  this.playersEventsState.get(options.playerId)!.events.onStateChange = {text: 'playing', value: PlayerState().PLAYING};
                  if (options.fullscreen) {
                    const iframe = document.getElementById(options.playerId);
                    const requestFullScreen = iframe?.requestFullscreen
                    if (requestFullScreen) {
                      requestFullScreen.bind(iframe)();
                    }
                  }
                  break;
              case PlayerState().PAUSED:
                  this.playerLogger.log(`player "${options.playerId}" -> paused`);
                  this.playersEventsState.get(options.playerId)!.events.onStateChange = {text: 'paused', value: PlayerState().PAUSED};
                  break;
              case PlayerState().ENDED:
                  this.playerLogger.log(`player "${options.playerId}" -> ended`);
                  this.playersEventsState.get(options.playerId)!.events.onStateChange = {text: 'ended', value: PlayerState().ENDED};
                  break;
              case PlayerState().BUFFERING:
                this.playerLogger.log(`player "${options.playerId}" -> buffering`);
                this.playersEventsState.get(options.playerId)!.events.onStateChange = {text: 'buffering', value: PlayerState().BUFFERING};
                break;
              case PlayerState().CUED:
                this.playerLogger.log(`player "${options.playerId}" -> cued`);
                this.playersEventsState.get(options.playerId)!.events.onStateChange = {text: 'cued', value: PlayerState().CUED};
                break;
            }
          },
          'onPlaybackQualityChange': (event: any) => {
            this.playerLogger.log(`player "${options.playerId}" -> onPlayerPlaybackQualityChange quality ${event.data}`);
            this.playersEventsState.get(options.playerId)!.events.onPlaybackQualityChange = {text: 'onPlaybackQualityChange', value: event.data};
          },
          'onError': (error: any) => {
            this.playerLogger.error(`player "${options.playerId}" -> onPlayerError`, {error: error});
            this.playersEventsState.get(options.playerId)!.events.onError = {text: 'onError', value: error};
          }
        }
      });
    });
  }

  async initialize(options: RequiredKeys<IPlayerOptions, 'playerId'>): Promise<{playerReady: boolean, player: string} | undefined> {
    this.playerLogger = new Log(options.debug);
    this.playerLogger.log("initialize");
    if (!this.playerApiLoaded) {
      const result = await this.loadPlayerApi();
      this.playerLogger.log("loadPlayerApi result", {result: result});
    }
    if (this.playerApiLoaded) {
      const playerReady: {playerReady: boolean, player: string} = await this.createPlayer(options) as {playerReady: boolean, player: string};
      this.playerLogger.log("loadPlayerApi initialize completed", {playerReady: playerReady});
      return Promise.resolve(playerReady);
    }
  }

  async destroy(playerId: string): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> destroy`);
    this.players[playerId].destroy();
    return Promise.resolve({result: { method: 'destroy', value: true }});
  }


  // Methods playback controls and player settings.

  /*********/

  // Stops and cancels loading of the current video. This function should be reserved for rare situations when you know that the user will not be watching
  // additional video in the player. If your intent is to pause the video, you should just call the pauseVideo function. If you want to change the video
  // that the player is playing, you can call one of the queueing functions without calling stopVideo first.
  async stopVideo(playerId: string): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" ->  stopVideo`);
    this.players[playerId].stopVideo();
    return Promise.resolve({result: { method: 'stopVideo', value: true }});
  }

  // Plays the currently cued/loaded video. The final player state after this function executes will be playing (1).
  async playVideo(playerId: string): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> playVideo`);
    this.players[playerId].playVideo();
    return Promise.resolve({result: { method: 'playVideo', value: true }});
  }

  // Pauses the currently playing video. The final player state after this function executes will be paused (2) unless the player is in the ended (0) 
  // state when the function is called, in which case the player state will not change.
  async pauseVideo(playerId: string): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> pauseVideo`);
    this.players[playerId].pauseVideo();
    return Promise.resolve({result: { method: 'pauseVideo', value: true }});
  }

  // Seeks to a specified time in the video. If the player is paused when the function is called, it will remain paused. If the function is called from
  // another state (playing, video cued, etc.), the player will play the video.
  async seekTo(playerId: string, seconds: number, allowSeekAhead: boolean)
  : Promise<{result: { method: string, value: boolean, seconds: number, allowSeekAhead: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> seekTo ${seconds} seconds`);
    this.players[playerId].seekTo(seconds, allowSeekAhead);
    return Promise.resolve({result: { method: 'seekTo', value: true, seconds: seconds, allowSeekAhead: allowSeekAhead }});
  }

  // Loads and plays the specified video.
  async loadVideoById(playerId: string, options: IVideoOptionsById)
  : Promise<{result: { method: string, value: boolean, options: IVideoOptionsById}}> {
    this.playerLogger.log(`player "${playerId}" -> loadVideoById with options ${options}`);
    this.players[playerId].loadVideoById(options);
    return Promise.resolve({result: { method: 'loadVideoById', value: true, options: options }});
  }

  // Loads the specified video's thumbnail and prepares the player to play the video. The player does not request the FLV until playVideo() or seekTo() is called.
  async cueVideoById(playerId: string, options: IVideoOptionsById)
  : Promise<{result: { method: string, value: boolean, options: IVideoOptionsById}}> {
    this.playerLogger.log(`player "${playerId}" -> cueVideoById with options ${options}`);
    this.players[playerId].cueVideoById(options);
    return Promise.resolve({result: { method: 'cueVideoById', value: true, options: options }});
  }

  async loadVideoByUrl(playerId: string, options: IVideoOptionsByUrl)
  : Promise<{result: { method: string, value: boolean, options: IVideoOptionsByUrl}}> {
    this.playerLogger.log(`player "${playerId}" -> loadVideoByUrl with options ${options}`);
    this.players[playerId].loadVideoByUrl(options);
    return Promise.resolve({result: { method: 'loadVideoByUrl', value: true, options: options }});
  }

  async cueVideoByUrl(playerId: string, options: IVideoOptionsByUrl)
  : Promise<{result: { method: string, value: boolean, options: IVideoOptionsByUrl}}> {
    this.playerLogger.log(`player "${playerId}" -> cueVideoByUrl with options ${options}`);
    this.players[playerId].cueVideoByUrl(options);
    return Promise.resolve({result: { method: 'cueVideoByUrl', value: true, options: options }});
  }


  /*********/

  // Methods for playing playlist.

  /*********/

  async cuePlaylist(playerId: string, playlistOptions: IPlaylistOptions)
  : Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> cuePlaylist with options ${JSON.stringify(playlistOptions)}`);
    this.players[playerId].cuePlaylist(playlistOptions);
    return Promise.resolve({result: { method: 'cuePlaylist', value: true }});
  }

  async loadPlaylist(playerId: string, playlistOptions: IPlaylistOptions)
  : Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> loadPlaylist with options ${playlistOptions}`);
    this.players[playerId].loadPlaylist(playlistOptions);
    return Promise.resolve({result: { method: 'loadPlaylist', value: true }});
  }

  /*********/

  // Methods for playing video in playlist.

  /*********/

  async nextVideo(playerId: string): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> nextVideo`);
    this.players[playerId].nextVideo();
    return Promise.resolve({result: { method: 'nextVideo', value: true }});
  }

  async previousVideo(playerId: string): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> previousVideo`);
    this.players[playerId].previousVideo();
    return Promise.resolve({result: { method: 'previousVideo', value: true }});
  }

  async playVideoAt(playerId: string, index: number): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> playVideoAt`);
    this.players[playerId].playVideoAt(index);
    return Promise.resolve({result: { method: 'playVideoAt', value: true }});
  }

  /*********/

  // Methods for adjusting the playback speed.

  async getPlaybackRate(playerId: string): Promise<{result: { method: string, value: number }}> {
    this.playerLogger.log(`player "${playerId}" -> getPlaybackRate`);
    return Promise.resolve({result: { method: 'getPlaybackRate', value: this.players[playerId].getPlaybackRate() }});
  }

  async setPlaybackRate(playerId: string, rate: number): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> setPlaybackRate`);
    this.players[playerId].setPlaybackRate(rate);
    return Promise.resolve({result: { method: 'setPlaybackRate', value: true }});
  }

  async getAvailablePlaybackRates(playerId: string): Promise<{result: { method: string, value: number[] }}> {
    this.playerLogger.log(`player -> getAvailablePlaybackRates`);
    return Promise.resolve({result: { method: 'getAvailablePlaybackRates', value: this.players[playerId].getAvailablePlaybackRates() }});
  }

  /*********/

  /*********/

  // Methods for playlist playback settings

  /*********/

  async setLoop(playerId: string, loop: boolean): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> setLoop`);
    this.players[playerId].setLoop(loop);
    return Promise.resolve({result: { method: 'setLoop', value: true }});
  }

  async setShuffle(playerId: string, shuffle: boolean): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> setShuffle`);
    this.players[playerId].setShuffle(shuffle);
    return Promise.resolve({result: { method: 'setShuffle', value: true }});
  }

  /*********/

  // Methods changing the player volume.

  /*********/

  // Mutes the player.
  async mute(playerId: string): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> mute`);
    this.players[playerId].mute();
    return Promise.resolve({result: { method: 'mute', value: true }});
  }

  // Unmutes the player.
  async unMute(playerId: string): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> unMute`);
    this.players[playerId].unMute();
    return Promise.resolve({result: { method: 'unMute', value: true }});
  }

  // Returns true if the player is muted, false if not.
  async isMuted(playerId: string): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> isMuted`);
    return Promise.resolve({result: { method: 'isMuted', value: this.players[playerId].isMuted() }});
  }

  // Sets the volume. Accepts an integer between 0 and 100.
  async setVolume(playerId: string, volume: number): Promise<{result: { method: string, value: number }}> {
    this.playerLogger.log(`player "${playerId}" -> setVolume ${volume}`);
    this.players[playerId].setVolume(volume);
    return Promise.resolve({result: { method: 'setVolume', value: volume }});
  }

  // Returns the player's current volume, an integer between 0 and 100. Note that getVolume() will return the volume even if the player is muted.
  async getVolume(playerId: string): Promise<{result: { method: string, value: number }}> {
    this.playerLogger.log(`player "${playerId}" -> getVolume`);
    return Promise.resolve({result: { method: 'getVolume', value: this.players[playerId].getVolume() }});
  }

  /*********/

  // Methods setting the player size.

  /*********/

  // Sets the size in pixels of the <iframe> that contains the player.
  async setSize(playerId: string, width: number, height: number): Promise<{result: { method: string, value: IPlayerSize }}> {
    this.playerLogger.log(`player "${playerId}" -> setSize width: ${width} height: ${height}`);
    this.players[playerId].setSize(width, height);
    return Promise.resolve({result: { method: 'setSize', value: {width: width, height: height} }});
  }

  /*********/

  // Methods playback status.

  /*********/

  // Returns a number between 0 and 1 that specifies the percentage of the video that the player shows as buffered.
  // This method returns a more reliable number than the now-deprecated getVideoBytesLoaded and getVideoBytesTotal methods.
  async getVideoLoadedFraction(playerId: string): Promise<{result: { method: string, value: number }}> {
    this.playerLogger.log(`player "${playerId}" -> getVideoLoadedFraction`);
    return Promise.resolve({result: { method: 'getVideoLoadedFraction', value: this.players[playerId].getVideoLoadedFraction() }});
  }

  // Returns the state of the player. Possible values are:
  // -1 – unstarted
  // 0 – ended
  // 1 – playing
  // 2 – paused
  // 3 – buffering
  // 5 – video cued
  async getPlayerState(playerId: string): Promise<{result: { method: string, value: number }}> {
    this.playerLogger.log(`player "${playerId}" -> getPlayerState`);
    return Promise.resolve({result: { method: 'getPlayerState', value: this.players[playerId].getPlayerState() }});
  }

  async getAllPlayersEventsState(): Promise<{result: { method: string, value: Map<string, IPlayerState> }}> {
    this.playerLogger.log("getAllPlayersEventsState");
    return Promise.resolve({result: { method: 'getAllPlayersEventsState', value: this.playersEventsState }});
  }

  // Returns the elapsed time in seconds since the video started playing.
  async getCurrentTime(playerId: string): Promise<{result: { method: string, value: number }}> {
    this.playerLogger.log(`player "${playerId}" -> getCurrentTime`);
    return Promise.resolve({result: { method: 'getCurrentTime', value: this.players[playerId].getCurrentTime() }});
  }

  async toggleFullScreen(playerId: string, isFullScreen: boolean | null | undefined): Promise<{result: { method: string, value: boolean | null | undefined }}> {
    this.playerLogger.log(`player "${playerId}" -> toggleFullScreen`);
    let { height, width } = this.defaultSizes;

    if (!isFullScreen) {
      height = window.innerHeight;
      width = window.innerWidth;
    }

    this.players[playerId].setSize(width, height);
    return Promise.resolve({result: { method: 'toggleFullScreen', value: isFullScreen }});
  }

  /*********/

  // Methods playback quality.

  /*********/

  async getPlaybackQuality(playerId: string): Promise<{result: { method: string, value: IPlaybackQuality }}> {
    this.playerLogger.log(`player "${playerId}" -> getPlaybackQuality`);
    return Promise.resolve({result: { method: 'getPlaybackQuality', value: this.players[playerId].getPlaybackQuality() }});
  }

  async setPlaybackQuality(playerId: string, playbackQuality: IPlaybackQuality): Promise<{result: { method: string, value: boolean }}> {
    this.playerLogger.log(`player "${playerId}" -> setPlaybackQuality`);
    this.players[playerId].setPlaybackQuality(playbackQuality);
    return Promise.resolve({result: { method: 'setPlaybackQuality', value: true }});
  }

  async getAvailableQualityLevels(playerId: string): Promise<{result: { method: string, value: IPlaybackQuality[] }}> {
    this.playerLogger.log(`player "${playerId}" -> getAvailableQualityLevels`);
    return Promise.resolve({result: { method: 'getAvailableQualityLevels', value: this.players[playerId].getAvailableQualityLevels() }});
  }

  /*********/

  // Methods for retrieving video information.

  /*********/

  async getDuration(playerId: string): Promise<{result: { method: string, value: number }}> {
    this.playerLogger.log(`player "${playerId}" -> getDuration`);
    return Promise.resolve({result: { method: 'getDuration', value: this.players[playerId].getDuration() }});
  }

  async getVideoUrl(playerId: string): Promise<{result: { method: string, value: string }}> {
    this.playerLogger.log(`player "${playerId}" -> getVideoUrl`);
    return Promise.resolve({result: { method: 'getVideoUrl', value: this.players[playerId].getVideoUrl() }});
  }

  async getVideoEmbedCode(playerId: string): Promise<{result: { method: string, value: string }}> {
    this.playerLogger.log(`player "${playerId}" -> getVideoEmbedCode`);
    return Promise.resolve({result: { method: 'getVideoEmbedCode', value: this.players[playerId].getVideoEmbedCode() }});
  }

  /*********/

  // Methods for retrieving playlist information.

  /*********/

  async getPlaylist(playerId: string): Promise<{result: { method: string, value: string[] }}> {
    this.playerLogger.log(`player "${playerId}" -> getPlaylist`);
    return Promise.resolve({result: { method: 'getPlaylist', value: this.players[playerId].getPlaylist() }});
  }

  async getPlaylistIndex(playerId: string): Promise<{result: { method: string, value: number }}> {
    this.playerLogger.log(`player "${playerId}" -> getPlaylistIndex`);
    return Promise.resolve({result: { method: 'getPlaylistIndex', value: this.players[playerId].getPlaylistIndex() }});
  }

  /*********/

  // Methods accessing and modifying DOM nodes.

  /*********/

  async getIframe(playerId: string): Promise<{result: { method: string, value: HTMLIFrameElement }}> {
    this.playerLogger.log(`player "${playerId}" -> getIframe`);
    return Promise.resolve({result: { method: 'getIframe', value: this.players[playerId].getIframe() }});
  }

    /*********/

    // Player event listeners.

    addEventListener<TEvent extends PlayerEvent>(playerId: string, eventName: keyof Events, listener: (event: TEvent) => void): void {
      this.playerLogger.log(`player "${playerId}" -> addEventListener "${eventName}"`);
      this.players[playerId].addEventListener(eventName, listener)
    }

    removeEventListener<TEvent extends PlayerEvent>(playerId: string, eventName: keyof Events, listener: (event: TEvent) => void): void {
      this.playerLogger.log(`player "${playerId}" -> removeEventListener "${eventName}"`);
      this.players[playerId].removeEventListener(eventName, listener)
    }

    /*********/

}
