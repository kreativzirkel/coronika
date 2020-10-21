import UilToggleOff from '@iconscout/react-native-unicons/icons/uil-toggle-off';
import UilToggleOn from '@iconscout/react-native-unicons/icons/uil-toggle-on';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';

class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.Icon = this.Icon.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.active !== this.props.active;
  }

  color = this.props.active ? COLOR_PRIMARY : '#B0B0B1';

  size = this.props.vw(10);

  styles = StyleSheet.create({
    toggle: {
      height: this.size,
      width: this.size,
    },
  });

  IconOnComponent = this.props.isRTL ? UilToggleOff : UilToggleOn;

  IconOffComponent = this.props.isRTL ? UilToggleOn : UilToggleOff;

  IconComponent = this.props.active ? this.IconOnComponent : this.IconOffComponent;

  Icon() {
    const Icon = this.IconComponent;

    return <Icon color={this.color} size={this.size} />;
  }

  render() {
    const { onPress, style } = this.props;

    return (
      <View style={{ ...this.styles.toggle, ...(style && style) }}>
        {onPress ? (
          <TouchableOpacity onPress={onPress}>
            <this.Icon />
          </TouchableOpacity>
        ) : (
          <this.Icon />
        )}
      </View>
    );
  }
}

export default withViewportUnits(Toggle);
