import SplashScreen from 'react-native-splash-screen';
import connect from 'react-redux/lib/connect/connect';
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

    (async () => {
      await sleep(4000);
      navigation.navigate('App');
    })();
  },
});

const Splash = connect(mapStateToProps, mapDispatchToProps)(Container);

export default Splash;
