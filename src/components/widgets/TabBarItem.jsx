import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
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
      //
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
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(3.6),
      textTransform: 'lowercase',
    },
    tabBarItemLabelActive: {
      color: COLOR_PRIMARY,
    },
    tabBarItemCounter: {
      alignSelf: 'flex-start',
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(3.3),
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
    const { active, colors, counter, counterVisible, icon: Icon, label, vw } = this.props;

    const styles = {
      ...this.styles,
      tabBarItemActive: {
        ...this.styles.tabBarItemActive,
        backgroundColor: colors.BACKGROUND,
      },
      tabBarItemLabel: {
        ...this.styles.tabBarItemLabel,
        color: colors.TEXT,
      },
      tabBarItemCounter: {
        ...this.styles.tabBarItemCounter,
        color: colors.TEXT,
      },
    };

    return (
      <TouchableOpacity onPress={this.onPress} style={{ ...styles.tabBarItem, ...(active && styles.tabBarItemActive) }}>
        <View style={styles.tabBarItemInner}>
          {Icon && <Icon color={active ? COLOR_PRIMARY : colors.TEXT} size={vw(4.8)} style={styles.tabBarItemIcon} />}
          <Text numberOfLines={1} style={{ ...styles.tabBarItemLabel, ...(active && styles.tabBarItemLabelActive) }}>
            {label}
          </Text>
          {counterVisible && (
            <Text style={{ ...styles.tabBarItemCounter, ...(active && styles.tabBarItemCounterActive) }}>
              {`(${counter})`}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(TabBarItem)));
