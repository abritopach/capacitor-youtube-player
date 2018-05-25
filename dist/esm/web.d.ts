import { WebPlugin } from '@capacitor/core';
export declare function YT(): any;
export declare function Player(): any;
export declare class YoutubePlayerPluginWeb extends WebPlugin {
    player: any;
    private readonly defaultSizes;
    private ytApiLoaded;
    constructor();
    loadPlayerApi(): void;
    checkSize(options: {
        playerId: string;
        width: number;
        height: number;
        videoId: string;
    }): {
        height: number;
        width: number;
    };
    createPlayer(options: {
        playerId: string;
        width: number;
        height: number;
        videoId: string;
    }): void;
    initialize(options: {
        playerId: string;
        width: number;
        height: number;
        videoId: string;
    }): Promise<void>;
    stopVideo(): Promise<{
        stopVideo: boolean;
    }>;
    playVideo(): Promise<{
        playVideo: boolean;
    }>;
    pauseVideo(): Promise<{
        pauseVideo: boolean;
    }>;
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
declare const YoutubePlayerWeb: YoutubePlayerPluginWeb;
export { YoutubePlayerWeb };
