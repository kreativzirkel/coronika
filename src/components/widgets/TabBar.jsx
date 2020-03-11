import React from 'react';
import { StyleSheet, View } from 'react-native';
import withViewportUnits from '../../utils/withViewportUnits';

const TabBar = withViewportUnits(({ children, vw }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    tabBar: {
      display: 'flex',
      flexDirection: 'row',
      height: vw(14),
      paddingLeft: vw(1.8),
      paddingRight: vw(1.8),
      paddingTop: vw(2.5),
      width: '100%',
    },
  });

  return <View style={styles.tabBar}>{children}</View>;
});

export default TabBar;
