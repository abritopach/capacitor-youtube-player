package com.abpjap.plugin.youtubeplayer;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.youtube.player.YouTubePlayer;

import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Consumer;

@CapacitorPlugin()
public class YoutubePlayer extends Plugin {

    private static final String TAG = YouTubePlayer.class.getSimpleName();

    private Context context;
    private final YouTubePlayer youTubePlayer = null;
    private YoutubePlayerHandler youtubePlayerHandler = null;


    public void load() {
        Log.d(TAG, "[Youtube Player Plugin Native Android]: load");
        context = getContext();
        youtubePlayerHandler = new YoutubePlayerHandler();
    }

    @PluginMethod()
    public void initialize(final PluginCall call) {

        Log.d(TAG, "[Youtube Player Plugin Native Android]: initialize");

        String videoId = call.getString("videoId");
        Boolean fullscreen = call.getBoolean("fullscreen");
        JSObject playerSize = call.getObject("playerSize");
        Log.d(TAG, "[Youtube Player Plugin Native Android]: videoId " + videoId + " | fullscreen: " + fullscreen +
        " | playerSize: " + playerSize.toString());

        Intent intent= new Intent();
        intent.setClass(context, YoutubePlayerFragment.class);
        intent.putExtra("videoId", videoId);
        intent.putExtra("fullscreen", fullscreen);
        getActivity().startActivity(intent);

        Disposable disposable = RxBus.subscribe(new Consumer<Object>() {
            @Override
            public void accept(Object o) throws Exception {
                if (o instanceof JSObject) {
                    String message = ((JSObject) o).getString("message");
                    Log.d(TAG, "[Youtube Player Plugin Native Android]: initialize subscribe " + message);

                    JSObject ret = new JSObject();
                    ret.put("value", message);
                    call.resolve(ret);
                }
            }
        });

    }

    @PluginMethod()
    public void playVideo(final PluginCall call) {
        Log.d(TAG, "[Youtube Player Plugin Native Android]: playVideo");

        if (youTubePlayer != null) {
            youtubePlayerHandler.playVideo(youTubePlayer);
        }

    }

    @PluginMethod()
    public void pauseVideo(final PluginCall call) {
        Log.d(TAG, "[Youtube Player Plugin Native Android]: pauseVideo");

        if (youTubePlayer != null) {
            youtubePlayerHandler.pauseVideo(youTubePlayer);
        }

    }

    @PluginMethod()
    public void seekTo(final PluginCall call) {
        Log.d(TAG, "[Youtube Player Plugin Native Android]: seekTo");

        Integer seconds = call.getInt("seconds");

        if (youTubePlayer != null) {
            youtubePlayerHandler.seekTo(youTubePlayer, seconds);
        }

    }


    @PluginMethod()
    public void loadVideoById(final PluginCall call) {
        Log.d(TAG, "[Youtube Player Plugin Native Android]: loadVideoById");

        String videoId = call.getString("videoId");

        if (youTubePlayer != null) {
            youtubePlayerHandler.loadVideoById(youTubePlayer, videoId);
        }

    }

    @PluginMethod()
    public void cueVideoById(final PluginCall call) {
        Log.d(TAG, "[Youtube Player Plugin Native Android]: cueVideoById");

        String videoId = call.getString("videoId");

        if (youTubePlayer != null) {
            youtubePlayerHandler.cueVideoById(youTubePlayer, videoId);
        }

    }
}
