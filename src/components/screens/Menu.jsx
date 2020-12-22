import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import UilArrowRight from '@iconscout/react-native-unicons/icons/uil-arrow-right';
import UilHeart from '@iconscout/react-native-unicons/icons/uil-heart';
import React from 'react';
import { Image, Linking, Platform, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { version } from '../../config';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';

const onShare = async (message) => {
  try {
    const result = await Share.share({
      message,
      title: 'coronika',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    // error
  }
};

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.onPressMenuItem = this.onPressMenuItem.bind(this);
    this.shareApp = this.shareApp.bind(this);
  }

  sendFeedback() {
    Linking.openURL('mailto:info@coronika.app?subject=Feedback Coronika').catch(() => {});
  }

  visitKreativzirkel() {
    Linking.openURL('https://www.kreativzirkel.de/').catch(() => {});
  }

  shareApp() {
    onShare(this.props.__('app.share.message'));
  }

  onPressMenuItem(routeName) {
    switch (routeName) {
      case 'FAQ':
        Linking.openURL('https://www.coronika.app/faqs').catch(() => {});
        break;
      case 'Share':
        this.shareApp();
        break;
      case 'Website':
        Linking.openURL('https://www.coronika.app/').catch(() => {});
        break;
      default:
        this.props.navigation.navigate(routeName);
    }
  }

  styles = StyleSheet.create({
    contentText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
      lineHeight: this.props.vw(6),
    },
    feedbackButton: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(5.5),
      textAlign: 'center',
      textTransform: 'lowercase',
    },
    logoFoundation: {
      height: this.props.vw(20),
      width: this.props.vw(50),
    },
    madeByButton: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    madeByText: {
      color: '#909091',
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(3.5),
      marginLeft: this.props.vw(2),
      marginRight: this.props.vw(2),
      textTransform: 'lowercase',
    },
    menuItemIcon: {
      marginBottom: -this.props.vw(3),
      marginRight: -this.props.vw(2),
      marginTop: -this.props.vw(3),
    },
    menuItemText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
      textTransform: 'lowercase',
    },
    menuItemTextWrapper: {
      width: '85%',
    },
    menuItemWrapper: {
      alignItems: 'center',
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: this.props.vw(2.3),
      padding: this.props.vw(3),
    },
    view: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: this.props.vw(2.5),
      paddingBottom: this.props.vw(1),
      paddingTop: 0,
      width: '100%',
    },
    viewInner: {
      flex: 1,
      width: '100%',
    },
    viewInnerContent: {
      height: '100%',
    },
    viewBottom: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingBottom: this.props.vw(3),
      paddingTop: this.props.vw(3),
      width: '100%',
    },
    viewContent: {
      flexDirection: 'column',
      width: '100%',
    },
    viewContentText: {
      paddingLeft: this.props.vw(2.5),
      paddingRight: this.props.vw(2.5),
      paddingTop: this.props.vw(2.5),
    },
    viewFoundation: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      height: this.props.vw(20),
      justifyContent: 'center',
      marginTop: this.props.vw(2.5),
      width: '100%',
    },
    viewMadeBy: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: this.props.vw(1),
      width: '100%',
    },
    viewMadeByBottom: {
      flexDirection: this.props.isRTL ? 'row-reverse' : 'row',
    },
  });

  render() {
    const { colors, colorScheme, navigation, vw, isRTL, __ } = this.props;

    const styles = {
      ...this.styles,
      contentText: {
        ...this.styles.contentText,
        color: colors.TEXT,
      },
      menuItemText: {
        ...this.styles.menuItemText,
        color: colors.TEXT,
      },
      menuItemWrapper: {
        ...this.styles.menuItemWrapper,
        backgroundColor: colors.SECONDARY,
      },
      madeByText: {
        ...this.styles.madeByText,
        color: colors.GRAY_4,
      },
      view: {
        ...this.styles.view,
        backgroundColor: colors.BACKGROUND,
      },
      viewInnerContent: {
        ...this.styles.viewInnerContent,
        backgroundColor: colors.BACKGROUND,
      },
    };

    const menuItems = [
      {
        headline: __('update-hints-screen.header.headline'),
        routeName: 'UpdateHints',
      },
      {
        headline: __('about-screen.header.headline'),
        routeName: 'About',
      },
      {
        headline: __('ventilation-mode-screen.header.headline'),
        routeName: 'VentilationMode',
      },
      {
        headline: __('menu-screen.items.faq'),
        routeName: 'FAQ',
      },
      {
        headline: __('settings-screen.header.headline'),
        routeName: 'Settings',
      },
      {
        headline: __('legal-screen.header.headline'),
        routeName: 'Legal',
      },
      {
        headline: __('menu-screen.items.share'),
        routeName: 'Share',
      },
      {
        headline: __('menu-screen.items.website'),
        routeName: 'Website',
      },
      {
        headline: __('bjoern-steiger-stiftung-screen.header.headline'),
        routeName: 'BjoernSteigerFoundation',
        hidden: Platform.OS !== 'ios',
      },
    ];

    return (
      <Layout>
        <HeaderBack headline={__('menu-screen.header.headline')} navigation={navigation} />

        <View style={styles.view}>
          <View style={styles.viewInner}>
            <ScrollView style={styles.viewInnerContent}>
              <View style={styles.viewContent}>
                {menuItems
                  .filter(({ hidden }) => !hidden)
                  .map(({ headline, routeName }, index) => (
                    <TouchableOpacity
                      key={`menu-item-${index}`}
                      onPress={() => this.onPressMenuItem(routeName)}
                      style={styles.menuItemWrapper}>
                      <View style={styles.menuItemTextWrapper}>
                        <Text style={styles.menuItemText}>{headline}</Text>
                      </View>

                      <View style={styles.menuItemIcon}>
                        {isRTL ? (
                          <UilArrowLeft size={vw(9)} color={COLOR_PRIMARY} />
                        ) : (
                          <UilArrowRight size={vw(9)} color={COLOR_PRIMARY} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>

              {Platform.OS === 'ios' && (
                <View style={styles.viewFoundation}>
                  <TouchableOpacity onPress={() => navigation.navigate('BjoernSteigerFoundation')}>
                    <Image
                      resizeMode={'contain'}
                      source={
                        colorScheme === 'dark'
                          ? require('../../assets/images/logo_bjoern-steiger-stiftung_white.png')
                          : require('../../assets/images/logo_bjoern-steiger-stiftung.png')
                      }
                      style={styles.logoFoundation}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>

          <View style={styles.viewBottom}>
            <View style={styles.viewMadeBy}>
              <TouchableOpacity onPress={this.visitKreativzirkel} style={styles.madeByButton}>
                <Text style={styles.madeByText}>Coronika version {version} made</Text>
                <View style={{ ...styles.viewMadeBy, ...styles.viewMadeByBottom }}>
                  <Text style={styles.madeByText}>with</Text>
                  <UilHeart color={'#ed2828'} size={vw(5.5)} />
                  <Text style={styles.madeByText}>by Kreativzirkel</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={this.sendFeedback}>
              <Text style={styles.feedbackButton}>{__('menu-screen.button.send-feedback')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(Menu)));
