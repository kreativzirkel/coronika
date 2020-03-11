import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';

const TabBarItem = withViewportUnits(({ active, counter, counterVisible, icon: Icon, label, onPress, vw }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    tabBarItem: {
      alignItems: 'center',
      borderTopLeftRadius: vw(2.3),
      borderTopRightRadius: vw(2.3),
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: vw(0.8),
      marginRight: vw(0.8),
      maxWidth: '50%',
      height: '100%',
      padding: vw(2.5),
    },
    tabBarItemActive: {
      backgroundColor: '#ffffff',
    },
    tabBarItemButton: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    tabBarItemIcon: {
      marginRight: vw(1.5),
    },
    tabBarItemLabel: {
      color: '#000000',
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(3.8),
      textTransform: 'lowercase',
    },
    tabBarItemLabelActive: {
      color: COLOR_PRIMARY,
    },
    tabBarItemCounter: {
      alignSelf: 'flex-start',
      color: '#000000',
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(3.5),
      textTransform: 'lowercase',
      marginLeft: 3,
    },
    tabBarItemCounterActive: {
      color: COLOR_PRIMARY,
    },
  });

  return (
    <View style={{ ...styles.tabBarItem, ...(active && styles.tabBarItemActive) }}>
      <TouchableOpacity onPress={() => onPress && onPress()} style={styles.tabBarItemButton}>
        {Icon && <Icon color={active ? COLOR_PRIMARY : '#000000'} size={vw(5.5)} style={styles.tabBarItemIcon} />}
        <Text numberOfLines={1} style={{ ...styles.tabBarItemLabel, ...(active && styles.tabBarItemLabelActive) }}>
          {label}
        </Text>
        {counterVisible && (
          <Text style={{ ...styles.tabBarItemCounter, ...(active && styles.tabBarItemCounterActive) }}>
            {`(${counter})`}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
});

export default TabBarItem;
