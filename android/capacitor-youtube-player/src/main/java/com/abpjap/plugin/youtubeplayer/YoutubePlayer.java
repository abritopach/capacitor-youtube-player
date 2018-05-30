package com.abpjap.plugin.youtubeplayer;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayerSupportFragment;

import com.abpjap.plugin.youtubeplayer.capacitoryoutubeplayer.R;

@NativePlugin()
public class YoutubePlayer extends Plugin {

    private static final String TAG = YouTubePlayer.class.getSimpleName();
    // Youtube player fragment.
    private YouTubePlayerSupportFragment youTubePlayerFragment;

    // Youtube player to play video.
    private YouTubePlayer youTubePlayer;

    private Context context;


    public void load() {
        Log.e(TAG, "Youtube Player View load.");
        context = getContext();
    }

    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }

    @PluginMethod()
    public void initialize(final PluginCall call) {

        getActivity().setContentView(R.layout.activity_player);

        youTubePlayerFragment = (YouTubePlayerSupportFragment) getActivity().getSupportFragmentManager()
                .findFragmentById(R.id.youtube_player_fragment);

        if (youTubePlayerFragment == null)
            return;

        youTubePlayerFragment.initialize(Config.YOUTUBE_API_KEY, new YouTubePlayer.OnInitializedListener() {

            @Override
            public void onInitializationSuccess(YouTubePlayer.Provider provider, YouTubePlayer player,
                                                boolean wasRestored) {
                if (!wasRestored) {
                    youTubePlayer = player;

                    // Set the player style default.
                    youTubePlayer.setPlayerStyle(YouTubePlayer.PlayerStyle.DEFAULT);
                    youTubePlayer.cueVideo("CqhpNxI8qYw");
                    String value = call.getString("Youtube Player View Loaded");
                    JSObject ret = new JSObject();
                    ret.put("value", value);
                    call.success(ret);
                }
            }

            @Override
            public void onInitializationFailure(YouTubePlayer.Provider arg0, YouTubeInitializationResult arg1) {

                // Print or show error if initialization failed.
                Log.e(TAG, "Youtube Player View initialize failed");
            }
        });

    }
}
