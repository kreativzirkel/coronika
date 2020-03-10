import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DayOverview from '../../widgets/DayOverview';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import EntriesTabsView from '../../partials/EntriesTabsView';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import { COLOR_PRIMARY } from '../../../constants';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  buttonAdd: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 24,
  },
  buttonAddIcon: {
    marginRight: 5,
  },
  buttonAddText: {
    color: COLOR_PRIMARY,
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 24,
  },
  header: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerHeadline: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 18,
    textTransform: 'lowercase',
  },
  wrapperAddEntry: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
});

const Day = ({ contacts, locations, timestamp, deleteContactFromDay, navigation, __ }) => {
  const today = moment()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0);

  const goBack = () => navigation.dispatch(CommonActions.goBack());

  const goToAddEntry = () => navigation.navigate('AddEntry');

  return (
    <Layout>
      <Header>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()} style={{ marginBottom: -10, marginTop: -10 }}>
            <UilArrowLeft size={40} color={'#000000'} />
          </TouchableOpacity>

          <Text style={styles.headerHeadline}>{__('day-screen.header.headline')}</Text>
        </View>
      </Header>

      <DayOverview contacts={contacts.length} isDark locations={locations.length} timestamp={timestamp} today={today} />

      <EntriesTabsView
        contacts={contacts}
        customContactsEmptyText={__('day-screen.contacts.empty')}
        customLocationsEmptyText={__('day-screen.locations.empty')}
        deleteContactItem={(id) => deleteContactFromDay(id)}
        hideCreateButton
        locations={locations}
      />

      <View style={styles.wrapperAddEntry}>
        <TouchableOpacity onPress={() => goToAddEntry()} style={styles.buttonAdd}>
          <UilPlus color={COLOR_PRIMARY} size={30} style={styles.buttonAddIcon} />
          <Text style={styles.buttonAddText}>{__('day-screen.entries.add')}</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Day;
