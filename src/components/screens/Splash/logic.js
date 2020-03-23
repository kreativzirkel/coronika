import * as RNLocalize from 'react-native-localize';
import SplashScreen from 'react-native-splash-screen';
import connect from 'react-redux/lib/connect/connect';
import { SUPPORTED_LANGUAGES } from '../../../constants';
import withI18n, { changeLanguage } from '../../../i18n';
import { container } from '../../../utils/react';
import sleep from '../../../utils/sleep';
import { configurePushNotifications } from '../Settings/logic';
import Screen from './ui';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (/* dispatch */) => {
  return {};
};

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
      await sleep(3000);

      if (showWelcomeScreen) {
        navigation.navigate('Welcome');
      } else {
        navigation.navigate('App');
      }
    })();
  },
});

const Splash = withI18n(connect(mapStateToProps, mapDispatchToProps)(Container));

export default Splash;
