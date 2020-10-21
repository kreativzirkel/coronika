import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLOR_SECONDARY } from '../../constants';
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
      backgroundColor: COLOR_SECONDARY,
      borderRadius: this.props.vw(2.3),
      height: this.props.vw(1),
      width: '50%',
    },
    viewWrapper: {
      alignItems: 'center',
      flex: 1,
      height: this.props.vw(12.8),
      justifyContent: 'center',
      marginTop: this.props.vw(2.3),
      paddingLeft: this.props.vw(2.5),
      paddingRight: this.props.vw(2.5),
      width: '100%',
    },
  });

  render() {
    return (
      <View style={this.styles.viewWrapper}>
        <View style={this.styles.viewLine} />
      </View>
    );
  }
}

export default withViewportUnits(ListItemSeparator);
