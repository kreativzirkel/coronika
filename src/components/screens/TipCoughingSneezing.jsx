import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import Header from '../widgets/Header';
import Layout from '../widgets/Layout';

const TipCoughingSneezing = ({ navigation, vw, __ }) => {
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
      justifyContent: 'space-between',
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
      paddingBottom: vw(10),
      width: '100%',
    },
    viewContent: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
    },
    viewContentList: {
      paddingBottom: vw(18),
      marginTop: vw(4),
    },
  });

  const steps = [
    __('tips.coughing-sneezing.list.item-1'),
    __('tips.coughing-sneezing.list.item-2'),
    __('tips.coughing-sneezing.list.item-3'),
    __('tips.coughing-sneezing.list.item-4'),
    __('tips.coughing-sneezing.list.item-5'),
  ];

  const goBack = () => navigation.dispatch(CommonActions.goBack());

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <Header>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()} style={{ marginBottom: -vw(3), marginTop: -vw(3) }}>
            <UilArrowLeft size={vw(12)} color={'#000000'} />
          </TouchableOpacity>

          <Text style={styles.headerHeadline}>{__('tips-screen.header.headline')}</Text>
        </View>
      </Header>

      <ScrollView style={styles.view}>
        <View style={styles.viewContent}>
          <Text style={styles.contentHeadline}>{__('tips.coughing-sneezing.headline')}</Text>
          <Text style={styles.contentText}>{__('tips.coughing-sneezing.text')}</Text>
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
      </ScrollView>
    </Layout>
  );
};

export default withI18n(withViewportUnits(TipCoughingSneezing));
