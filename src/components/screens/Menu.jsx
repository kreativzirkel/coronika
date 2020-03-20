import UilArrowRight from '@iconscout/react-native-unicons/icons/uil-arrow-right';
import UilHeart from '@iconscout/react-native-unicons/icons/uil-heart';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { version } from '../../config';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';

const Menu = ({ navigation, vw, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    contentText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.5),
      lineHeight: vw(7),
    },
    feedbackButton: {
      color: COLOR_PRIMARY,
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(7),
      textAlign: 'center',
    },
    madeByButton: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    madeByText: {
      color: '#909091',
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(3.5),
      marginLeft: vw(2),
      marginRight: vw(2),
    },
    menuItemIcon: {
      marginBottom: -vw(3),
      marginRight: -vw(2),
      marginTop: -vw(3),
    },
    menuItemText: {
      color: '#000000',
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.2),
    },
    menuItemTextWrapper: {
      width: '85%',
    },
    menuItemWrapper: {
      alignItems: 'center',
      backgroundColor: COLOR_SECONDARY,
      borderRadius: vw(2.3),
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: vw(2.3),
      padding: vw(3),
      paddingBottom: vw(3.8),
      paddingTop: vw(3.8),
    },
    view: {
      backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: vw(2.5),
      width: '100%',
    },
    viewBottom: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: vw(5),
      width: '100%',
    },
    viewContent: {
      flexDirection: 'column',
      width: '100%',
    },
    viewContentList: {
      marginBottom: vw(10),
      marginTop: vw(4),
    },
    viewContentText: {
      paddingLeft: vw(2.5),
      paddingRight: vw(2.5),
      paddingTop: vw(2.5),
    },
    viewMadeBy: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: vw(3),
      width: '100%',
    },
  });

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

  const sendFeedback = () => Linking.openURL('mailto:info@kreativzirkel.de?subject=Coronika').catch(() => {});

  const visitKreativzirkel = () => Linking.openURL('https://www.kreativzirkel.de/').catch(() => {});

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('menu-screen.header.headline')} navigation={navigation} />

      <View style={styles.view}>
        <View style={{ width: '100%', flex: 1 }}>
          <View style={{ ...styles.viewContent, ...styles.viewContentText }}>
            <Text style={styles.contentText}>{__('menu-screen.intro.text')}</Text>
          </View>

          <View style={{ ...styles.viewContent, ...styles.viewContentList }}>
            {menuItems.map(({ headline, routeName }, index) => (
              <TouchableOpacity
                key={`menu-item-${index}`}
                onPress={() => navigation.navigate(routeName)}
                style={styles.menuItemWrapper}>
                <View style={styles.menuItemTextWrapper}>
                  <Text style={styles.menuItemText}>{headline}</Text>
                </View>

                <View style={styles.menuItemIcon}>
                  <UilArrowRight size={vw(11)} color={COLOR_PRIMARY} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.viewBottom}>
          <View style={styles.viewMadeBy}>
            <TouchableOpacity onPress={() => visitKreativzirkel()} style={styles.madeByButton}>
              <Text style={styles.madeByText}>Coronika version {version} made</Text>
              <View style={styles.viewMadeBy}>
                <Text style={styles.madeByText}>with</Text>
                <UilHeart color={'#ed2828'} size={vw(5.5)} />
                <Text style={styles.madeByText}>by Kreativzirkel</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => sendFeedback()}>
            <Text style={styles.feedbackButton}>{__('menu-screen.button.send-feedback')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default withI18n(withViewportUnits(Menu));
