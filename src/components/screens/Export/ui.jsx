import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../../constants';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import UilFile from '@iconscout/react-native-unicons/icons/uil-file';

const Export = ({ isExporting, createExport, navigation, vw, getFontFamilyBold, getFontFamilyRegular, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: vw(7),
      marginTop: vw(7),
    },
    buttonIcon: {
      marginRight: vw(1.5),
    },
    buttonText: {
      color: COLOR_PRIMARY,
      fontFamily: getFontFamilyBold(),
      fontSize: vw(6),
      textAlign: 'center',
      textTransform: 'lowercase',
    },
    buttonTextDisabled: {
      color: '#b0b0b1',
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
          <TouchableOpacity disabled={isExporting} onPress={() => createExport()} style={styles.button}>
            <UilFile color={isExporting ? '#b0b0b1' : COLOR_PRIMARY} size={vw(7)} style={styles.buttonIcon} />
            <Text style={{ ...styles.buttonText, ...(isExporting && styles.buttonTextDisabled) }}>
              {__('export-screen.button.export')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Export;
