import UilToggleOff from '@iconscout/react-native-unicons/icons/uil-toggle-off';
import UilToggleOn from '@iconscout/react-native-unicons/icons/uil-toggle-on';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';

class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.Icon = this.Icon.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.active !== this.props.active;
  }

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
    const { colors } = this.props;
    const Icon = this.IconComponent;

    return <Icon color={this.props.active ? COLOR_PRIMARY : colors.GRAY_3} size={this.size} />;
  }

  onPress() {
    if (this.props.onPress) this.props.onPress();
  }

  render() {
    const { style } = this.props;

    return (
      <View style={{ ...this.styles.toggle, ...(style && style) }}>
        <TouchableOpacity onPress={this.onPress}>
          <this.Icon />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withColorScheme(withViewportUnits(Toggle));
