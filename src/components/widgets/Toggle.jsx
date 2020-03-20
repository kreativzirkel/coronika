import UilToggleOff from '@iconscout/react-native-unicons/icons/uil-toggle-off';
import UilToggleOn from '@iconscout/react-native-unicons/icons/uil-toggle-on';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';

const Toggle = ({ active, onPress, style, vw }) => {
  const size = vw(10);

  const styles = StyleSheet.create({
    toggle: {
      height: size,
      width: size,
    },
  });

  const Icon = () =>
    active ? <UilToggleOn color={COLOR_PRIMARY} size={size} /> : <UilToggleOff color={'#B0B0B1'} size={size} />;

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

export default withViewportUnits(Toggle);
