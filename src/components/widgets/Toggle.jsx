import UilToggleOff from '@iconscout/react-native-unicons/icons/uil-toggle-off';
import UilToggleOn from '@iconscout/react-native-unicons/icons/uil-toggle-on';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';

const Toggle = ({ active, onPress, style, vw, isRTL }) => {
  const IconOn = ({ color, size }) =>
    isRTL ? <UilToggleOff color={color} size={size} /> : <UilToggleOn color={color} size={size} />;

  const IconOff = ({ color, size }) =>
    isRTL ? <UilToggleOn color={color} size={size} /> : <UilToggleOff color={color} size={size} />;

  const Icon = () =>
    active ? <IconOn color={COLOR_PRIMARY} size={size} /> : <IconOff color={'#B0B0B1'} size={size} />;

  const size = vw(10);

  const styles = StyleSheet.create({
    toggle: {
      height: size,
      width: size,
    },
  });

  return (
    <View style={{ ...styles.toggle, ...(style && style) }}>
      {onPress ? (
        <TouchableOpacity onPress={() => onPress()}>
          <Icon />
        </TouchableOpacity>
      ) : (
        <Icon />
      )}
    </View>
  );
};

export default memo(withViewportUnits(Toggle));
