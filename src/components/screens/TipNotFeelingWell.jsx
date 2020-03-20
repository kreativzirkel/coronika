import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import Header, { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';
import moment from 'moment';

const TipNotFeelingWell = ({ navigation, vw, __ }) => {
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
    __('tips.not-feeling-well.list.item-1'),
    __('tips.not-feeling-well.list.item-2'),
    __('tips.not-feeling-well.list.item-3'),
    __('tips.not-feeling-well.list.item-4'),
  ];

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <ScrollView>
        <View style={styles.view}>
          <View style={styles.viewContent}>
            <Text style={styles.contentHeadline}>{__('tips.not-feeling-well.headline')}</Text>
            <Text style={styles.contentText}>{__('tips.not-feeling-well.text')}</Text>
          </View>

          <View style={{ ...styles.viewContent, ...styles.viewContentList }}>
            <Text style={styles.contentText}>{__('tips.not-feeling-well.list.intro')}</Text>

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
              onPress={() => Linking.openURL('https://www.who.int/health-topics/coronavirus').catch(() => {})}
              style={styles.viewSourcesButton}>
              <Text style={styles.viewSourcesText}>www.who.int</Text>
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

export default withI18n(withViewportUnits(TipNotFeelingWell));
