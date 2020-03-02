import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 40,
  },
  view: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
});

const Share = () => {
  return (
    <View style={styles.view}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />

      <View>
        <Text style={styles.text}>Share</Text>
      </View>
    </View>
  );
};

export default Share;
