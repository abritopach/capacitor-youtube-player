package com.abpjap.plugin.youtubeplayer;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.youtube.player.YouTubePlayer;

import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Consumer;

@NativePlugin()
public class YoutubePlayer extends Plugin {

    private static final String TAG = YouTubePlayer.class.getSimpleName();

    private Context context;
    private YouTubePlayer youTubePlayer = null;
    private YoutubePlayerHandler youtubePlayerHandler = null;


    public void load() {
        Log.e(TAG, "[Youtube Player Plugin Native Android]: load");
        context = getContext();
        youtubePlayerHandler = new YoutubePlayerHandler();
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

        Log.e(TAG, "[Youtube Player Plugin Native Android]: initialize");

        String videoId = call.getString("videoId");
        Log.e(TAG, "[Youtube Player Plugin Native Android]: videoId " + videoId);

        Intent intent= new Intent();
        intent.setClass(context, YoutubePlayerFragment.class);
        intent.putExtra("videoId", videoId);
        getActivity().startActivity(intent);

        Disposable disposable = RxBus.subscribe(new Consumer<Object>() {
            @Override
            public void accept(Object o) throws Exception {
                if (o instanceof JSObject) {

                    // youTubePlayer = ((JSObject) o).get("value");
                    String message = ((JSObject) o).getString("message");
                    Log.e(TAG, "[Youtube Player Plugin Native Android]: initialize subscribe " + message);

                    JSObject ret = new JSObject();
                    ret.put("value", message);
                    call.success(ret);
                }
            }
        });

    }

    @PluginMethod()
    public void pauseVideo(final PluginCall call) {
        Log.e(TAG, "[Youtube Player Plugin Native Android]: pauseVideo");

        if (youTubePlayer != null) {
            youtubePlayerHandler.pauseVideo(youTubePlayer);
        }

    }
}
