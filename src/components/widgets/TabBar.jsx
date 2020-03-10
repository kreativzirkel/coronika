import React from 'react';
import { StyleSheet, View } from 'react-native';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 10,
    width: '100%',
  },
});

const TabBar = ({ children }) => <View style={styles.tabBar}>{children}</View>;

export default TabBar;
