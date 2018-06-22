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
export function PlayerState() {
    return YT().PlayerState;
}
export class YoutubePlayerPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'YoutubePlayerPluginWeb',
            platforms: ['web']
        });
        this.players = [];
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
                tag.type = 'text/javascript';
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
    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    createPlayer(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: createPlayer');
            console.log('options', options);
            const playerSize = this.checkSize(options);
            console.log('playerSize', playerSize);
            return yield new Promise(resolve => {
                console.log(YT());
                const player = Player();
                this.players[options.playerId] = new player(options.playerId, Object.assign({}, options.playerVars, playerSize, { videoId: options.videoId, events: {
                        // The API will call this function when the video player is ready.
                        'onReady': () => {
                            console.log('[Youtube Player Plugin Web]: onPlayerReady');
                            return resolve({ playerReady: true, player: this.players[options.playerId] });
                        },
                        'onStateChange': (event) => {
                            console.log('[Youtube Player Plugin Web]: onPlayerStateChange', event.data);
                            switch (event.data) {
                                case PlayerState().PLAYING:
                                    console.log('[Youtube Player Plugin Web]: playing');
                                    break;
                                case PlayerState().PAUSED:
                                    console.log('[Youtube Player Plugin Web]: paused');
                                    break;
                                case PlayerState().ENDED:
                                    console.log('[Youtube Player Plugin Web]: ended');
                                    break;
                                case PlayerState().BUFFERING:
                                    console.log('[Youtube Player Plugin Web]: buffering');
                                    break;
                                case PlayerState().CUED:
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
                console.log('players', this.players);
                console.log('player', this.players[options.playerId]);
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
    destroy(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: destroy');
            this.players[playerId].destroy();
            return Promise.resolve({ result: { method: 'destroy', value: true } });
        });
    }
    // Methods playback controls and player settings.
    /*********/
    // Stops and cancels loading of the current video. This function should be reserved for rare situations when you know that the user will not be watching
    // additional video in the player. If your intent is to pause the video, you should just call the pauseVideo function. If you want to change the video
    // that the player is playing, you can call one of the queueing functions without calling stopVideo first.
    stopVideo(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: stopVideo');
            this.players[playerId].stopVideo();
            return Promise.resolve({ result: { method: 'stopVideo', value: true } });
        });
    }
    // Plays the currently cued/loaded video. The final player state after this function executes will be playing (1).
    playVideo(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: playVideo');
            this.players[playerId].playVideo();
            return Promise.resolve({ result: { method: 'playVideo', value: true } });
        });
    }
    // Pauses the currently playing video. The final player state after this function executes will be paused (2) unless the player is in the ended (0) 
    // state when the function is called, in which case the player state will not change.
    pauseVideo(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: pauseVideo');
            this.players[playerId].pauseVideo();
            return Promise.resolve({ result: { method: 'pauseVideo', value: true } });
        });
    }
    // Seeks to a specified time in the video. If the player is paused when the function is called, it will remain paused. If the function is called from
    // another state (playing, video cued, etc.), the player will play the video.
    seekTo(playerId, seconds, allowSeekAhead) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[Youtube Player Plugin Web]: seekTo');
            this.players[playerId].seekTo(seconds, allowSeekAhead);
            return Promise.resolve({ result: { method: 'seekTo', value: true, seconds: seconds, allowSeekAhead: allowSeekAhead } });
        });
    }
    // Loads and plays the specified video.
    loadVideoById(playerId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.players[playerId].loadVideoById(options);
            return Promise.resolve({ result: { method: 'loadVideoById', value: true, options: options } });
        });
    }
    // Loads the specified video's thumbnail and prepares the player to play the video. The player does not request the FLV until playVideo() or seekTo() is called.
    cueVideoById(playerId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.players[playerId].cueVideoById(options);
            return Promise.resolve({ result: { method: 'cueVideoById', value: true, options: options } });
        });
    }
    /*********/
    // Methods changing the player volume.
    /*********/
    // Mutes the player.
    mute(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.players[playerId].mute();
            return Promise.resolve({ result: { method: 'mute', value: true } });
        });
    }
    // Unmutes the player.
    unMute(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.players[playerId].unMute();
            return Promise.resolve({ result: { method: 'unMute', value: true } });
        });
    }
    // Returns true if the player is muted, false if not.
    isMuted(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve({ result: { method: 'isMuted', value: this.players[playerId].isMuted() } });
        });
    }
    // Sets the volume. Accepts an integer between 0 and 100.
    setVolume(playerId, volume) {
        return __awaiter(this, void 0, void 0, function* () {
            this.players[playerId].setVolume(volume);
            return Promise.resolve({ result: { method: 'setVolume', value: volume } });
        });
    }
    // Returns the player's current volume, an integer between 0 and 100. Note that getVolume() will return the volume even if the player is muted.
    getVolume(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve({ result: { method: 'getVolume', value: this.players[playerId].getVolume() } });
        });
    }
    /*********/
    toggleFullScreen(playerId, isFullScreen) {
        return __awaiter(this, void 0, void 0, function* () {
            let { height, width } = this.defaultSizes;
            if (!isFullScreen) {
                height = window.innerHeight;
                width = window.innerWidth;
            }
            this.players[playerId].setSize(width, height);
            return Promise.resolve({ result: { method: 'toggleFullScreen', value: isFullScreen } });
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