import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_PRIMARY } from '../../../constants';
import Layout from '../../widgets/Layout';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 50,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
});

const Splash = () => {
  return (
    <Layout backgroundColor={COLOR_PRIMARY} statusBarHidden>
      <View style={styles.view}>
        <View>
          <Text style={styles.text}>coronika</Text>
        </View>
      </View>
    </Layout>
  );
};

export default Splash;
