import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLOR_PRIMARY } from '../../../constants';
import Layout from '../../widgets/Layout';

const styles = StyleSheet.create({
  animation: {
    width: '90%',
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
});

const Splash = ({ colorScheme }) => {
  const statusBarStyle = colorScheme === 'dark' ? 'dark-content' : 'light-content';

  return (
    <Layout backgroundColor={COLOR_PRIMARY} hideHelperViews statusBarStyle={statusBarStyle}>
      <View style={styles.view}>
        <View>
          <LottieView
            autoPlay
            loop={false}
            source={
              colorScheme === 'dark'
                ? require('../../../assets/animations/splash_dark.json')
                : require('../../../assets/animations/splash.json')
            }
            style={styles.animation}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Splash;
