var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
export class YoutubePlayerPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'YoutubePlayerPluginWeb',
            platforms: ['web']
        });
        this.defaultSizes = {
            height: 270,
            width: 367
        };
        this.ytApiLoaded = false;
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
    createPlayer(options) {
        const playerSize = {
            height: options.height || this.defaultSizes.height,
            width: options.width || this.defaultSizes.width
        };
        // This function creates an <iframe> (and YouTube player)
        // after the API code downloads.
        window.onYouTubeIframeAPIReady = () => {
            console.log(window.YT);
            this.player = new window.YT.Player(options.playerId, Object.assign({}, playerSize, { videoId: options.videoId, events: {
                    'onReady': () => {
                        console.log('[Youtube Player Plugin Web]: onPlayerReady');
                        return Promise.resolve({ playerReady: true });
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
                } }));
        };
    }
    initialize(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: initialize');
            this.loadPlayerApi();
            this.createPlayer(options);
        });
    }
    stopVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.player.stopVideo();
            return Promise.resolve({ stopVideo: true });
        });
    }
    playVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.player.playVideo();
        });
    }
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            this.player.pauseVideo();
        });
    }
    echo(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ECHO', options);
            return Promise.resolve(options);
        });
    }
}
const YoutubePlayerWeb = new YoutubePlayerPluginWeb();
export { YoutubePlayerWeb };
//# sourceMappingURL=web.js.map