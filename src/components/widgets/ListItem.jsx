import UilTrashAlt from '@iconscout/react-native-unicons/icons/uil-trash-alt';
import React, { Fragment } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import withViewportUnits from '../../utils/withViewportUnits';

const renderRightActions = (progress, deleteItem, vw) => {
  const linear = progress.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6],
    outputRange: [0, 1, 1, 1, 1, 1, 1],
  });

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    rightAction: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: vw(2.3),
      paddingRight: vw(2.3),
    },
  });

  return (
    <View style={{ width: 60, flexDirection: 'row' }}>
      <Animated.View style={{ flex: 1, opacity: linear, transform: [{ translateX }, { scale: linear }] }}>
        <TouchableOpacity style={styles.rightAction} onPress={() => deleteItem()}>
          <UilTrashAlt color={'#ff0000'} size={vw(7)} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const ListItem = React.forwardRef(({ allowDelete, children, deleteItem, vw }, ref) => {
  return allowDelete ? (
    <Swipeable
      friction={1.5}
      ref={ref}
      renderRightActions={(progress) => renderRightActions(progress, deleteItem, vw)}
      rightTreshold={40}>
      {children}
    </Swipeable>
  ) : (
    <Fragment>{children}</Fragment>
  );
});

export default withViewportUnits(ListItem);
