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
        this.playersState = new Map();
        this.playerApiLoaded = false;
        this.defaultSizes = {
            height: 270,
            width: 367
        };
    }
    ;
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
            // console.log('options', options);
            const playerSize = this.checkSize(options);
            // console.log('playerSize', playerSize);
            return yield new Promise(resolve => {
                console.log(YT());
                const player = Player();
                this.players[options.playerId] = new player(options.playerId, Object.assign({}, options.playerVars, playerSize, { videoId: options.videoId, events: {
                        // The API will call this function when the video player is ready.
                        'onReady': () => {
                            console.log(`[Youtube Player Plugin Web]: player ${options.playerId} -> onPlayerReady`);
                            const state = { events: { onReady: { text: 'onReady', value: true } } };
                            this.playersState.set(options.playerId, state);
                            return resolve({ playerReady: true, player: this.players[options.playerId] });
                        },
                        'onStateChange': (event) => {
                            console.log(`[Youtube Player Plugin Web]: player ${options.playerId} -> onPlayerStateChange`);
                            Math.PI > 4 ? "Sip" : "Nop";
                            let state = this.playersState.get(options.playerId) ? this.playersState.get(options.playerId) : null;
                            switch (event.data) {
                                case PlayerState().PLAYING:
                                    console.log(`[Youtube Player Plugin Web]: player ${options.playerId} -> playing`);
                                    state.events.onStateChange = { text: 'playing', value: PlayerState().PLAYING };
                                    break;
                                case PlayerState().PAUSED:
                                    console.log(`[Youtube Player Plugin Web]: player ${options.playerId} -> paused`);
                                    state.events.onStateChange = { text: 'paused', value: PlayerState().PAUSED };
                                    break;
                                case PlayerState().ENDED:
                                    console.log(`[Youtube Player Plugin Web]: player ${options.playerId} -> ended`);
                                    state.events.onStateChange = { text: 'ended', value: PlayerState().ENDED };
                                    break;
                                case PlayerState().BUFFERING:
                                    console.log(`[Youtube Player Plugin Web]: player ${options.playerId} -> buffering`);
                                    state.events.onStateChange = { text: 'buffering', value: PlayerState().BUFFERING };
                                    break;
                                case PlayerState().CUED:
                                    console.log(`[Youtube Player Plugin Web]: player ${options.playerId} -> cued`);
                                    state.events.onStateChange = { text: 'cued', value: PlayerState().CUED };
                                    break;
                            }
                            this.playersState.set(options.playerId, state);
                        },
                        'onPlaybackQualityChange': (event) => {
                            console.log(`[Youtube Player Plugin Web]: player ${options.playerId} -> onPlayerPlaybackQualityChange quality ${event.data}`);
                            let state = this.playersState.get(options.playerId) ? this.playersState.get(options.playerId) : null;
                            state.events.onPlaybackQualityChange = { text: 'onPlaybackQualityChange', value: event.data };
                        },
                        'onError': (error) => {
                            console.log(`[Youtube Player Plugin Web]: player ${options.playerId} -> onPlayerError ${error}`);
                            let state = this.playersState.get(options.playerId) ? this.playersState.get(options.playerId) : null;
                            state.events.onError = { text: 'onError', value: error };
                        }
                    } }));
                // console.log('players', this.players);
                // console.log('player', this.players[options.playerId]);
                console.log('playersState', this.playersState);
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
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> destroy`);
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
            console.log(`[Youtube Player Plugin Web]: player ${playerId} ->  stopVideo`);
            this.players[playerId].stopVideo();
            return Promise.resolve({ result: { method: 'stopVideo', value: true } });
        });
    }
    // Plays the currently cued/loaded video. The final player state after this function executes will be playing (1).
    playVideo(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> playVideo`);
            this.players[playerId].playVideo();
            return Promise.resolve({ result: { method: 'playVideo', value: true } });
        });
    }
    // Pauses the currently playing video. The final player state after this function executes will be paused (2) unless the player is in the ended (0) 
    // state when the function is called, in which case the player state will not change.
    pauseVideo(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> pauseVideo`);
            this.players[playerId].pauseVideo();
            return Promise.resolve({ result: { method: 'pauseVideo', value: true } });
        });
    }
    // Seeks to a specified time in the video. If the player is paused when the function is called, it will remain paused. If the function is called from
    // another state (playing, video cued, etc.), the player will play the video.
    seekTo(playerId, seconds, allowSeekAhead) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> seekTo ${seconds} seconds`);
            this.players[playerId].seekTo(seconds, allowSeekAhead);
            return Promise.resolve({ result: { method: 'seekTo', value: true, seconds: seconds, allowSeekAhead: allowSeekAhead } });
        });
    }
    // Loads and plays the specified video.
    loadVideoById(playerId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> loadVideoById with options ${options}`);
            this.players[playerId].loadVideoById(options);
            return Promise.resolve({ result: { method: 'loadVideoById', value: true, options: options } });
        });
    }
    // Loads the specified video's thumbnail and prepares the player to play the video. The player does not request the FLV until playVideo() or seekTo() is called.
    cueVideoById(playerId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> cueVideoById with options ${options}`);
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
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> mute`);
            this.players[playerId].mute();
            return Promise.resolve({ result: { method: 'mute', value: true } });
        });
    }
    // Unmutes the player.
    unMute(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> unMute`);
            this.players[playerId].unMute();
            return Promise.resolve({ result: { method: 'unMute', value: true } });
        });
    }
    // Returns true if the player is muted, false if not.
    isMuted(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> isMuted`);
            return Promise.resolve({ result: { method: 'isMuted', value: this.players[playerId].isMuted() } });
        });
    }
    // Sets the volume. Accepts an integer between 0 and 100.
    setVolume(playerId, volume) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> setVolume ${volume}`);
            this.players[playerId].setVolume(volume);
            return Promise.resolve({ result: { method: 'setVolume', value: volume } });
        });
    }
    // Returns the player's current volume, an integer between 0 and 100. Note that getVolume() will return the volume even if the player is muted.
    getVolume(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> getVolume`);
            return Promise.resolve({ result: { method: 'getVolume', value: this.players[playerId].getVolume() } });
        });
    }
    /*********/
    // Methods setting the player size.
    /*********/
    // Sets the size in pixels of the <iframe> that contains the player.
    setSize(playerId, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> setSize width: ${width} height: ${height}`);
            this.players[playerId].setSize(width, height);
            return Promise.resolve({ result: { method: 'setSize', value: { width: width, height: height } } });
        });
    }
    /*********/
    // Methods playback status.
    /*********/
    // Returns a number between 0 and 1 that specifies the percentage of the video that the player shows as buffered.
    // This method returns a more reliable number than the now-deprecated getVideoBytesLoaded and getVideoBytesTotal methods.
    getVideoLoadedFraction(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> getVideoLoadedFraction`);
            return Promise.resolve({ result: { method: 'getVideoLoadedFraction', value: this.players[playerId].getVideoLoadedFraction() } });
        });
    }
    // Returns the state of the player. Possible values are:
    // -1 – unstarted
    // 0 – ended
    // 1 – playing
    // 2 – paused
    // 3 – buffering
    // 5 – video cued
    getPlayerState(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> getPlayerState`);
            return Promise.resolve({ result: { method: 'getPlayerState', value: this.players[playerId].getPlayerState() } });
        });
    }
    getAllPlayersState() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: getAllPlayersState`);
            return Promise.resolve({ result: { method: 'getAllPlayersState', value: this.playersState } });
        });
    }
    // Returns the elapsed time in seconds since the video started playing.
    getCurrentTime(playerId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> getCurrentTime`);
            return Promise.resolve({ result: { method: 'getCurrentTime', value: this.players[playerId].getCurrentTime() } });
        });
    }
    toggleFullScreen(playerId, isFullScreen) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Youtube Player Plugin Web]: player ${playerId} -> toggleFullScreen`);
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