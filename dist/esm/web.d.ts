import { WebPlugin } from '@capacitor/core';
import { IPlayerSize, IPlayerVars } from './web/models/models';
export declare function YT(): any;
export declare function Player(): any;
export declare class YoutubePlayerPluginWeb extends WebPlugin {
    players: any;
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
    /*********/
    stopVideo(): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    playVideo(): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    pauseVideo(): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    seekTo(seconds: number, allowSeekAhead: boolean): Promise<{
        result: {
            method: string;
            value: boolean;
            seconds: number;
            allowSeekAhead: boolean;
        };
    }>;
    clearVideo(): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    loadVideoById(options: {
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
    cueVideoById(options: {
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
    /*********/
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
declare const YoutubePlayerWeb: YoutubePlayerPluginWeb;
export { YoutubePlayerWeb };
