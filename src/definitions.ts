import type { IPlayerState, IPlayerOptions, IPlaylistOptions, IVideoOptionsById, IVideoOptionsByUrl,
  IPlaybackQuality, PlayerEvent, Events } from './web/models/models';

export interface YoutubePlayerPlugin {
  initialize(options: IPlayerOptions): Promise<{playerReady: boolean, player: string} | undefined>;
  destroy(playerId: string): Promise<{result: { method: string, value: boolean }}>;
  // Methods playback controls and player settings..
  /***********/
  stopVideo(playerId: string): Promise<{result: { method: string, value: boolean }}>;
  playVideo(playerId: string): Promise<{result: { method: string, value: boolean }}>;
  pauseVideo(playerId: string): Promise<{result: { method: string, value: boolean }}>;
  seekTo(playerId: string, seconds: number, allowSeekAhead: boolean): Promise<{result: { method: string, value: boolean, seconds: number, allowSeekAhead: boolean }}>;
  loadVideoById(playerId: string, options: IVideoOptionsById): Promise<{result: { method: string, value: boolean, options: IVideoOptionsById }}>;
  cueVideoById(playerId: string, options: IVideoOptionsById): Promise<{result: { method: string, value: boolean, options: IVideoOptionsById }}>;
  loadVideoByUrl(playerId: string, options: IVideoOptionsByUrl): Promise<{result: { method: string, value: boolean, options: IVideoOptionsByUrl }}>;
  cueVideoByUrl(playerId: string, options: IVideoOptionsByUrl): Promise<{result: { method: string, value: boolean, options: IVideoOptionsByUrl }}>;
  /***********/

  // Methods for playing playlist.
  /***********/
  cuePlaylist(playerId: string, playlistOptions: IPlaylistOptions): Promise<{result: { method: string, value: boolean }}>;
  loadPlaylist(playerId: string, playlistOptions: IPlaylistOptions): Promise<{result: { method: string, value: boolean }}>;
  /***********/

  // Methods for playing video in playlist.
  /***********/
  nextVideo(playerId: string): Promise<{result: { method: string, value: boolean }}>;
  previousVideo(playerId: string): Promise<{result: { method: string, value: boolean }}>;
  playVideoAt(playerId: string, index: number): Promise<{result: { method: string, value: boolean }}>;
  /***********/

  // Methods changing the player volume.
  /***********/
  mute(playerId: string): Promise<{result: { method: string, value: boolean }}>;
  unMute(playerId: string): Promise<{result: { method: string, value: boolean }}>;
  isMuted(playerId: string): Promise<{result: { method: string, value: boolean }}>;
  setVolume(playerId: string, volume: number): Promise<{result: { method: string, value: number }}>;
  getVolume(playerId: string): Promise<{result: { method: string, value: number }}>;
  /***********/

  // Methods setting the player size.
  /***********/
  setSize(playerId: string, width: number, height: number): Promise<{result: { method: string, value: {width: number, height: number} }}>;
  /***********/

  // Methods for adjusting the playback speed.
  /***********/
  getPlaybackRate(playerId: string): Promise<{result: { method: string, value: number }}>;
  setPlaybackRate(playerId: string, suggestedRate: number): Promise<{result: { method: string, value: boolean }}>;
  getAvailablePlaybackRates(playerId: string): Promise<{result: { method: string, value: number[] }}>;
  /***********/


  // Methods for playlist playback settings
  /***********/
  setLoop(playerId: string, loopPlaylists: boolean): Promise<{result: { method: string, value: boolean }}>;
  setShuffle(playerId: string, shufflePlaylist: boolean): Promise<{result: { method: string, value: boolean }}>;
  /***********/

  // Methods playback status.
  /***********/
  getVideoLoadedFraction(playerId: string): Promise<{result: { method: string, value: number }}>;
  getPlayerState(playerId: string): Promise<{result: { method: string, value: number }}>;
  getAllPlayersEventsState(): Promise<{result: { method: string, value: Map<string, IPlayerState> }}>;
  getCurrentTime(playerId: string): Promise<{result: { method: string, value: number }}>;
  toggleFullScreen(playerId: string, isFullScreen: boolean | null | undefined): Promise<{result: { method: string, value: boolean | null | undefined }}>;
  /***********/

  // Methods playback quality.
  /***********/
  getPlaybackQuality(playerId: string): Promise<{result: { method: string, value: IPlaybackQuality }}>;
  setPlaybackQuality(playerId: string, suggestedQuality: IPlaybackQuality): Promise<{result: { method: string, value: boolean }}>;
  getAvailableQualityLevels(playerId: string): Promise<{result: { method: string, value: IPlaybackQuality[] }}>;
  /***********/

  // Methods for retrieving video information.
  /***********/
  getDuration(playerId: string): Promise<{result: { method: string, value: number }}>;
  getVideoUrl(playerId: string): Promise<{result: { method: string, value: string }}>;
  getVideoEmbedCode(playerId: string): Promise<{result: { method: string, value: string }}>;
  /***********/

  // Methods for retrieving playlist information.
  /***********/
  getPlaylist(playerId: string): Promise<{result: { method: string, value: string[] }}>;
  getPlaylistIndex(playerId: string): Promise<{result: { method: string, value: number }}>;
  /***********/

  // Methods for accessing and modifying DOM nodes.
  getIframe(playerId: string): Promise<{result: { method: string, value: HTMLIFrameElement}}>

  // Player event listeners.
  addEventListener<TEvent extends PlayerEvent>(playerId: string, eventName: keyof Events, listener: (event: TEvent) => void): void;
  removeEventListener<TEvent extends PlayerEvent>(playerId: string, eventName: keyof Events, listener: (event: TEvent) => void): void;
}
