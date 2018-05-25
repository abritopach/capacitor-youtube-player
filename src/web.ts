import { WebPlugin } from '@capacitor/core';

export class YoutubePlayerPluginWeb extends WebPlugin {

  player: any;
  private readonly defaultSizes = {
    height: 270,
    width: 367
  };
  private ytApiLoaded: boolean = false;

  constructor() {
    super({
      name: 'YoutubePlayerPluginWeb',
      platforms: ['web']
    });
  }

  loadPlayerApi() {
    if (!this.ytApiLoaded) {
      this.ytApiLoaded = true;
       // This code loads the IFrame Player API code asynchronously.
      const tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  createPlayer(options: {playerId: string, width: number, height: number, videoId: string}) {
    const playerSize = {
      height: options.height || this.defaultSizes.height,
      width: options.width || this.defaultSizes.width
    };

    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    (<any>window).onYouTubeIframeAPIReady = () => {
      console.log((<any>window).YT);
      this.player = new (<any>window).YT.Player(options.playerId, {
        ...playerSize,
        videoId: options.videoId,
        events: {
          'onReady': () => {
            console.log('[Youtube Player Plugin Web]: onPlayerReady');
            return Promise.resolve({ playerReady: true});
          },
          'onStateChange': () => {
            console.log('[Youtube Player Plugin Web]: onPlayerStateChange');
          },
          'onPlaybackQualityChange': () => {
            console.log('[Youtube Player Plugin Web]: onPlayerPlaybackQualityChange');
          },
          'onError': () => {
            console.log('[Youtube Player Plugin Web]: onPlayerError');
          }
        }
      });
    };
  }

  async initialize(options: {playerId: string, width: number, height: number, videoId: string}) {
    console.log('[Youtube Player Plugin Web]: initialize');
    this.loadPlayerApi();
    this.createPlayer(options);
    
  }

  async stopVideo() {
    this.player.stopVideo();
    return Promise.resolve({stopVideo: true});
  }

  async playVideo() {
    this.player.playVideo();
  }

  async pause() {
    this.player.pauseVideo();
  }

  async echo(options: { value: string }) {
    console.log('ECHO', options);
    return Promise.resolve(options);
  }

}

const YoutubePlayerWeb = new YoutubePlayerPluginWeb();

export { YoutubePlayerWeb };
