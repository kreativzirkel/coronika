import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import moment from 'moment';

const TipAmIInfected = ({ navigation, vw, __ }) => {
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
      marginTop: vw(2),
      lineHeight: vw(7),
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
    viewSources: {
      backgroundColor: COLOR_SECONDARY,
      borderRadius: vw(2.3),
      marginTop: vw(14),
      padding: vw(4),
    },
    viewSourcesHeadline: {
      color: '#B0B0B1',
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.5),
      lineHeight: vw(7),
    },
    viewSourcesText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(3.5),
      lineHeight: vw(5.5),
      textDecorationLine: 'underline',
    },
    viewSourcesButton: {
      marginTop: vw(2),
    },
    viewSourcesLastUpdated: {
      color: COLOR_PRIMARY,
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(3.5),
      lineHeight: vw(5.5),
      marginTop: vw(2.5),
    },
  });

  const steps = [
    __('tips.am-i-infected.list.item-1'),
    __('tips.am-i-infected.list.item-2'),
    __('tips.am-i-infected.list.item-3'),
  ];

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <ScrollView>
        <View style={styles.view}>
          <View style={styles.viewContent}>
            <Text style={styles.contentHeadline}>{__('tips.am-i-infected.headline')}</Text>
            <Text style={styles.contentText}>{__('tips.am-i-infected.text')}</Text>
          </View>

          <View style={{ ...styles.viewContent, ...styles.viewContentList }}>
            {steps.map((stepText, index) => (
              <View key={`tip-list-item-${index}`} style={styles.listItem}>
                <View style={styles.listItemNumber}>
                  <Text style={styles.listItemNumberText}>{index + 1}</Text>
                </View>

                <Text style={styles.listItemText}>{stepText}</Text>
              </View>
            ))}
          </View>

          <View style={styles.viewSources}>
            <Text style={styles.viewSourcesHeadline}>{__('tips.sources.headline')}</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.rki.de/SharedDocs/FAQ/NCOV2019/FAQ_Liste.html').catch(() => {})
              }
              style={styles.viewSourcesButton}>
              <Text style={styles.viewSourcesText}>www.rki.de</Text>
            </TouchableOpacity>
            <Text style={styles.viewSourcesLastUpdated}>
              {`${__('tips.sources.last-updated')} ${moment(1584489600000).format('L')}`}
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default withI18n(withViewportUnits(TipAmIInfected));
