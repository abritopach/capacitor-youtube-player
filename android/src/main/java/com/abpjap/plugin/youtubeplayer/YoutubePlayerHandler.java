package com.abpjap.plugin.youtubeplayer;

import com.google.android.youtube.player.YouTubePlayer;

public class YoutubePlayerHandler {

    // Methods playing video.
    /***********/

    public void playVideo(YouTubePlayer youTubePlayer) {
        youTubePlayer.play();
    }

    public void pauseVideo(YouTubePlayer youTubePlayer) {
        youTubePlayer.pause();
    }

    public void seekTo(YouTubePlayer youTubePlayer, int millis) {
        youTubePlayer.seekToMillis(millis);
    }

    public void cueVideoById(YouTubePlayer youTubePlayer, String videoId) {
        youTubePlayer.cueVideo(videoId);
    }

    public void loadVideoById(YouTubePlayer youTubePlayer, String videoId) {
        youTubePlayer.loadVideo(videoId);
    }
}
