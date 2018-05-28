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
        playerId: string;
        width: number;
        height: number;
        videoId: string;
    }): Promise<{
        playerReady: boolean;
    }>;
    /***********/
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
    seekTo(): Promise<{
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
            options: {};
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
            options: {};
        };
    }>;
}
