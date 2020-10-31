import React from 'react';
import { StyleSheet, View } from 'react-native';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';

class ListItemSeparator extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  styles = StyleSheet.create({
    viewLine: {
      borderRadius: this.props.vw(2.3),
      height: this.props.vw(1),
      width: '50%',
    },
    viewWrapper: {
      alignItems: 'center',
      flex: 1,
      height: this.props.vw(11.3),
      justifyContent: 'center',
      marginTop: this.props.vw(2.3),
      paddingLeft: this.props.vw(2.5),
      paddingRight: this.props.vw(2.5),
      width: '100%',
    },
  });

  render() {
    const { colors, colorScheme, inverted } = this.props;

    const backgroundColor = inverted
      ? colorScheme === 'dark'
        ? colors.LIGHT.SECONDARY
        : colors.DARK.SECONDARY
      : colors.SECONDARY;

    return (
      <View style={this.styles.viewWrapper}>
        <View style={{ ...this.styles.viewLine, backgroundColor }} />
      </View>
    );
  }
}

export default withColorScheme(withViewportUnits(ListItemSeparator));
