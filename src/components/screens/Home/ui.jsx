import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Layout from '../../widgets/Layout';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  text: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 40,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
});

const Home = () => {
  return (
    <Layout backgroundColor={'#ffffff'}>
      <View style={styles.view}>
        <View>
          <Text style={styles.text}>Home</Text>
        </View>
      </View>
    </Layout>
  );
};

export default Home;
