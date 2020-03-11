import React from 'react';
import { StyleSheet, View } from 'react-native';
import withViewportUnits from '../../utils/withViewportUnits';

const Header = ({ children, vw }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      flexGrow: 0,
      flexShrink: 0,
      padding: vw(3.5),
      paddingBottom: vw(7),
      paddingTop: vw(5.5),
      width: '100%',
    },
  });

  return <View style={styles.header}>{children}</View>;
};

export default withViewportUnits(Header);
