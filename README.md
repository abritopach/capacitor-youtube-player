# CapacitorYoutubePlayer

Capacitor Youtube Player is a custom Native Capacitor plugin to show Youtube Player on Web, IOS and  Android platforms.

![Technologies](readme_resources/technologies.jpg "Technologies")

## Example WEB

![App](readme_resources/app.gif "App")

## Methods available

## WEB

Functionality | Methods | Description | Expects | Returns
----------------|----------------|-------------|--------|--------
Load player API & Create Player & Destroy Player | `initialize(options: {playerId: string, playerSize: IPlayerSize, playerVars?: IPlayerVars, videoId: string})` | Promise - Load player API & create player.  | JSON Object  | data
Load player API & Create Player & Destroy Player | ` destroy(playerId: string)` | Promise - Destroy player  | string | data
Playback controls and player settings | `stopVideo` | Promise - Stops and cancels loading of the current video. This function should be reserved for rare situations when you know that the user will not be watching additional video in the player. If your intent is to pause the video, you should just call the pauseVideo function. If you want to change the video that the player is playing, you can call one of the queueing functions without calling stopVideo first. | string | data
Playback controls and player settings | `playVideo(playerId: string)` | Promise - Plays the currently cued/loaded video. The final player state after this function executes will be playing (1). | string | data
Playback controls and player settings | `pauseVideo(playerId: string)` | Promise - Pauses the currently playing video. The final player state after this function executes will be paused (2) unless the player is in the ended (0) state when the function is called, in which case the player state will not change. | string | data
Playback controls and player settings | `seekTo(playerId: string, seconds: number, allowSeekAhead: boolean)` | Promise - Seeks to a specified time in the video. If the player is paused when the function is called, it will remain paused. If the function is called from another state (playing, video cued, etc.), the player will play the video.  | string, number, boolean | data
Playback controls and player settings | `loadVideoById(playerId: string, options: {videoId: string, startSeconds?: number, endSeconds?: number, suggestedQuality?: string})` | Promise - Loads and plays the specified video.  | string, JSON Object | data
Playback controls and player settings | `cueVideoById(playerId: string, options: {videoId: string, startSeconds?: number, endSeconds?: number, suggestedQuality?: string})` | Promise - Loads the specified video's thumbnail and prepares the player to play the video. The player does not request the FLV until playVideo() or seekTo() is called. | string, JSON Object | data
Changing the player volume | `mute(playerId: string)` | Promise - Mutes the player. | string | data
Changing the player volume | `unMute(playerId: string)` | Promise - Unmutes the player. | string | data
Changing the player volume | `isMuted(playerId: string)` | Promise - Returns true if the player is muted, false if not. | string | data
Changing the player volume | `setVolume(playerId: string, volume: Number)` | Promise - Sets the volume. Accepts an integer between 0 and 100. | string, number | data
Changing the player volume | `getVolume(playerId: string)` | Promise - Returns the player's current volume, an integer between 0 and 100. Note that getVolume() will return the volume even if the player is muted. | string | data
Setting the player size | `setSize(playerId: string, width:Number, height:Number)` | Promise - Sets the size in pixels of the <iframe> that contains the player. | string, number, number | data
Playback status | `getVideoLoadedFraction(playerId: string)` | Promise - Returns a number between 0 and 1 that specifies the percentage of the video that the player shows as buffered. This method returns a more reliable number than the now-deprecated getVideoBytesLoaded and getVideoBytesTotal methods.  | string | data
Playback status | `getPlayerState(playerId: string)` | Promise - Returns the state of the player. Possible values are: -1 unstarted / 0 ended / 1 playing / 2 paused / 3 buffering / 5 video cued | string | data
Playback status | `getCurrentTime(playerId: string)` | Promise - Returns the elapsed time in seconds since the video started playing. | string | data

## ANDROID

Functionality | Methods | Description | Expects | Returns
----------------|----------------|-------------|--------|--------
Load player API & Create Player | `initialize(options: {width: number, height: number, videoId: string}): Promise<{playerReady: boolean}>;` | Promise - Load player API & create player.  | JSON Object  | data


## IOS

Functionality | Methods | Description | Expects | Returns
----------------|----------------|-------------|--------|--------
Load player API & Create Player | `initialize(options: {width: number, height: number, videoId: string}): Promise<{playerReady: boolean}>;` | Promise - Load player API & create player.  | JSON Object  | data


## Install Plugin

``` bash
    npm install --save capacitor-youtube-player@latest
```

## Using this plugin


### Ionic / Angular project

1) Install the plugin.

```bash
npm install --save capacitor-youtube-player@latest
```

2) Import plugin in your page.

```bash

import { Plugins, Capacitor } from '@capacitor/core';
import { YoutubePlayerWeb } from 'capacitor-youtube-player';

...

async testNativeYoutubePlayerPlugin() {

    const { YoutubePlayer } = Plugins;

    const options = {width: 640, height: 360, videoId: yourVideoID};
    const playerReady = await YoutubePlayer.initialize(options);
}

async testWebYoutubePlayerPlugin() {
    const options = {playerId: playerId, playerSize: {width: 640, height: 360}, videoId: yourVideoID};
    const result = await YoutubePlayerWeb.initialize(options);
}

```

### Ionic project

- Plugin in Ionic project: TODO

### Angular project

- Plugin in Angular project: https://github.com/abritopach/angular-ionic-ngxs-movies
