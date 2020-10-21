import UilAngleDown from '@iconscout/react-native-unicons/icons/uil-angle-down';
import UilAngleLeft from '@iconscout/react-native-unicons/icons/uil-angle-left';
import UilAngleRight from '@iconscout/react-native-unicons/icons/uil-angle-right';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
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
      color: '#B0B0B1',
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(4.5),
      lineHeight: this.props.vw(7),
      textTransform: 'lowercase',
    },
    view: {
      backgroundColor: COLOR_SECONDARY,
      borderRadius: this.props.vw(2.3),
      flexDirection: 'column',
      padding: this.props.vw(4),
    },
  });

  render() {
    const { children, headline, style, vw, isRTL } = this.props;
    const { open } = this.state;

    return (
      <View style={{ ...this.styles.view, ...(style && style) }}>
        <View style={this.styles.header}>
          <TouchableOpacity onPress={this.toggle} style={this.styles.headerButton}>
            {open ? (
              <UilAngleDown color={COLOR_PRIMARY} size={vw(7)} style={this.styles.headerIcon} />
            ) : isRTL ? (
              <UilAngleLeft color={COLOR_PRIMARY} size={vw(7)} style={this.styles.headerIcon} />
            ) : (
              <UilAngleRight color={COLOR_PRIMARY} size={vw(7)} style={this.styles.headerIcon} />
            )}

            <Text style={this.styles.headerHeadline}>{headline}</Text>
          </TouchableOpacity>
        </View>
        {open && <View style={this.styles.content}>{children}</View>}
      </View>
    );
  }
}

export default withI18n(withViewportUnits(CollapsibleBox));
