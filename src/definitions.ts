declare global {
  interface PluginRegistry {
    YoutubePlayer?: YoutubePlayerPlugin;
  }
}

export interface YoutubePlayerPlugin {
  echo(options: { value: string }): Promise<{value: string}>;
  initialize(options: {playerId: string, width: number, height: number, videoId: string}): Promise<{playerReady: boolean}>;
  stopVideo(): Promise<{stopVideo: boolean}>;
  playVideo(): Promise<{playVideo: boolean}>;
  pauseVideo(): Promise<{pauseVideo: boolean}>;
}
