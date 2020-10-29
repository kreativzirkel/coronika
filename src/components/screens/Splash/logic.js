import * as RNLocalize from 'react-native-localize';
import { BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SUPPORTED_LANGUAGES } from '../../../constants';
import withI18n, { changeLanguage } from '../../../i18n';
import { container } from '../../../utils/react';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import { configurePushNotifications } from '../Settings/logic';
import Screen from './ui';

const Container = container(Screen, {
  componentDidMount() {
    SplashScreen.hide();

    const {
      store: { dispatch, getState },
    } = this.context;
    const { navigation } = this.props;
    const bestAvailableLanguage = RNLocalize.findBestAvailableLanguage(SUPPORTED_LANGUAGES);

    if (bestAvailableLanguage) {
      dispatch(changeLanguage(bestAvailableLanguage.languageTag.substring(0, 2)));
    }

    dispatch(configurePushNotifications(navigation));

    const {
      app: { welcomeScreenShowKey },
      welcome: { showKey },
    } = getState();

    const showWelcomeScreen = welcomeScreenShowKey !== showKey;

    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (showWelcomeScreen) {
        navigation.navigate('Welcome');
      } else {
        navigation.navigate('App');
      }

      this._unsubscribe = navigation.addListener('state', (e) => {
        if (e?.data?.state?.history?.length === 1) {
          BackHandler.exitApp();
        }
      });
    })();
  },

  componentWillUnmount() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  },
});

export default withColorScheme(withI18n(withViewportUnits(Container)));
