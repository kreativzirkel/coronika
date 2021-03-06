import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import UilArrowRight from '@iconscout/react-native-unicons/icons/uil-arrow-right';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';

class HeaderClass extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      flexGrow: 0,
      flexShrink: 0,
      padding: this.props.vw(3.5),
      paddingBottom: this.props.vw(7),
      paddingTop: this.props.vw(5.5),
      width: '100%',
    },
  });

  render() {
    return <View style={this.styles.header}>{this.props.children}</View>;
  }
}

const Header = withViewportUnits(HeaderClass);

class HeaderBackClass extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.headline !== this.props.headline;
  }

  styles = StyleSheet.create({
    header: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: Platform.OS === 'ios' ? 'space-between' : 'flex-end',
    },
    headerHeadline: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(5),
      marginLeft: 'auto',
      textAlign: 'right',
      textTransform: 'lowercase',
    },
    headerHeadlineIos: {
      paddingLeft: this.props.vw(12),
    },
    headerBackButton: {
      marginBottom: -this.props.vw(3),
      marginTop: -this.props.vw(3),
    },
  });

  goBack() {
    return this.props.navigation.dispatch(CommonActions.goBack());
  }

  render() {
    const { colors, headline, vw, isRTL } = this.props;

    return (
      <Header>
        <View style={this.styles.header}>
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={this.goBack} style={this.styles.headerBackButton}>
              {isRTL ? (
                <UilArrowRight size={vw(12)} color={colors.TEXT} />
              ) : (
                <UilArrowLeft size={vw(12)} color={colors.TEXT} />
              )}
            </TouchableOpacity>
          )}

          <Text
            style={{
              ...this.styles.headerHeadline,
              color: colors.TEXT,
              ...(Platform.OS === 'ios' && this.styles.headerHeadlineIos),
            }}>
            {headline}
          </Text>
        </View>
      </Header>
    );
  }
}

export const HeaderBack = withColorScheme(withI18n(withViewportUnits(HeaderBackClass)));

export default Header;
