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

const Day = ({ contacts, locations, timestamp, deleteContactFromDay, deleteLocationFromDay, navigation, vw, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    buttonAdd: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: vw(7),
      marginTop: vw(7),
    },
    buttonAddIcon: {
      marginRight: vw(1.5),
    },
    buttonAddText: {
      color: COLOR_PRIMARY,
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(5.5),
    },
    header: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerHeadline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(5),
      textTransform: 'lowercase',
    },
    wrapperAddEntry: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      justifyContent: 'center',
    },
  });

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
          <TouchableOpacity onPress={() => goBack()} style={{ marginBottom: -vw(3), marginTop: -vw(3) }}>
            <UilArrowLeft size={vw(12)} color={'#000000'} />
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
        deleteLocationItem={(id, description, time) => deleteLocationFromDay(id, description, time)}
        hideCreateButton
        locations={locations}
      />

      <View style={styles.wrapperAddEntry}>
        <TouchableOpacity onPress={() => goToAddEntry()} style={styles.buttonAdd}>
          <UilPlus color={COLOR_PRIMARY} size={vw(6)} style={styles.buttonAddIcon} />
          <Text style={styles.buttonAddText}>{__('day-screen.entries.add')}</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Day;
