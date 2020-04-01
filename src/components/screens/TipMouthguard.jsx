import moment from 'moment';
import React, { memo } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import CollapsibleBox from '../widgets/CollapsibleBox';
import { HeaderBack } from '../widgets/Header';
import Layout from '../widgets/Layout';

const TipMouthguard = ({ navigation, vw, getFontFamilyBold, getFontFamilyRegular, __ }) => {
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
    contentTextParagraph: {
      marginTop: vw(3),
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
    viewSources: {
      marginTop: vw(14),
    },
    viewSourcesText: {
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(3.5),
      lineHeight: vw(5.5),
      textDecorationLine: 'underline',
    },
    viewSourcesButton: {
      marginTop: vw(2),
    },
    viewSourcesLastUpdated: {
      color: COLOR_PRIMARY,
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(3.5),
      lineHeight: vw(5.5),
      marginTop: vw(2.5),
    },
  });

  const steps = [
    __('tips.mouthguard.list.item-1'),
    __('tips.mouthguard.list.item-2'),
    __('tips.mouthguard.list.item-3'),
    __('tips.mouthguard.list.item-4'),
  ];

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('tips-screen.header.headline')} navigation={navigation} />

      <ScrollView>
        <View style={styles.view}>
          <View style={styles.viewContent}>
            <Text style={styles.contentHeadline}>{__('tips.mouthguard.headline')}</Text>
            <Text style={styles.contentText}>{__('tips.mouthguard.text-1')}</Text>
            <Text style={{ ...styles.contentText, ...styles.contentTextParagraph }}>
              {__('tips.mouthguard.text-2')}
            </Text>
          </View>

          <View style={{ ...styles.viewContent, ...styles.viewContentList }}>
            <Text style={styles.contentText}>{__('tips.mouthguard.list.intro')}</Text>

            {steps.map((stepText, index) => (
              <View key={`tip-list-item-${index}`} style={styles.listItem}>
                <View style={styles.listItemNumber}>
                  <Text style={styles.listItemNumberText}>{index + 1}</Text>
                </View>

                <Text style={styles.listItemText}>{stepText}</Text>
              </View>
            ))}
          </View>

          <CollapsibleBox headline={__('tips.sources.headline')} style={styles.viewSources}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.rki.de/SharedDocs/FAQ/NCOV2019/FAQ_Liste.html').catch(() => {})
              }
              style={styles.viewSourcesButton}>
              <Text style={styles.viewSourcesText}>www.rki.de</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks.html'
                ).catch(() => {})
              }
              style={styles.viewSourcesButton}>
              <Text style={styles.viewSourcesText}>www.canada.ca</Text>
            </TouchableOpacity>
            <Text style={styles.viewSourcesLastUpdated}>
              {`${__('tips.sources.last-updated')} ${moment(1584489600000).format('L')}`}
            </Text>
          </CollapsibleBox>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default memo(withI18n(withViewportUnits(TipMouthguard)));
