var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
import 'youtube';
export class YoutubePlayerPluginWeb extends WebPlugin {
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
    echo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ECHO', options);
            return Promise.resolve(options);
        });
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
        this.player = new YT.Player('player', {
            height: 360,
            width: 640,
            videoId: 'M7lc1UVf-VE',
            events: {
                'onReady': this.onPlayerReady,
            }
        });
    }
    onPlayerReady() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: onPlayerReady');
            return Promise.resolve({ playerReady: true });
        });
    }
}
const YoutubePlayerWeb = new YoutubePlayerPluginWeb();
export { YoutubePlayerWeb };
//# sourceMappingURL=web.js.map