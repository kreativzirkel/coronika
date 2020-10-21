import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import UilArrowRight from '@iconscout/react-native-unicons/icons/uil-arrow-right';
import UilHeart from '@iconscout/react-native-unicons/icons/uil-heart';
import React, { memo } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { version } from '../../config';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  sendFeedback() {
    Linking.openURL('mailto:info@kreativzirkel.de?subject=Coronika').catch(() => {});
  }

  visitKreativzirkel() {
    Linking.openURL('https://www.kreativzirkel.de/').catch(() => {});
  }

  styles = StyleSheet.create({
    contentText: {
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(4.5),
      lineHeight: this.props.vw(7),
    },
    feedbackButton: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.getFontFamilyBold(),
      fontSize: this.props.vw(7),
      textAlign: 'center',
    },
    madeByButton: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    madeByText: {
      color: '#909091',
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(3.5),
      marginLeft: this.props.vw(2),
      marginRight: this.props.vw(2),
    },
    menuItemIcon: {
      marginBottom: -this.props.vw(3),
      marginRight: -this.props.vw(2),
      marginTop: -this.props.vw(3),
    },
    menuItemText: {
      color: '#000000',
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(4.2),
    },
    menuItemTextWrapper: {
      width: '85%',
    },
    menuItemWrapper: {
      alignItems: 'center',
      backgroundColor: COLOR_SECONDARY,
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: this.props.vw(2.3),
      padding: this.props.vw(3),
      paddingBottom: this.props.vw(3.8),
      paddingTop: this.props.vw(3.8),
    },
    view: {
      backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: this.props.vw(2.5),
      width: '100%',
    },
    viewInner: {
      flex: 1,
      width: '100%',
    },
    viewBottom: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: this.props.vw(5),
      width: '100%',
    },
    viewContent: {
      flexDirection: 'column',
      width: '100%',
    },
    viewContentList: {
      marginBottom: this.props.vw(10),
      marginTop: this.props.vw(4),
    },
    viewContentText: {
      paddingLeft: this.props.vw(2.5),
      paddingRight: this.props.vw(2.5),
      paddingTop: this.props.vw(2.5),
    },
    viewMadeBy: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: this.props.vw(3),
      width: '100%',
    },
    viewMadeByBottom: {
      flexDirection: this.props.isRTL ? 'row-reverse' : 'row',
    },
  });

  render() {
    const { navigation, vw, isRTL, __ } = this.props;

    const menuItems = [
      {
        headline: __('about-screen.header.headline'),
        routeName: 'About',
      },
      {
        headline: __('settings-screen.header.headline'),
        routeName: 'Settings',
      },
      {
        headline: __('legal-screen.header.headline'),
        routeName: 'Legal',
      },
    ];

    return (
      <Layout backgroundColor={COLOR_SECONDARY}>
        <HeaderBack headline={__('menu-screen.header.headline')} navigation={navigation} />

        <View style={this.styles.view}>
          <View style={this.styles.viewInner}>
            <View style={{ ...this.styles.viewContent, ...this.styles.viewContentText }}>
              <Text style={this.styles.contentText}>{__('menu-screen.intro.text')}</Text>
            </View>

            <View style={{ ...this.styles.viewContent, ...this.styles.viewContentList }}>
              {menuItems.map(({ headline, routeName }, index) => (
                <TouchableOpacity
                  key={`menu-item-${index}`}
                  onPress={() => navigation.navigate(routeName)}
                  style={this.styles.menuItemWrapper}>
                  <View style={this.styles.menuItemTextWrapper}>
                    <Text style={this.styles.menuItemText}>{headline}</Text>
                  </View>

                  <View style={this.styles.menuItemIcon}>
                    {isRTL ? (
                      <UilArrowLeft size={vw(11)} color={COLOR_PRIMARY} />
                    ) : (
                      <UilArrowRight size={vw(11)} color={COLOR_PRIMARY} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={this.styles.viewBottom}>
            <View style={this.styles.viewMadeBy}>
              <TouchableOpacity onPress={this.visitKreativzirkel} style={this.styles.madeByButton}>
                <Text style={this.styles.madeByText}>Coronika version {version} made</Text>
                <View style={{ ...this.styles.viewMadeBy, ...this.styles.viewMadeByBottom }}>
                  <Text style={this.styles.madeByText}>with</Text>
                  <UilHeart color={'#ed2828'} size={vw(5.5)} />
                  <Text style={this.styles.madeByText}>by Kreativzirkel</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={this.sendFeedback}>
              <Text style={this.styles.feedbackButton}>{__('menu-screen.button.send-feedback')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    );
  }
}

export default memo(withI18n(withViewportUnits(Menu)));
