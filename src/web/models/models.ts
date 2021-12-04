export type RequiredKeys<T, K extends keyof T> = Exclude<T, K> & { [key in K]-?: Required<T[key]> }

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
    playlist: string | string[],
    index?: number,
    startSeconds?: number,
    suggestedQuality?: string
}

export interface IPlayerLog {
    log(primaryMessage: string, ...supportingData: any[]): void;
    debug(primaryMessage: string, ...supportingData: any[]): void;
    warn(primaryMessage: string, ...supportingData: any[]): void;
    error(primaryMessage: string, ...supportingData: any[]): void;
    info(primaryMessage: string, ...supportingData: any[]): void;
}
