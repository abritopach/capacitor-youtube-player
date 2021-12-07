package com.abpjap.plugin.youtubeplayer;

import com.google.android.youtube.player.YouTubePlayer;

public class YoutubePlayerHandler {

    // Methods playback controls and player settings.
    /***********/

    public void stopVideo(YouTubePlayer youTubePlayer) {
    }

    public void playVideo(YouTubePlayer youTubePlayer) {
        youTubePlayer.play();
    }

    public void pauseVideo(YouTubePlayer youTubePlayer) {
        youTubePlayer.pause();
    }

    public void seekTo(YouTubePlayer youTubePlayer, int millis) {
        youTubePlayer.seekToMillis(millis);
    }

    public void loadVideoById(YouTubePlayer youTubePlayer, String videoId) {
        youTubePlayer.loadVideo(videoId);
    }

    public void cueVideoById(YouTubePlayer youTubePlayer, String videoId) {
        youTubePlayer.cueVideo(videoId);
    }

}
