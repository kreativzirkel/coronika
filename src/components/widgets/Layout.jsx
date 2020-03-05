import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { COLOR_SECONDARY } from '../../constants';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

const Layout = ({ children, backgroundColor = COLOR_SECONDARY, statusBarHidden = false }) => (
  <SafeAreaView style={{ ...styles.safeAreaView, backgroundColor }}>
    <StatusBar animated backgroundColor={backgroundColor} barStyle={'dark-content'} hidden={statusBarHidden} />

    {children}
  </SafeAreaView>
);

export default Layout;
