import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  tabBarItem: {
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 4,
    maxWidth: '50%',
    height: '100%',
    padding: 10,
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
    marginRight: 5,
  },
  tabBarItemLabel: {
    color: '#000000',
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    textTransform: 'lowercase',
  },
  tabBarItemLabelActive: {
    color: COLOR_PRIMARY,
  },
  tabBarItemCounter: {
    alignSelf: 'flex-start',
    color: '#000000',
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 11,
    textTransform: 'lowercase',
    marginLeft: 3,
  },
  tabBarItemCounterActive: {
    color: COLOR_PRIMARY,
  },
});

const TabBarItem = ({ active, counter, counterVisible, icon: Icon, label, onPress }) => (
  <View style={{ ...styles.tabBarItem, ...(active && styles.tabBarItemActive) }}>
    <TouchableOpacity onPress={() => onPress && onPress()} style={styles.tabBarItemButton}>
      {Icon && <Icon color={active ? COLOR_PRIMARY : '#000000'} size={24} style={styles.tabBarItemIcon} />}
      <Text numberOfLines={1} style={{ ...styles.tabBarItemLabel, ...(active && styles.tabBarItemLabelActive) }}>{label}</Text>
      {counterVisible && (
        <Text style={{ ...styles.tabBarItemCounter, ...(active && styles.tabBarItemCounterActive) }}>
          {`(${counter})`}
        </Text>
      )}
    </TouchableOpacity>
  </View>
);

export default TabBarItem;
