package com.abpjap.plugin.youtubeplayer;

import android.os.Bundle;
import android.util.Log;

import com.abpjap.plugin.youtubeplayer.capacitoryoutubeplayer.BuildConfig;
import com.getcapacitor.JSObject;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayerFragment;

import com.abpjap.plugin.youtubeplayer.capacitoryoutubeplayer.R;

public class YoutubePlayerFragment extends YouTubeFailureRecoveryActivity {

    private static final String TAG = YoutubePlayerFragment.class.getSimpleName();

    private MyPlayerStateChangeListener playerStateChangeListener;

    private String videoId;
    private boolean fullscreen = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "[Youtube Player Fragment]: onCreate");
        setContentView(R.layout.fragment_player);

        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            videoId = extras.getString("videoId");
            fullscreen = extras.getBoolean("fullscreen");
            initializeYoutubePlayer();
        }
    }

    /**
     * Initialize youtube player via Fragment and get instance of YoutubePlayer.
     */
    private void initializeYoutubePlayer() {
        Log.d(TAG, "[Youtube Player Fragment]: initializeYoutubePlayer");
        YouTubePlayerFragment youTubePlayerFragment = (YouTubePlayerFragment) getYouTubePlayerProvider();
        youTubePlayerFragment.initialize(BuildConfig.YOUTUBE_API_KEY, this);
        playerStateChangeListener = new MyPlayerStateChangeListener();
    }

    @Override
    public void onInitializationSuccess(YouTubePlayer.Provider provider, YouTubePlayer player,
                                        boolean wasRestored) {
        if (!wasRestored) {

            // Set the player style default.
            player.setPlayerStyle(YouTubePlayer.PlayerStyle.DEFAULT);

            JSObject result = new JSObject();
            result.put("message", "Youtube Player View initialized.");
            result.put("value", player);
            RxBus.publish(result);

            // Specify that we want to handle fullscreen behavior ourselves.

            /*
            player.addFullscreenControlFlag(YouTubePlayer.FULLSCREEN_FLAG_CUSTOM_LAYOUT);
            player.setOnFullscreenListener(b -> {
                Log.d(TAG, "Youtube Player View onFullscreen " + b);
                fullscreen = b;
            });

            if (fullscreen) {
                player.setFullscreen(fullscreen);
            }

             */

            // Cue the video by videoId.
            player.cueVideo(videoId);

        }

    }

    @Override
    public void onInitializationFailure(YouTubePlayer.Provider provider, YouTubeInitializationResult error) {

        // Print or show error if initialization failed.
        Log.e(TAG, "Youtube Player View initialization failed -> error:" + error.toString());

        RxBus.publish("Youtube Player View initialization failed");
    }

    @Override
    protected YouTubePlayer.Provider getYouTubePlayerProvider() {
        return (YouTubePlayerFragment) getFragmentManager().findFragmentById(R.id.youtube_player_fragment);
    }

    private final class MyPlayerStateChangeListener implements YouTubePlayer.PlayerStateChangeListener {
        String playerState = "UNINITIALIZED";

        @Override
        public void onLoading() {
            playerState = "LOADING";
            Log.d(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }

        @Override
        public void onLoaded(String videoId) {
            playerState = String.format("LOADED %s", videoId);
            Log.d(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }

        @Override
        public void onAdStarted() {
            playerState = "AD_STARTED";
            Log.d(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }

        @Override
        public void onVideoStarted() {
            playerState = "VIDEO_STARTED";
            Log.d(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }

        @Override
        public void onVideoEnded() {
            playerState = "VIDEO_ENDED";
            Log.d(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }

        @Override
        public void onError(YouTubePlayer.ErrorReason reason) {
            playerState = "ERROR (" + reason + ")";
            if (reason == YouTubePlayer.ErrorReason.UNEXPECTED_SERVICE_DISCONNECTION) {
                // When this error occurs the player is released and can no longer be used.
            }
            Log.e(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }
    }


}
