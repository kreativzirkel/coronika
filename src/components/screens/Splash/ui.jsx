import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { COLOR_PRIMARY } from '../../../constants';
import Layout from '../../widgets/Layout';

const Splash = ({ colors, colorScheme, fontFamilyBold, fontFamilyRegular, vw, __ }) => {
  const statusBarStyle = colorScheme === 'dark' ? 'dark-content' : 'light-content';

  const styles = StyleSheet.create({
    logoSupport: {
      height: vw(20),
      width: vw(50),
    },
    text: {
      color: colors.TEXT_ALT,
      fontFamily: fontFamilyBold,
      fontSize: vw(12),
    },
    textSupport: {
      color: '#000000',
      fontFamily: fontFamilyRegular,
      fontSize: vw(3.2),
      lineHeight: vw(6.5),
    },
    view: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
    },
    viewSupport: {
      alignItems: 'center',
      bottom: 0,
      flex: 1,
      flexDirection: 'column',
      height: vw(40),
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      width: vw(100),
    },
  });

  return (
    <Layout backgroundColor={COLOR_PRIMARY} hideHelperViews statusBarStyle={statusBarStyle}>
      <View style={styles.view}>
        <Text style={styles.text}>coronika</Text>

        {Platform.OS === 'ios' && (
          <View style={styles.viewSupport}>
            <Text style={styles.textSupport}>{__('splash-screen.supported-by.headline').toLowerCase()}</Text>
            <Image
              resizeMode={'contain'}
              source={require('../../../assets/images/logo_bjoern-steiger-stiftung.png')}
              style={styles.logoSupport}
            />
          </View>
        )}
      </View>
    </Layout>
  );
};

export default Splash;
