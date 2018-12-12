package com.rn_nf;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.tradle.react.UdpSocketsModule;
import com.rnfingerprint.FingerprintAuthPackage;
import com.peel.react.TcpSocketsModule;
import com.peel.react.rnos.RNOSModule;
import com.bitgo.randombytes.RandomBytesPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.umeng.commonsdk.UMConfigure;
import com.rn_nf.invokenative.DplusReactPackage;
import com.rn_nf.invokenative.RNUMConfigure;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

import cn.jpush.reactnativejpush.JPushPackage;
import com.BV.LinearGradient.LinearGradientPackage;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    private boolean SHUTDOWN_TOAST = false;

    private boolean SHUTDOWN_LOG = false;

    @Override protected String getJSBundleFile() {
      return CodePush.getJSBundleFile("index.android.bundle");
    }
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new UdpSocketsModule(),
              new FingerprintAuthPackage(),
              new TcpSocketsModule(),
              new RNOSModule(),
              new RandomBytesPackage(),
              new RNDeviceInfo(),
              new CodePush("GMSGrDDtVtcmiw2Cq8AB2A0GaV_SrJ-5nLgxRm", MainApplication.this, BuildConfig.DEBUG),
              new JPushPackage(SHUTDOWN_TOAST,SHUTDOWN_LOG),
              new DplusReactPackage(),
              new LinearGradientPackage(),
              new ContextModuleReactPackage()
      );
    }

    @Nullable @Override
    protected  String getBundleAssetName(){
      return  "index.android.bundle";
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    RNUMConfigure.init(this,"5bee7dfcf1f556e0c6000027","lenovo",UMConfigure.DEVICE_TYPE_PHONE,"");
  }
}
