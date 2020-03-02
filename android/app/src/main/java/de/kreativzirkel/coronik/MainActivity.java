package de.kreativzirkel.coronik;

import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
SplashScreen.show(this, R.style.SplashScreenTheme);        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
SplashScreen.show(this, R.style.SplashScreenTheme);    }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Coronik";
  }
}
