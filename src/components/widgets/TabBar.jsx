import React from 'react';
import { StyleSheet, View } from 'react-native';
import withViewportUnits from '../../utils/withViewportUnits';

class TabBar extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    tabBar: {
      display: 'flex',
      flexDirection: 'row',
      height: this.props.vw(13.1),
      paddingLeft: this.props.vw(1.8),
      paddingRight: this.props.vw(1.8),
      paddingTop: this.props.vw(2.5),
      width: '100%',
    },
  });

  render() {
    return <View style={this.styles.tabBar}>{this.props.children}</View>;
  }
}

export default withViewportUnits(TabBar);
