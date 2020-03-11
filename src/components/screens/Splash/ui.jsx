import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_PRIMARY } from '../../../constants';
import Layout from '../../widgets/Layout';

// noinspection JSUnresolvedFunction
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

const Splash = () => {
  return (
    <Layout backgroundColor={COLOR_PRIMARY} hideHelperViews statusBarHidden>
      <View style={styles.view}>
        <View>
          <LottieView
            autoPlay
            loop={false}
            source={require('../../../assets/animations/splash.json')}
            style={styles.animation}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Splash;
