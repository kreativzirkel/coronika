import React from 'react';
import { BackHandler, Image, Platform, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { ReactReduxContext } from 'react-redux';
import { COLOR_PRIMARY } from '../../constants';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import withI18n from '../../i18n';
import Layout from '../widgets/Layout';
import { configurePushNotifications } from './Settings/logic';

class Splash extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    SplashScreen.hide();

    const {
      store: { dispatch, getState },
    } = this.context;
    const { navigation } = this.props;

    dispatch(configurePushNotifications(navigation));

    const {
      app: { welcomeScreenShowKey },
      welcome: { showKey },
    } = getState();

    const showWelcomeScreen = welcomeScreenShowKey !== showKey;

    (async () => {
      await new Promise((resolve) => setTimeout(resolve, Platform.OS === 'ios' ? 1500 : 1000));

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
  }

  componentWillUnmount() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  styles = StyleSheet.create({
    logoSupport: {
      height: this.props.vw(20),
      width: this.props.vw(50),
    },
    text: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(12),
    },
    textSupport: {
      color: '#000000',
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(3.2),
      lineHeight: this.props.vw(6.5),
    },
    view: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
    },
    viewSupport: {
      alignItems: 'center',
      bottom: 0,
      flex: 1,
      flexDirection: 'column',
      height: this.props.vw(40),
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      width: this.props.vw(100),
    },
  });

  render() {
    const { colors, colorScheme, __ } = this.props;

    const styles = {
      ...this.styles,
      text: {
        ...this.styles.text,
        color: colors.TEXT_ALT,
      },
    };

    const statusBarStyle = colorScheme === 'dark' ? 'dark-content' : 'light-content';

    return (
      <Layout backgroundColor={COLOR_PRIMARY} hideHelperViews statusBarStyle={statusBarStyle}>
        <View style={styles.view}>
          <Text style={styles.text}>coronika</Text>

          {Platform.OS === 'ios' && (
            <View style={styles.viewSupport}>
              <Text style={styles.textSupport}>{__('splash-screen.supported-by.headline').toLowerCase()}</Text>
              <Image
                resizeMode={'contain'}
                source={require('../../assets/images/logo_bjoern-steiger-stiftung.png')}
                style={styles.logoSupport}
              />
            </View>
          )}
        </View>
      </Layout>
    );
  }
}

Splash.contextType = ReactReduxContext;

export default withColorScheme(withI18n(withViewportUnits(Splash)));
