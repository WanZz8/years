package com.rn_nf;

import android.app.Application;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.umeng.analytics.MobclickAgent;

public class MainActivity extends ReactActivity {

    //    private ReactRootView mReactRootView;
//    private ReactInstanceManager mReactInstanceManager;
//
//
    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        MobclickAgent.setSessionContinueMillis(1000);
        MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_DUM_NORMAL);
//        mReactInstanceManager = ReactInstanceManager.builder()
//
//                .addPackage(new CodePush("gBrx3j-kH7mAsc8aO_CbGjkW2OpTHk0L2mjiG",getApplicationContext(),BuildConfig.DEBUG))
//                .setJSBundleFile(CodePush.getJSBundleFile())
//
//                .setApplication(getApplication())
//                .setJSBundleFile("index.android.bundle")
//                .addPackage(new MainReactPackage())
//                .addPackage(new RNDeviceInfo())
//                .setUseDeveloperSupport(BuildConfig.DEBUG)
//                .setInitialLifecycleState(LifecycleState.RESUMED)
//                .build();
//
//        mReactRootView.startReactApplication(mReactInstanceManager,getMainComponentName(),null);
//        setContentView(mReactRootView);
    }

    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }
    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "RN_NF";
    }
}
