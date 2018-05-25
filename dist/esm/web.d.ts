import { WebPlugin } from '@capacitor/core';
export declare class YoutubePlayerPluginWeb extends WebPlugin {
    player: any;
    private readonly defaultSizes;
    private ytApiLoaded;
    constructor();
    loadPlayerApi(): void;
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
    playVideo(): Promise<void>;
    pause(): Promise<void>;
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
declare const YoutubePlayerWeb: YoutubePlayerPluginWeb;
export { YoutubePlayerWeb };
