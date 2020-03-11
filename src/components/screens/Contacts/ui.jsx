import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_SECONDARY } from '../../../constants';
import EntriesTabsView from '../../partials/EntriesTabsView';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const Contacts = ({ contacts, locations, deleteContact, deleteLocation, vw, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    headerHeadline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(5),
      marginLeft: 'auto',
      textTransform: 'lowercase',
    },
    view: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
    viewWrapper: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
  });

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <View style={styles.view}>
        <Header>
          <Text style={styles.headerHeadline}>{__('contacts-screen.header.headline')}</Text>
        </Header>

        <EntriesTabsView
          contacts={contacts}
          deleteContactItem={(id) => deleteContact(id)}
          deleteLocationItem={(id) => deleteLocation(id)}
          disableDeleteImportedContacts
          locations={locations}
        />
      </View>
    </Layout>
  );
};

export default Contacts;
