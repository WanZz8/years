package com.rn_nf;

import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class ContextModule extends ReactContextBaseJavaModule {

    private static final String STORE = "sdlndfqh";

    public ContextModule(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName(){
        return "ContextBridge";
    }

    @ReactMethod
    public void getStore(Callback callback){callback.invoke(STORE);}
}
