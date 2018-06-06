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
    seekTo(playerId: string): Promise<{
        result: {
            method: string;
            value: boolean;
            seconds: number;
            allowSeekAhead: boolean;
        };
    }>;
    clearVideo(playerId: string): Promise<{
        result: {
            method: string;
            value: boolean;
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
}
