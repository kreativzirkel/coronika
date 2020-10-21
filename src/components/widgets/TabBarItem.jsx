import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';

class TabBarItem extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.active !== this.props.active ||
      nextProps.counterVisible !== this.props.counterVisible ||
      nextProps.counter !== this.props.counter ||
      nextProps.label !== this.props.label
    );
  }

  styles = StyleSheet.create({
    tabBarItem: {
      alignItems: 'center',
      borderTopLeftRadius: this.props.vw(2.3),
      borderTopRightRadius: this.props.vw(2.3),
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: this.props.vw(0.8),
      marginRight: this.props.vw(0.8),
      maxWidth: '50%',
      height: '100%',
      padding: this.props.vw(2.5),
    },
    tabBarItemActive: {
      backgroundColor: '#ffffff',
    },
    tabBarItemInner: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    tabBarItemIcon: {
      marginRight: this.props.vw(1.5),
    },
    tabBarItemLabel: {
      color: '#000000',
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(3.8),
      textTransform: 'lowercase',
    },
    tabBarItemLabelActive: {
      color: COLOR_PRIMARY,
    },
    tabBarItemCounter: {
      alignSelf: 'flex-start',
      color: '#000000',
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(3.5),
      textTransform: 'lowercase',
      marginLeft: 3,
    },
    tabBarItemCounterActive: {
      color: COLOR_PRIMARY,
    },
  });

  onPress() {
    if (this.props.onPress) this.props.onPress();
  }

  render() {
    const { active, counter, counterVisible, icon: Icon, label, vw } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={{ ...this.styles.tabBarItem, ...(active && this.styles.tabBarItemActive) }}>
        <View style={this.styles.tabBarItemInner}>
          {Icon && (
            <Icon color={active ? COLOR_PRIMARY : '#000000'} size={vw(5.5)} style={this.styles.tabBarItemIcon} />
          )}
          <Text
            numberOfLines={1}
            style={{ ...this.styles.tabBarItemLabel, ...(active && this.styles.tabBarItemLabelActive) }}>
            {label}
          </Text>
          {counterVisible && (
            <Text style={{ ...this.styles.tabBarItemCounter, ...(active && this.styles.tabBarItemCounterActive) }}>
              {`(${counter})`}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default withI18n(withViewportUnits(TabBarItem));
