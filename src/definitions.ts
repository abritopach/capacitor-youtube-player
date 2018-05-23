declare global {
  interface PluginRegistry {
    YoutubePlayer?: YoutubePlayerPlugin;
  }
}

export interface YoutubePlayerPlugin {
  echo(options: { value: string }): Promise<{value: string}>;
  // initialize(options: { key: string, value: string }): Promise<{result: boolean}>;
  onPlayerReady(): Promise<{playerReady: boolean}>;
}
