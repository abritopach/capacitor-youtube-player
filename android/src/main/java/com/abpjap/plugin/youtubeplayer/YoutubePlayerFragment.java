package com.abpjap.plugin.youtubeplayer;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;

import com.abpjap.plugin.youtubeplayer.capacitoryoutubeplayer.BuildConfig;
import com.getcapacitor.JSObject;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayerSupportFragment;

import com.abpjap.plugin.youtubeplayer.capacitoryoutubeplayer.R;

public class YoutubePlayerFragment extends AppCompatActivity {

    private static final String TAG = YoutubePlayerFragment.class.getSimpleName();
    // Youtube player fragment.
    private YouTubePlayerSupportFragment youTubePlayerFragment;

    // Youtube player to play video when new video selected.
    private YouTubePlayer youTubePlayer;

    private MyPlayerStateChangeListener playerStateChangeListener;

    private boolean fullscreen = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.e(TAG, "[Youtube Player Fragment]: onCreate");
        setContentView(R.layout.activity_player);

        String videoId = "";
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            videoId = extras.getString("videoId");
            fullscreen = extras.getBoolean("fullscreen");
            initializeYoutubePlayer(videoId);
        }
    }

    /**
     * Initialize youtube player via Fragment and get instance of YoutubePlayer.
     */
    private void initializeYoutubePlayer(final String videoId) {

        Log.e(TAG, "[Youtube Player Fragment]: initializeYoutubePlayer");

        Object obj = getSupportFragmentManager().findFragmentById(R.id.youtube_player_fragment);
        if (obj instanceof YouTubePlayerSupportFragment)
            youTubePlayerFragment = (YouTubePlayerSupportFragment) obj;

        if (youTubePlayerFragment == null) {
            return;
        }

        youTubePlayerFragment.initialize(BuildConfig.YOUTUBE_API_KEY, new YouTubePlayer.OnInitializedListener() {

            @Override
            public void onInitializationSuccess(YouTubePlayer.Provider provider, YouTubePlayer player,
                                                boolean wasRestored) {

                if (!wasRestored) {

                    youTubePlayer = player;

                    // Set the player style default.
                    youTubePlayer.setPlayerStyle(YouTubePlayer.PlayerStyle.DEFAULT);

                    JSObject result = new JSObject();
                    result.put("message", "Youtube Player View initialized.");
                    result.put("value", youTubePlayer);
                    RxBus.publish(result);

                    // Specify that we want to handle fullscreen behavior ourselves.

                    youTubePlayer.addFullscreenControlFlag(YouTubePlayer.FULLSCREEN_FLAG_CUSTOM_LAYOUT);
                    youTubePlayer.setOnFullscreenListener(new YouTubePlayer.OnFullscreenListener() {
                        @Override
                        public void onFullscreen(boolean b) {
                            Log.e(TAG, "Youtube Player View onFullscreen " + b);
                            fullscreen = b;
                        }
                    });

                    if (fullscreen) {
                        youTubePlayer.setFullscreen(fullscreen);
                    }

                    // Cue the video by videoId.
                    youTubePlayer.cueVideo(videoId);

                }
            }

            @Override
            public void onInitializationFailure(YouTubePlayer.Provider provider, YouTubeInitializationResult error) {

                // Print or show error if initialization failed.
                Log.e(TAG, "Youtube Player View initialization failed -> error:" + error.toString());

                RxBus.publish("Youtube Player View initialization failed");
            }
        });

        playerStateChangeListener = new MyPlayerStateChangeListener();
    }

    private final class MyPlayerStateChangeListener implements YouTubePlayer.PlayerStateChangeListener {
        String playerState = "UNINITIALIZED";

        @Override
        public void onLoading() {
            playerState = "LOADING";
            Log.e(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }

        @Override
        public void onLoaded(String videoId) {
            playerState = String.format("LOADED %s", videoId);
            Log.e(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }

        @Override
        public void onAdStarted() {
            playerState = "AD_STARTED";
            Log.e(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }

        @Override
        public void onVideoStarted() {
            playerState = "VIDEO_STARTED";
            Log.e(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }

        @Override
        public void onVideoEnded() {
            playerState = "VIDEO_ENDED";
            Log.e(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }

        @Override
        public void onError(YouTubePlayer.ErrorReason reason) {
            playerState = "ERROR (" + reason + ")";
            if (reason == YouTubePlayer.ErrorReason.UNEXPECTED_SERVICE_DISCONNECTION) {
                // When this error occurs the player is released and can no longer be used.
                youTubePlayer = null;
            }
            Log.e(TAG, "[Youtube Player Fragment]: MyPlayerStateChangeListener  " + playerState);
        }
    }


}
