package com.abpjap.plugin.youtubeplayer;

import androidx.annotation.NonNull;

import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Consumer;
import io.reactivex.subjects.BehaviorSubject;

public final class RxBus {
    // This how to create our bus.
    private static final BehaviorSubject<Object> behaviorSubject
            = BehaviorSubject.create();


    public static Disposable subscribe(@NonNull Consumer<Object> action) {
        return behaviorSubject.subscribe(action);
    }

    // Use this method to send data.
    public static void publish(@NonNull Object message) {
        behaviorSubject.onNext(message);
    }
}
