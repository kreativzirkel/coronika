import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_SECONDARY } from '../../../constants';
import EntriesTabsView from '../../partials/EntriesTabsView';
import Header, { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const AddEntry = ({ locations, persons, timestamp, addSelection, navigation, vw, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
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
  });

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <HeaderBack headline={__('add-entry-screen.header.headline')} navigation={navigation} />

      <EntriesTabsView
        allowSelection
        addSelection={(selection) => addSelection(selection, navigation)}
        locations={locations}
        persons={persons}
        timestamp={timestamp}
      />
    </Layout>
  );
};

export default AddEntry;
