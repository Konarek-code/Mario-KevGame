package homelesskev.com;

import android.content.res.Configuration;
import android.os.Bundle;
import androidx.core.splashscreen.SplashScreen;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
        int orientation = getResources().getConfiguration().orientation;

        if (orientation == Configuration.ORIENTATION_LANDSCAPE) {
         
            setTheme(R.style.AppTheme_NoSplash);
        } else {
            
            setTheme(R.style.Theme_App_Starting);
        }

        super.onCreate(savedInstanceState);
    };
}
