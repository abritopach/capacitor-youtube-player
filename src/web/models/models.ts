export type RequiredKeys<T, K extends keyof T> = Exclude<T, K> & { [key in K]-?: Required<T[key]> }

export enum IPlaybackQuality {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    HD720 = 'hd720',
    HD1080 = 'hd1080',
    HIGH_RES = 'highres',
    DEFAULT = 'default'
}

export enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5
}

/**
 * Known causes for player errors.
*/
export enum PlayerError {
    /**
     * The request contained an invalid parameter value.
     */
    InvalidParam = 2,

    /**
     * The requested content cannot be played in an HTML5 player.
     */
    Html5Error = 5,

    /**
     * The video requested was not found.
     */
    VideoNotFound = 100,

    /**
     * The owner of the requested video does not allow it to be played in embedded players.
     */
    EmbeddingNotAllowed = 101,

    /**
     * This error is the same as 101. It's just a 101 error in disguise!
     */
    EmbeddingNotAllowed2 = 150
}

export interface IPlayerOptions {
    playerId?: string;
    playerSize: IPlayerSize;
    videoId: string;
    fullscreen?: boolean;
    playerVars?: IPlayerVars;
    debug?: boolean;
}

export interface IPlayerSize {
    height: number;
    width: number;
}

// https://developers.google.com/youtube/player_parameters?hl=es-419
export interface IPlayerVars {
    autoplay?: number;
    cc_load_policy?: number;
    color?: string;
    controls?: number;
    disablekb?: number;
    enablejsapi?: number;
    end?: number;
    fs?: number;
    hl?: string;
    iv_load_policy?: number;
    list?: string;
    listType?: string;
    loop?: number;
    modestbranding?: number;
    origin?: string;
    playlist?: string;
    playsinline?: number;
    rel?: number;
    showinfo?: number;
    start?: number;
}

export interface IPlayerState {
    events: {
        onReady?: unknown,
        onStateChange?: unknown,
        onPlaybackQualityChange?: unknown,
        onError?: unknown
    }
}

export interface IPlaylistOptions {
    listType: 'playlist' | 'search' | 'user_uploads';
    list?: string;
    playlist?: string[];
    index?: number;
    startSeconds?: number;
    suggestedQuality?: string;
}

export interface IVideoOptions {
    startSeconds?: number;
    endSeconds?: number;
    suggestedQuality?: IPlaybackQuality;
}

export interface IVideoOptionsById extends IVideoOptions {
    videoId: string;
}

export interface IVideoOptionsByUrl extends IVideoOptions {
    mediaContentUrl: string;
}


/**
* Base interface for events triggered by a player.
*/
export interface PlayerEvent {
    /**
     * Video player corresponding to the event.
     */
    target: Element;
}

/**
 * Event for player state change.
 */
export interface OnStateChangeEvent extends PlayerEvent
{
    /**
     * New player state.
     */
    data: PlayerState;
}

/**
 * Event for playback quality change.
 */
export interface OnPlaybackQualityChangeEvent extends PlayerEvent
{
    /**
     * New playback quality.
     */
    data: string;
}

/**
 * Event for playback rate change.
 */
export interface OnPlaybackRateChangeEvent extends PlayerEvent
{
    /**
     * New playback rate.
     */
    data: number;
}

/**
 * Event for a player error.
 */
export interface OnErrorEvent extends PlayerEvent
{
    /**
     * Which type of error occurred.
     */
    data: PlayerError;
}

/**
 * Handles a player event.
 *
 * @param event   The triggering event.
 */
export interface PlayerEventHandler<TEvent extends PlayerEvent>
{
    (event: TEvent): void;
}

/**
 * * Handlers for events fired by the player.
*/
export interface Events {
    /**
     * Event fired when a player has finished loading and is ready to begin receiving API calls.
     */
    onReady?: PlayerEventHandler<PlayerEvent> | undefined;

    /**
     * Event fired when the player's state changes.
     */
    onStateChange?: PlayerEventHandler<OnStateChangeEvent> | undefined;

    /**
     * Event fired when the playback quality of the player changes.
     */
    onPlaybackQualityChange?: PlayerEventHandler<OnPlaybackQualityChangeEvent> | undefined;

    /**
     * Event fired when the playback rate of the player changes.
     */
    onPlaybackRateChange?: PlayerEventHandler<OnPlaybackRateChangeEvent> | undefined;

    /**
     * Event fired when an error in the player occurs
     */
    onError?: PlayerEventHandler<OnErrorEvent> | undefined;

    /**
     * Event fired to indicate that the player has loaded, or unloaded, a module
     * with exposed API methods. This currently only occurs for closed captioning.
     */
    onApiChange?: PlayerEventHandler<PlayerEvent> | undefined;
}

export interface IPlayerLog {
    log(primaryMessage: string, ...supportingData: any[]): void;
    debug(primaryMessage: string, ...supportingData: any[]): void;
    warn(primaryMessage: string, ...supportingData: any[]): void;
    error(primaryMessage: string, ...supportingData: any[]): void;
    info(primaryMessage: string, ...supportingData: any[]): void;
}
