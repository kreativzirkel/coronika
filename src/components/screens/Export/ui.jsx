import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import UilHeart from '@iconscout/react-native-unicons/icons/uil-heart';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_SECONDARY } from '../../../constants';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const Export = ({ navigation, vw, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    comingSoon: {
      color: '#b0b0b1',
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(7),
      textAlign: 'center',
    },
    contentHeadline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(7),
      textAlign: 'center',
    },
    contentText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.5),
      lineHeight: vw(7),
      textAlign: 'center',
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
    view: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      padding: vw(8),
      paddingTop: vw(2),
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
  });

  const goBack = () => navigation.dispatch(CommonActions.goBack());

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <Header>
        <View style={styles.header}>
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={() => goBack()} style={{ marginBottom: -vw(3), marginTop: -vw(3) }}>
              <UilArrowLeft size={vw(12)} color={'#000000'} />
            </TouchableOpacity>
          )}

          <Text style={styles.headerHeadline}>{__('export-screen.header.headline')}</Text>
        </View>
      </Header>

      <View style={styles.view}>
        <View style={styles.viewContent}>
          <Text style={styles.contentHeadline}>{__('export-screen.content.section-1.headline')}</Text>
          <Text style={styles.contentText}>{__('export-screen.content.section-1.text')}</Text>
          <Text style={styles.contentHeadline}>{__('export-screen.content.section-2.headline')}</Text>
          <Text style={styles.contentText}>{__('export-screen.content.section-2.text')}</Text>
          <Text style={styles.comingSoon}>{__('export-screen.coming-soon')}</Text>
        </View>
      </View>
    </Layout>
  );
};

export default Export;
