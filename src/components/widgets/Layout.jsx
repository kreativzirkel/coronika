import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { COLOR_SECONDARY } from '../../constants';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  helperView: {
    backgroundColor: '#ffffff',
    bottom: 0,
    height: '50%',
    left: 0,
    right: 0,
    position: 'absolute',
    width: '100%',
    zIndex: -1,
  },
  safeAreaView: {
    flex: 1,
  },
});

const Layout = ({ children, backgroundColor = COLOR_SECONDARY, hideHelperViews = false, statusBarHidden = false }) => (
  <SafeAreaView style={{ ...styles.safeAreaView, backgroundColor }}>
    <StatusBar animated backgroundColor={backgroundColor} barStyle={'dark-content'} hidden={statusBarHidden} />

    {!hideHelperViews && <View style={styles.helperView} />}

    {children}
  </SafeAreaView>
);

export default Layout;
