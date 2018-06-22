# CapacitorYoutubePlayer

Capacitor Youtube Player is a custom Native Capacitor plugin to show Youtube Player on Web, IOS and  Android platforms.

![Technologies](readme_resources/technologies.jpg "Technologies")

## Methods available

    -> WEB


    // Load player API & Create Player.

    initialize(options: {playerId: string, playerSize: IPlayerSize, playerVars?: IPlayerVars, videoId: string})
    destroy(playerId: string)

    *** Methods playback controls and player settings. ***

    // Stops and cancels loading of the current video. This function should be reserved for rare situations when you know that the user will not // be watching additional video in the player. If your intent is to pause the video, you should just call the pauseVideo function. If you want // to change the video that the player is playing, you can call one of the queueing functions without calling stopVideo first.
    stopVideo(playerId: string)

    // Plays the currently cued/loaded video. The final player state after this function executes will be playing (1).
    playVideo(playerId: string)

    // Pauses the currently playing video. The final player state after this function executes will be paused (2) unless the player is in the //ended (0) state when the function is called, in which case the player state will not change.
    pauseVideo(playerId: string)

    // Seeks to a specified time in the video. If the player is paused when the function is called, it will remain paused. If the function is //called from another state (playing, video cued, etc.), the player will play the video.
    seekTo(playerId: string, seconds: number, allowSeekAhead: boolean)

    // Loads and plays the specified video.
    loadVideoById(playerId: string, options: {videoId: string, startSeconds?: number, endSeconds?: number, suggestedQuality?: string})

    // Loads the specified video's thumbnail and prepares the player to play the video. The player does not request the FLV until playVideo() or // seekTo() is called.
    cueVideoById(playerId: string, options: {videoId: string, startSeconds?: number, endSeconds?: number, suggestedQuality?: string})

    *** Methods changing the player volume. ***

    // Mutes the player.
    mute(playerId: string)

    // Unmutes the player.
    unMute(playerId: string)

    // Returns true if the player is muted, false if not.
    isMuted(playerId: string)

    // Sets the volume. Accepts an integer between 0 and 100.
    setVolume(playerId: string, volume: Number)

    // Returns the player's current volume, an integer between 0 and 100. Note that getVolume() will return the volume even if the player is muted.
    getVolume(playerId: string)

    ***  Methods setting the player size.  ***

    // Sets the size in pixels of the <iframe> that contains the player.
    setSize(playerId: string, width:Number, height:Number)

    *** Methods playback status. ***

    // Returns a number between 0 and 1 that specifies the percentage of the video that the player shows as buffered.
    // This method returns a more reliable number than the now-deprecated getVideoBytesLoaded and getVideoBytesTotal methods.
    getVideoLoadedFraction(playerId: string)

    // Returns the state of the player. Possible values are: -1 unstarted / 0 ended / 1 playing / 2 paused / 3 buffering / 5 video cued
    getPlayerState(playerId: string) 

    // Returns the elapsed time in seconds since the video started playing.
    getCurrentTime(playerId: string)

    --> ANDROID

    initialize(options: {width: number, height: number, videoId: string}): Promise<{playerReady: boolean}>;


    --> IOS

    initialize(options: {width: number, height: number, videoId: string}): Promise<{playerReady: boolean}>;
    

## Install Plugin

``` bash
    npm install --save capacitor-youtube-player@latest
```

