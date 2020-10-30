import UilAngleDown from '@iconscout/react-native-unicons/icons/uil-angle-down';
import UilAngleLeft from '@iconscout/react-native-unicons/icons/uil-angle-left';
import UilAngleRight from '@iconscout/react-native-unicons/icons/uil-angle-right';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';

class CollapsibleBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { open } = this.state;

    this.setState({ open: !open });
  }

  styles = StyleSheet.create({
    content: {},
    header: {
      flexDirection: 'row',
    },
    headerButton: {
      flexDirection: 'row',
    },
    headerIcon: {
      marginLeft: -this.props.vw(2),
    },
    headerHeadline: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
      lineHeight: this.props.vw(6.5),
      textTransform: 'lowercase',
    },
    view: {
      borderRadius: this.props.vw(2.3),
      flexDirection: 'column',
      padding: this.props.vw(4),
    },
  });

  render() {
    const { children, colors, headline, style, vw, isRTL } = this.props;
    const { open } = this.state;

    const styles = {
      ...this.styles,
      headerHeadline: {
        ...this.styles.headerHeadline,
        color: colors.GRAY_3,
      },
      view: {
        ...this.styles.view,
        backgroundColor: colors.SECONDARY,
      },
    };

    return (
      <View style={{ ...styles.view, ...(style && style) }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.toggle} style={styles.headerButton}>
            {open ? (
              <UilAngleDown color={COLOR_PRIMARY} size={vw(7)} style={styles.headerIcon} />
            ) : isRTL ? (
              <UilAngleLeft color={COLOR_PRIMARY} size={vw(7)} style={styles.headerIcon} />
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

export default withColorScheme(withI18n(withViewportUnits(CollapsibleBox)));
