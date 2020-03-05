import React from 'react';
import { StyleSheet, View } from 'react-native';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  header: {
    flexGrow: 0,
    flexShrink: 0,
    padding: 16,
    paddingBottom: 30,
    paddingTop: 24,
    width: '100%',
  },
});

const Header = ({ children }) => <View style={styles.header}>{children}</View>;

export default Header;
