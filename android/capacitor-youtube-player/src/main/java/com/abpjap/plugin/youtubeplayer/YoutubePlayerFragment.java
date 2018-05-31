package com.abpjap.plugin.youtubeplayer;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayerSupportFragment;

import com.abpjap.plugin.youtubeplayer.capacitoryoutubeplayer.R;

public class YoutubePlayerFragment extends AppCompatActivity {

    private static final String TAG = YoutubePlayerFragment.class.getSimpleName();
    //youtube player fragment
    private YouTubePlayerSupportFragment youTubePlayerFragment;

    //youtube player to play video when new video selected
    private YouTubePlayer youTubePlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.e(TAG, "[Youtube Player Fragment]: onCreate");
        setContentView(R.layout.activity_player);

        String videoId = "";
        if (savedInstanceState == null) {
            Bundle extras = getIntent().getExtras();
            if (extras != null) {
                videoId = extras.getString("videoId");
                initializeYoutubePlayer(videoId);
            }
        }
    }

    /**
     * Initialize youtube player via Fragment and get instance of YoutubePlayer.
     */
    private void initializeYoutubePlayer(final String videoId) {

        Log.e(TAG, "[Youtube Player Fragment]: initializeYoutubePlayer");
        youTubePlayerFragment = (YouTubePlayerSupportFragment) getSupportFragmentManager()
                .findFragmentById(R.id.youtube_player_fragment);

        if (youTubePlayerFragment == null)
            return;

        youTubePlayerFragment.initialize(Config.YOUTUBE_API_KEY, new YouTubePlayer.OnInitializedListener() {

            @Override
            public void onInitializationSuccess(YouTubePlayer.Provider provider, YouTubePlayer player,
                                                boolean wasRestored) {
                if (!wasRestored) {
                    youTubePlayer = player;

                    //set the player style default
                    youTubePlayer.setPlayerStyle(YouTubePlayer.PlayerStyle.DEFAULT);

                    //cue the 1st video by default
                    youTubePlayer.cueVideo(videoId);

                }
            }

            @Override
            public void onInitializationFailure(YouTubePlayer.Provider arg0, YouTubeInitializationResult arg1) {

                //print or show error if initialization failed
                Log.e(TAG, "Youtube Player View initialization failed");
            }
        });
    }


}
