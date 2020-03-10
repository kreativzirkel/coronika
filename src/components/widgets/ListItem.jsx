import UilTrashAlt from '@iconscout/react-native-unicons/icons/uil-trash-alt';
import React, { Fragment } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  rightAction: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    paddingRight: 8,
  },
});

const renderRightActions = (progress, deleteItem) => {
  let linear = progress.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6],
    outputRange: [0, 1, 1, 1, 1, 1, 1],
  });

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  return (
    <View style={{ width: 60, flexDirection: 'row' }}>
      <Animated.View style={{ flex: 1, opacity: linear, transform: [{ translateX }, { scale: linear }] }}>
        <TouchableOpacity style={styles.rightAction} onPress={() => deleteItem()}>
          <UilTrashAlt color={'#ff0000'} size={25} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const ListItem = ({ allowDelete, children, deleteItem }) => {
  return allowDelete ? (
    <Swipeable
      friction={1.5}
      renderRightActions={(progress) => renderRightActions(progress, deleteItem)}
      rightTreshold={40}>
      {children}
    </Swipeable>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

export default ListItem;
