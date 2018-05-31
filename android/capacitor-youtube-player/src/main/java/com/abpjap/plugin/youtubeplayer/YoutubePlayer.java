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

import java.util.Observable;
import java.util.Observer;

@NativePlugin()
public class YoutubePlayer extends Plugin {

    private static final String TAG = YouTubePlayer.class.getSimpleName();

    private Context context;

    private ObservableResult oResult;
    private Observer oResultChanged = new Observer() {
        @Override
        public void update(Observable o, Object newValue) {
            // NewValue is the observable string value.
            Log.e(TAG, "Result has changed, new value:"+ (String) newValue);
        }
    };


    public void load() {
        Log.e(TAG, "[Youtube Player Plugin Native Android]: load");
        context = getContext();

        // Add listener for value change.
        oResult.addObserver(oResultChanged);
    }

    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }

    @PluginMethod()
    public void initialize(PluginCall call) {

        Log.e(TAG, "[Youtube Player Plugin Native Android]: initialize");

        String videoId = call.getString("videoId");
        Log.e(TAG, "[Youtube Player Plugin Native Android]: videoId " + videoId);

        Intent intent= new Intent();
        intent.setClass(context, YoutubePlayerFragment.class);
        intent.putExtra("videoId", videoId);
        getActivity().startActivity(intent);

    }
}
