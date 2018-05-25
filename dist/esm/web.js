var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
export function YT() {
    return window['YT'];
}
export function Player() {
    return YT().Player;
}
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
    checkSize(options) {
        const playerSize = {
            height: options.height || this.defaultSizes.height,
            width: options.width || this.defaultSizes.width
        };
        if (playerSize.height > window.innerHeight)
            playerSize.height = window.innerHeight;
        if (playerSize.width > window.innerWidth)
            playerSize.width = window.innerWidth;
        return playerSize;
    }
    createPlayer(options) {
        console.log('[Youtube Player Plugin Web]: createPlayer');
        const playerSize = this.checkSize(options);
        console.log('playerSize', playerSize);
        // This function creates an <iframe> (and YouTube player)
        // after the API code downloads.
        window.onYouTubeIframeAPIReady = () => {
            console.log(window.YT);
            this.player = new window.YT.Player(options.playerId, Object.assign({ playerVars: {} }, playerSize, { videoId: options.videoId, events: {
                    // The API will call this function when the video player is ready.
                    'onReady': () => {
                        console.log('[Youtube Player Plugin Web]: onPlayerReady');
                        return Promise.resolve({ playerReady: true });
                    },
                    'onStateChange': (event) => {
                        console.log('[Youtube Player Plugin Web]: onPlayerStateChange', event.data);
                        switch (event.data) {
                            case window.YT.PlayerState.PLAYING:
                                console.log('[Youtube Player Plugin Web]: Playing');
                                break;
                            case window.YT.PlayerState.PAUSED:
                                console.log('[Youtube Player Plugin Web]: Paused');
                                break;
                            case window.YT.PlayerState.ENDED:
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
                } }));
        };
    }
    initialize(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: initialize');
            this.loadPlayerApi();
            if (Player)
                this.createPlayer(options);
        });
    }
    stopVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: stopVideo');
            this.player.stopVideo();
            return Promise.resolve({ stopVideo: true });
        });
    }
    playVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: playVideo');
            this.player.playVideo();
            return Promise.resolve({ playVideo: true });
        });
    }
    pauseVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: pauseVideo');
            this.player.pauseVideo();
            return Promise.resolve({ pauseVideo: true });
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