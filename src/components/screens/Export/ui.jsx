import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_SECONDARY } from '../../../constants';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const Export = ({ createExport, navigation, vw, getFontFamilyBold, getFontFamilyRegular, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    comingSoon: {
      color: '#b0b0b1',
      fontFamily: getFontFamilyBold(),
      fontSize: vw(7),
      textAlign: 'center',
    },
    contentHeadline: {
      fontFamily: getFontFamilyBold(),
      fontSize: vw(7),
      textAlign: 'center',
    },
    contentText: {
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(4.5),
      lineHeight: vw(7),
      textAlign: 'center',
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

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('export-screen.header.headline')} navigation={navigation} />

      <View style={styles.view}>
        <View style={styles.viewContent}>
          <Text style={styles.contentHeadline}>{__('export-screen.content.section-1.headline')}</Text>
          <Text style={styles.contentText}>{__('export-screen.content.section-1.text')}</Text>
          <Text style={styles.contentHeadline}>{__('export-screen.content.section-2.headline')}</Text>
          <Text style={styles.contentText}>{__('export-screen.content.section-2.text')}</Text>
          <TouchableOpacity onPress={() => createExport()}>
            <Text style={styles.comingSoon}>{__('export-screen.coming-soon')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Export;
