import { WebPlugin } from '@capacitor/core';
import 'youtube';
export declare class YoutubePlayerPluginWeb extends WebPlugin {
    player: any;
    constructor();
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
    onYouTubeIframeAPIReady(): void;
    onPlayerReady(): Promise<{
        playerReady: boolean;
    }>;
}
declare const YoutubePlayerWeb: YoutubePlayerPluginWeb;
export { YoutubePlayerWeb };
