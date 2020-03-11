import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import UilHeart from '@iconscout/react-native-unicons/icons/uil-heart';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_SECONDARY } from '../../../constants';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const Policy = ({ navigation, vw, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    contentHeadline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(7),
      textAlign: 'center',
    },
    contentText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.5),
      textAlign: 'center',
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
    madeByText: {
      color: '#B0B0B1',
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(3.5),
      marginLeft: vw(2),
      marginRight: vw(2),
    },
    view: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      padding: vw(10),
      paddingTop: vw(5),
      width: '100%',
    },
    viewContent: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    viewMadeBy: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  });

  const goBack = () => navigation.dispatch(CommonActions.goBack());

  const visitKreativzirkel = () =>
    Linking.openURL('https://www.kreativzirkel.de/').catch((err) =>
      console.log('could not open https://www.kreativzirkel.de/', err)
    );

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <Header>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()} style={{ marginBottom: -vw(3), marginTop: -vw(3) }}>
            <UilArrowLeft size={vw(12)} color={'#000000'} />
          </TouchableOpacity>

          <Text style={styles.headerHeadline}>{__('policy-screen.header.headline')}</Text>
        </View>
      </Header>

      <View style={styles.view}>
        <View style={styles.viewContent}>
          <Text style={styles.contentHeadline}>{__('policy-screen.content.section-1.headline')}</Text>
          <Text style={styles.contentText}>{__('policy-screen.content.section-1.text')}</Text>
          <Text style={styles.contentHeadline}>{__('policy-screen.content.section-2.headline')}</Text>
          <Text style={styles.contentText}>{__('policy-screen.content.section-2.text')}</Text>
        </View>

        <View style={styles.viewMadeBy}>
          <TouchableOpacity onPress={() => visitKreativzirkel()} style={styles.viewMadeBy}>
            <Text style={styles.madeByText}>made with</Text>
            <UilHeart color={'#ed2828'} size={vw(5.5)} />
            <Text style={styles.madeByText}>by Kreativzirkel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Policy;
