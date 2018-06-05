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
        this.players = {};
        this.playerApiLoaded = false;
        this.defaultSizes = {
            height: 270,
            width: 367
        };
    }
    loadPlayerApi() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: loadPlayerApi');
            return yield new Promise(resolve => {
                window.onYouTubeIframeAPIReady = () => {
                    console.log('[Youtube Player Plugin Web]: onYouTubeIframeAPIReady');
                    this.playerApiLoaded = true;
                    resolve(true);
                };
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
        });
    }
    checkSize(options) {
        const playerSize = {
            height: options.playerSize.height || this.defaultSizes.height,
            width: options.playerSize.width || this.defaultSizes.width
        };
        if (playerSize.height > window.innerHeight)
            playerSize.height = window.innerHeight;
        if (playerSize.width > window.innerWidth)
            playerSize.width = window.innerWidth;
        return playerSize;
    }
    createPlayer(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: createPlayer');
            console.log('options', options);
            const playerSize = this.checkSize(options);
            console.log('playerSize', playerSize);
            return yield new Promise(resolve => {
                console.log('Inside promise');
                // This function creates an <iframe> (and YouTube player)
                // after the API code downloads.
                // (<any>window).onYouTubeIframeAPIReady = () => {
                console.log(window.YT);
                this.players[options.playerId] = YT().Player(options.playerId, Object.assign({}, options.playerVars, playerSize, { videoId: options.videoId, events: {
                        // The API will call this function when the video player is ready.
                        'onReady': () => {
                            console.log('[Youtube Player Plugin Web]: onPlayerReady');
                            return resolve({ playerReady: true, player: this.players[options.playerId] });
                        },
                        'onStateChange': (event) => {
                            console.log('[Youtube Player Plugin Web]: onPlayerStateChange', event.data);
                            switch (event.data) {
                                case window.YT.PlayerState.PLAYING:
                                    console.log('[Youtube Player Plugin Web]: playing');
                                    break;
                                case window.YT.PlayerState.PAUSED:
                                    console.log('[Youtube Player Plugin Web]: paused');
                                    break;
                                case window.YT.PlayerState.ENDED:
                                    console.log('[Youtube Player Plugin Web]: ended');
                                    break;
                                case window.YT.PlayerState.BUFFERING:
                                    console.log('[Youtube Player Plugin Web]: buffering');
                                    break;
                                case window.YT.PlayerState.CUED:
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
                    } }));
                console.log('player', this.players[options.playerId]);
                // };
            });
        });
    }
    initialize(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: initialize');
            if (!this.playerApiLoaded) {
                const result = yield this.loadPlayerApi();
                console.log('[Youtube Player Plugin Web]: loadPlayerApi result', result);
            }
            if (Player && this.playerApiLoaded) {
                const playerReady = yield this.createPlayer(options);
                console.log('[Youtube Player Plugin Web]: initialize completed', playerReady);
                return Promise.resolve(playerReady);
            }
        });
    }
    // Methods playing video.
    /*********/
    stopVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: stopVideo');
            this.player.stopVideo();
            return Promise.resolve({ result: { method: 'stopVideo', value: true } });
        });
    }
    playVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: playVideo');
            this.player.playVideo();
            return Promise.resolve({ result: { method: 'playVideo', value: true } });
        });
    }
    pauseVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: pauseVideo');
            this.player.pauseVideo();
            return Promise.resolve({ result: { method: 'pauseVideo', value: true } });
        });
    }
    seekTo(seconds, allowSeekAhead) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: seekTo');
            this.player.seekTo(seconds, allowSeekAhead);
            return Promise.resolve({ result: { method: 'seekTo', value: true, seconds: seconds, allowSeekAhead: allowSeekAhead } });
        });
    }
    clearVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.player.clearVideo();
            return Promise.resolve({ result: { method: 'clearVideo', value: true } });
        });
    }
    loadVideoById(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.player.loadVideoById(options);
            return Promise.resolve({ result: { method: 'loadVideoById', value: true, options: options } });
        });
    }
    cueVideoById(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.player.cueVideoById(options);
            return Promise.resolve({ result: { method: 'cueVideoById', value: true, options: options } });
        });
    }
    /*********/
    // Methods modifying the player volume.
    /*********/
    /*********/
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