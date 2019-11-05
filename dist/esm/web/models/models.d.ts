export interface IPlayerSize {
    height?: number;
    width?: number;
}
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
        onReady?: Object;
        onStateChange?: Object;
        onPlaybackQualityChange?: Object;
        onError?: Object;
    };
}
export interface IPlayerLog {
    log(primaryMessage: string, ...supportingData: any[]): void;
    debug(primaryMessage: string, ...supportingData: any[]): void;
    warn(primaryMessage: string, ...supportingData: any[]): void;
    error(primaryMessage: string, ...supportingData: any[]): void;
    info(primaryMessage: string, ...supportingData: any[]): void;
}
