import UilAngleDown from '@iconscout/react-native-unicons/icons/uil-angle-down';
import UilAngleRight from '@iconscout/react-native-unicons/icons/uil-angle-right';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';

class CollapsibleBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  toggle() {
    const { open } = this.state;

    this.setState({ open: !open });
  }

  render() {
    const { children, headline, style, vw } = this.props;
    const { open } = this.state;

    const styles = StyleSheet.create({
      content: {},
      header: {
        flexDirection: 'row',
      },
      headerButton: {
        flexDirection: 'row',
      },
      headerIcon: {
        marginLeft: -vw(2),
      },
      headerHeadline: {
        color: '#B0B0B1',
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(4.5),
        lineHeight: vw(7),
        textTransform: 'lowercase',
      },
      view: {
        backgroundColor: COLOR_SECONDARY,
        borderRadius: vw(2.3),
        flexDirection: 'column',
        padding: vw(4),
      },
    });

    return (
      <View style={{ ...styles.view, ...(style && style) }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.toggle()} style={styles.headerButton}>
            {open ? (
              <UilAngleDown color={COLOR_PRIMARY} size={vw(7)} style={styles.headerIcon} />
            ) : (
              <UilAngleRight color={COLOR_PRIMARY} size={vw(7)} style={styles.headerIcon} />
            )}

            <Text style={styles.headerHeadline}>{headline}</Text>
          </TouchableOpacity>
        </View>
        {open && <View style={styles.content}>{children}</View>}
      </View>
    );
  }
}

export default withViewportUnits(CollapsibleBox);
