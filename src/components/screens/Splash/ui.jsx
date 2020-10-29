import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_PRIMARY } from '../../../constants';
import Layout from '../../widgets/Layout';

const Splash = ({ colors, colorScheme, fontFamilyBold, vw }) => {
  const statusBarStyle = colorScheme === 'dark' ? 'dark-content' : 'light-content';

  const styles = StyleSheet.create({
    text: {
      color: colors.TEXT_ALT,
      fontFamily: fontFamilyBold,
      fontSize: vw(12),
    },
    view: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
    },
  });

  return (
    <Layout backgroundColor={COLOR_PRIMARY} hideHelperViews statusBarStyle={statusBarStyle}>
      <View style={styles.view}>
        <Text style={styles.text}>coronika</Text>
      </View>
    </Layout>
  );
};

export default Splash;
