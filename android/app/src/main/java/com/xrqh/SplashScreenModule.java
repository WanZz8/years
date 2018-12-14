package com.xrqh;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SplashScreenModule extends ReactContextBaseJavaModule {

    public SplashScreenModule(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName(){
        return "SplashScreen";
    }

    @ReactMethod
    public void show(){
        SplashScreen.show(getCurrentActivity(),true);
    }

    @ReactMethod
    public void hide(){
        SplashScreen.hide(getCurrentActivity());
    }
}
