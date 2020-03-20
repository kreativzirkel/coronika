import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import Header, { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';

const TipReliableSources = ({ navigation, vw, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    contentHeadline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(7),
      marginBottom: vw(3),
    },
    contentText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.5),
      lineHeight: vw(7),
    },
    header: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: Platform.OS === 'ios' ? 'space-between' : 'flex-end',
    },
    headerHeadline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(5),
      marginLeft: 'auto',
      textTransform: 'lowercase',
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
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(4),
    },
    listItemText: {
      fontFamily: 'JetBrainsMono-Regular',
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
      marginTop: vw(4),
    },
    link: {
      marginTop: vw(3),
    },
    linkText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.5),
      lineHeight: vw(7),
      textDecorationLine: 'underline',
    },
  });

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <ScrollView>
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

export default withI18n(withViewportUnits(TipReliableSources));
