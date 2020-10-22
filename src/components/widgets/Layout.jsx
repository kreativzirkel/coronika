import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import withColorScheme from '../../utils/withColorScheme';

const styles = StyleSheet.create({
  helperView: {
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

const Layout = ({
  children,
  colorScheme,
  colors,
  backgroundColor,
  hideHelperViews = false,
  statusBarHidden = false,
  statusBarStyle,
}) => {
  const backgroundColorValue = backgroundColor || colors.SECONDARY;
  const statusBarStyleValue = statusBarStyle || (colorScheme === 'dark' ? 'light-content' : 'dark-content');

  return (
    <SafeAreaView style={{ ...styles.safeAreaView, backgroundColor: backgroundColorValue }}>
      <StatusBar
        animated={false}
        backgroundColor={backgroundColorValue}
        barStyle={statusBarStyleValue}
        hidden={statusBarHidden}
      />

      {!hideHelperViews && <View style={{ ...styles.helperView, backgroundColor: colors.BACKGROUND }} />}

      {children}
    </SafeAreaView>
  );
};

export default withColorScheme(Layout);
