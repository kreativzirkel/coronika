import * as RNLocalize from 'react-native-localize';
import SplashScreen from 'react-native-splash-screen';
import connect from 'react-redux/lib/connect/connect';
import { SUPPORTED_LANGUAGES } from '../../../constants';
import withI18n, { changeLanguage } from '../../../i18n';
import { container } from '../../../utils/react';
import sleep from '../../../utils/sleep';
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

    const { navigation } = this.props;
    const bestAvailableLanguage = RNLocalize.findBestAvailableLanguage(SUPPORTED_LANGUAGES);

    if (bestAvailableLanguage) {
      const {
        store: { dispatch },
      } = this.context;

      dispatch(changeLanguage(bestAvailableLanguage.languageTag.substring(0, 2)));
    }

    (async () => {
      await sleep(3000);
      navigation.navigate('Welcome');
    })();
  },
});

const Splash = withI18n(connect(mapStateToProps, mapDispatchToProps)(Container));

export default Splash;
