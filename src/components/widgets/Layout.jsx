import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { COLOR_SECONDARY } from '../../constants';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

const Layout = ({ children, backgroundColor = COLOR_SECONDARY, hideHelperViews = false, statusBarHidden = false }) => (
  <SafeAreaView style={{ ...styles.safeAreaView, backgroundColor }}>
    <StatusBar animated backgroundColor={backgroundColor} barStyle={'dark-content'} hidden={statusBarHidden} />

    {!hideHelperViews && (
      <View
        style={{
          width: '100%',
          height: '50%',
          backgroundColor: '#ffffff',
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          zIndex: -1,
        }}
      />
    )}

    {children}
  </SafeAreaView>
);

export default Layout;
