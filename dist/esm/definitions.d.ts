import { IPlayerVars, IPlayerState } from './web/models/models';
declare global  {
    interface PluginRegistry {
        YoutubePlayer?: YoutubePlayerPlugin;
    }
}
export interface YoutubePlayerPlugin {
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    initialize(options: {
        width: number;
        height: number;
        videoId: string;
        playerVars?: IPlayerVars;
    }): Promise<{
        playerReady: boolean;
    }>;
    destroy(playerId: string): Promise<{
        result: {
            method: string;
            value: boolean;
        };
    }>;
    /***********/
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
            options: {};
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
            options: {};
        };
    }>;
    /***********/
    /***********/
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
            value: boolean;
        };
    }>;
    setVolume(playerId: string, volume: Number): Promise<{
        result: {
            method: string;
            value: number;
        };
    }>;
    getVolume(playerId: string): Promise<{
        result: {
            method: string;
            value: number;
        };
    }>;
    /***********/
    /***********/
    setSize(playerId: string, width: Number, height: Number): Promise<{
        result: {
            method: string;
            value: {
                width: number;
                height: number;
            };
        };
    }>;
    /***********/
    /***********/
    getVideoLoadedFraction(playerId: string): Promise<{
        result: {
            method: string;
            value: number;
        };
    }>;
    getPlayerState(playerId: string): Promise<{
        result: {
            method: string;
            value: number;
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
            value: number;
        };
    }>;
    toggleFullScreen(playerId: string, isFullScreen: boolean | null | undefined): Promise<{
        result: {
            method: string;
            value: boolean | null | undefined;
        };
    }>;
}
