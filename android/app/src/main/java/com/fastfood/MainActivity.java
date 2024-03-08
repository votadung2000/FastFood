package com.fastfood;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "fastfood";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    RNBootSplash.init(this, R.style.BootTheme);
    super.onCreate(savedInstanceState);
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        super.loadApp(appKey);
      }
    };
  }
}
