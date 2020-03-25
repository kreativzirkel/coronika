import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLOR_SECONDARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';

const ListItemSeparator = ({ vw }) => {
  const styles = StyleSheet.create({
    viewLine: {
      backgroundColor: COLOR_SECONDARY,
      borderRadius: vw(2.3),
      height: vw(1),
      width: '50%',
    },
    viewWrapper: {
      alignItems: 'center',
      flex: 1,
      height: vw(12.8),
      justifyContent: 'center',
      marginTop: vw(2.3),
      paddingLeft: vw(2.5),
      paddingRight: vw(2.5),
      width: '100%',
    },
  });

  return (
    <View style={styles.viewWrapper}>
      <View style={styles.viewLine} />
    </View>
  );
};

export default memo(withViewportUnits(ListItemSeparator));
