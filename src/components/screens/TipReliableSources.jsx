import React, { memo } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';

const TipReliableSources = ({ navigation, vw, getFontFamilyBold, getFontFamilyRegular, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    contentHeadline: {
      fontFamily: getFontFamilyBold(),
      fontSize: vw(7),
      marginBottom: vw(3),
    },
    contentText: {
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(4.5),
      lineHeight: vw(7),
    },
    listItem: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginTop: vw(4),
      width: vw(70),
    },
    listItemNumber: {
      alignItems: 'center',
      backgroundColor: COLOR_PRIMARY,
      borderRadius: 50,
      height: vw(10),
      justifyContent: 'center',
      marginRight: vw(6),
      width: vw(10),
    },
    listItemNumberText: {
      color: '#ffffff',
      fontFamily: getFontFamilyBold(),
      fontSize: vw(4),
    },
    listItemText: {
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(4.5),
      lineHeight: vw(7),
      marginTop: vw(2),
    },
    view: {
      backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'column',
      padding: vw(8),
      width: '100%',
    },
    viewContent: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
    },
    viewContentList: {
      alignItems: 'flex-start',
      marginTop: vw(4),
    },
    link: {
      marginTop: vw(3),
    },
    linkText: {
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(4.5),
      lineHeight: vw(7),
      textDecorationLine: 'underline',
    },
  });

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <ScrollView style={{ backgroundColor: '#ffffff', height: '100%' }}>
        <View style={styles.view}>
          <View style={styles.viewContent}>
            <Text style={styles.contentHeadline}>{__('tips.reliable-sources.headline')}</Text>
            <Text style={styles.contentText}>{__('tips.reliable-sources.text')}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.rki.de/').catch(() => {})}
              style={styles.link}>
              <Text style={styles.linkText}>www.rki.de</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.bzga.de/').catch(() => {})}
              style={styles.link}>
              <Text style={styles.linkText}>www.bzga.de</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.mags.nrw/').catch(() => {})}
              style={styles.link}>
              <Text style={styles.linkText}>www.mags.nrw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default memo(withI18n(withViewportUnits(TipReliableSources)));
