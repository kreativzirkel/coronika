import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_SECONDARY } from '../../../constants';
import EntriesTabsView from '../../partials/EntriesTabsView';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const AddEntry = ({ contacts, locations, timestamp, addSelection, navigation, vw, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
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
  });

  const goBack = () => navigation.dispatch(CommonActions.goBack());

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <Header>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()} style={{ marginBottom: -vw(3), marginTop: -vw(3) }}>
            <UilArrowLeft size={vw(12)} color={'#000000'} />
          </TouchableOpacity>

          <Text style={styles.headerHeadline}>{__('add-entry-screen.header.headline')}</Text>
        </View>
      </Header>

      <EntriesTabsView
        allowSelection
        addSelection={(selection) => addSelection(selection, navigation)}
        contacts={contacts}
        locations={locations}
        timestamp={timestamp}
      />
    </Layout>
  );
};

export default AddEntry;
