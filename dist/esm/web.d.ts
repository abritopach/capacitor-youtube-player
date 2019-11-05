import { WebPlugin } from '@capacitor/core';
import { IPlayerSize, IPlayerVars, IPlayerState } from './web/models/models';
export declare function YT(): any;
export declare function Player(): any;
export declare function PlayerState(): any;
export declare class YoutubePlayerPluginWeb extends WebPlugin {
    players: any;
    playersEventsState: Map<string, IPlayerState>;
    player: any;
    playerApiLoaded: Boolean;
    private readonly defaultSizes;
    constructor();
    loadPlayerApi(): Promise<{}>;
    checkSize(options: {
        playerId: string;
        playerSize: IPlayerSize;
        playerVars?: IPlayerVars;
        videoId: string;
    }): {
        height: number;
        width: number;
    };
    createPlayer(options: {
        playerId: string;
        playerSize: IPlayerSize;
        playerVars?: IPlayerVars;
        videoId: string;
    }): Promise<{}>;
    initialize(options: {
        playerId: string;
        playerSize: IPlayerSize;
        playerVars?: IPlayerVars;
        videoId: string;
    }): Promise<{}>;
    destroy(playerId: string): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    /*********/
    stopVideo(playerId: string): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    playVideo(playerId: string): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    pauseVideo(playerId: string): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    seekTo(playerId: string, seconds: number, allowSeekAhead: boolean): Promise<{
        result: {
            method: string;
            value: boolean;
            seconds: number;
            allowSeekAhead: boolean;
        };
    }>;
    loadVideoById(playerId: string, options: {
        videoId: string;
        startSeconds?: number;
        endSeconds?: number;
        suggestedQuality?: string;
    }): Promise<{
        result: {
            method: string;
            value: boolean;
            options: {
                videoId: string;
                startSeconds?: number;
                endSeconds?: number;
                suggestedQuality?: string;
            };
        };
    }>;
    cueVideoById(playerId: string, options: {
        videoId: string;
        startSeconds?: number;
        endSeconds?: number;
        suggestedQuality?: string;
    }): Promise<{
        result: {
            method: string;
            value: boolean;
            options: {
                videoId: string;
                startSeconds?: number;
                endSeconds?: number;
                suggestedQuality?: string;
            };
        };
    }>;
    /*********/
    /*********/
    mute(playerId: string): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    unMute(playerId: string): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    isMuted(playerId: string): Promise<{
        result: {
            method: string;
            value: any;
        };
    }>;
    setVolume(playerId: string, volume: Number): Promise<{
        result: {
            method: string;
            value: Number;
        };
    }>;
    getVolume(playerId: string): Promise<{
        result: {
            method: string;
            value: any;
        };
    }>;
    /*********/
    /*********/
    setSize(playerId: string, width: Number, height: Number): Promise<{
        result: {
            method: string;
            value: {
                width: Number;
                height: Number;
            };
        };
    }>;
    /*********/
    /*********/
    getVideoLoadedFraction(playerId: string): Promise<{
        result: {
            method: string;
            value: any;
        };
    }>;
    getPlayerState(playerId: string): Promise<{
        result: {
            method: string;
            value: any;
        };
    }>;
    getAllPlayersEventsState(): Promise<{
        result: {
            method: string;
            value: Map<string, IPlayerState>;
        };
    }>;
    getCurrentTime(playerId: string): Promise<{
        result: {
            method: string;
            value: any;
        };
    }>;
    toggleFullScreen(playerId: string, isFullScreen: boolean | null | undefined): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
declare const YoutubePlayerWeb: YoutubePlayerPluginWeb;
export { YoutubePlayerWeb };
