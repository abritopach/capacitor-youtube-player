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
    onPlayerReady(): Promise<{
        playerReady: boolean;
    }>;
}
