import UilArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DayOverview from '../../widgets/DayOverview';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import EntriesTabsView from '../../partials/EntriesTabsView';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import { COLOR_PRIMARY } from '../../../constants';

const Day = ({ locations, persons, timestamp, deleteLocationFromDay, deletePersonFromDay, navigation, vw, __ }) => {
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
      textTransform: 'lowercase',
    },
    dayOverviewWrapper: {
      marginBottom: vw(0.7),
    },
    header: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: Platform.OS === 'ios' ? 'space-between' : 'flex-end',
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
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={() => goBack()} style={{ marginBottom: -vw(3), marginTop: -vw(3) }}>
              <UilArrowLeft size={vw(12)} color={'#000000'} />
            </TouchableOpacity>
          )}

          <Text style={styles.headerHeadline}>{__('day-screen.header.headline')}</Text>
        </View>
      </Header>

      <View style={styles.dayOverviewWrapper}>
        <DayOverview isDark locations={locations.length} persons={persons.length} timestamp={timestamp} today={today} />
      </View>

      <EntriesTabsView
        customLocationsEmptyText={__('day-screen.locations.empty')}
        customPersonsEmptyText={__('day-screen.persons.empty')}
        deletePersonItem={(id) => deletePersonFromDay(id)}
        deleteLocationItem={(id, description, time) => deleteLocationFromDay(id, description, time)}
        hideCreateButton
        locations={locations}
        persons={persons}
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
