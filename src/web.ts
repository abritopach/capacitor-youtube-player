import { WebPlugin } from '@capacitor/core';

export class YoutubePlayerPluginWeb extends WebPlugin {

  player: any;

  constructor() {
    super({
      name: 'YoutubePlayerPluginWeb',
      platforms: ['web']
    });

    // This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  async echo(options: { value: string }) {
    console.log('ECHO', options);
    return Promise.resolve(options);
  }

  /*
  async initialize(options: { key: string, value: string }): Promise<{result: boolean}> {
    return Promise.resolve({result: true});
  }
  */

  // This function creates an <iframe> (and YouTube player)
  // after the API code downloads.
  onYouTubeIframeAPIReady() {
    console.log('[Youtube Player Plugin Web]: onYouTubeIframeAPIReady');
    this.player = (<any>window).YT.Player('player', {
      height: 360,
      width: 640,
      videoId: 'M7lc1UVf-VE',
      events: {
        'onReady': this.onPlayerReady,
        // 'onStateChange': onPlayerStateChange
      }
    });
  }

  async onPlayerReady() {
    console.log('[Youtube Player Plugin Web]: onPlayerReady');
    return Promise.resolve({ playerReady: true});
  }

}

const YoutubePlayerWeb = new YoutubePlayerPluginWeb();

export { YoutubePlayerWeb };
