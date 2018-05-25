import { WebPlugin } from '@capacitor/core';

export function YT() {
  return (<any>window)['YT'];
}

export function Player() {
  return YT().Player;
}

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
    console.log('[Youtube Player Plugin Web]: loadPlayerApi');
    if (!this.ytApiLoaded) {
      this.ytApiLoaded = true;
       // This code loads the IFrame Player API code asynchronously.
      const tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  checkSize(options: {playerId: string, width: number, height: number, videoId: string}) {
    const playerSize = {
      height: options.height || this.defaultSizes.height,
      width: options.width || this.defaultSizes.width
    };
    if (playerSize.height > window.innerHeight) playerSize.height = window.innerHeight;
    if (playerSize.width > window.innerWidth) playerSize.width = window.innerWidth;

    return playerSize;
  }

  createPlayer(options: {playerId: string, width: number, height: number, videoId: string}) {
    console.log('[Youtube Player Plugin Web]: createPlayer');
    const playerSize = this.checkSize(options);
    console.log('playerSize', playerSize);

    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    (<any>window).onYouTubeIframeAPIReady = () => {
      console.log((<any>window).YT);
      this.player = new (<any>window).YT.Player(options.playerId, {
        playerVars: {
        },
        ...playerSize,
        videoId: options.videoId,
        events: {
          // The API will call this function when the video player is ready.
          'onReady': () => {
            console.log('[Youtube Player Plugin Web]: onPlayerReady');
            return Promise.resolve({ playerReady: true});
          },
          'onStateChange': (event: any) => {
            console.log('[Youtube Player Plugin Web]: onPlayerStateChange', event.data);
            switch (event.data) {
              case (<any>window).YT.PlayerState.PLAYING:
                  console.log('[Youtube Player Plugin Web]: Playing');
                  break;
              case (<any>window).YT.PlayerState.PAUSED:
                  console.log('[Youtube Player Plugin Web]: Paused');
                  break;
              case (<any>window).YT.PlayerState.ENDED:
                  console.log('[Youtube Player Plugin Web]: Ended');
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
    };
  }

  async initialize(options: {playerId: string, width: number, height: number, videoId: string}) {
    console.log('[Youtube Player Plugin Web]: initialize');
    this.loadPlayerApi();
    if (Player) this.createPlayer(options);
  }

  async stopVideo() {
    console.log('[Youtube Player Plugin Web]: stopVideo');
    this.player.stopVideo();
    return Promise.resolve({stopVideo: true});
  }

  async playVideo() {
    console.log('[Youtube Player Plugin Web]: playVideo');
    this.player.playVideo();
    return Promise.resolve({playVideo: true});
  }

  async pauseVideo() {
    console.log('[Youtube Player Plugin Web]: pauseVideo');
    this.player.pauseVideo();
    return Promise.resolve({pauseVideo: true});
  }

  async echo(options: { value: string }) {
    console.log('ECHO', options);
    return Promise.resolve(options);
  }

}

const YoutubePlayerWeb = new YoutubePlayerPluginWeb();

export { YoutubePlayerWeb };
