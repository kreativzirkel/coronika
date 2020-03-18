import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../../constants';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const Tips = ({ navigation, vw, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    contentText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.5),
    },
    header: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerHeadline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(5),
      marginLeft: 'auto',
      textTransform: 'lowercase',
    },
    tipText: {
      color: COLOR_PRIMARY,
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(5.2),
    },
    tipWrapper: {
      borderColor: '#707070',
      borderTopWidth: 1,
      paddingBottom: vw(4),
      paddingTop: vw(4),
      width: '100%',
    },
    tipWrapperFirst: {
      borderTopWidth: 0,
    },
    view: {
      backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'column',
      padding: vw(8),
      paddingBottom: vw(10),
      width: '100%',
    },
    viewContent: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
    },
    viewContentList: {
      marginBottom: vw(10),
      marginTop: vw(4),
    },
  });

  const tipsList = [
    {
      headline: __('tips.washing-hands.headline'),
      routeName: 'TipWashingHands',
    },
    {
      headline: __('tips.avoid-crowds-of-people.headline'),
      routeName: 'TipAvoidCrowdsOfPeople',
    },
    {
      headline: __('tips.mouthguard.headline'),
      routeName: 'TipMouthguard',
    },
    {
      headline: __('tips.coughing-sneezing.headline'),
      routeName: 'TipCoughingSneezing',
    },
    {
      headline: __('tips.not-feeling-well.headline'),
      routeName: 'TipNotFeelingWell',
    },
    {
      headline: __('tips.am-i-infected.headline'),
      routeName: 'TipAmIInfected',
    },
    {
      headline: __('tips.reliable-sources.headline'),
      routeName: 'TipReliableSources',
    },
  ];

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <Header>
        <Text style={styles.headerHeadline}>{__('tips-screen.header.headline')}</Text>
      </Header>

      <ScrollView style={styles.view}>
        <View style={styles.viewContent}>
          <Text style={styles.contentText}>{__('tips-screen.intro.text')}</Text>
        </View>

        <View style={{ ...styles.viewContent, ...styles.viewContentList }}>
          {tipsList.map(({ headline, routeName }, index) => (
            <View key={`tip-${index}`} style={{ ...styles.tipWrapper, ...(index === 0 && styles.tipWrapperFirst) }}>
              <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
                <Text style={styles.tipText}>{headline}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Tips;
