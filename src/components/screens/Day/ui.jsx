import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../../constants';
import EntriesTabsView from '../../partials/EntriesTabsView';
import DayOverview from '../../widgets/DayOverview';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const Day = ({
  locations,
  persons,
  timestamp,
  deleteLocationFromDay,
  deletePersonFromDay,
  navigation,
  vw,
  getFontFamilyRegular,
  __,
}) => {
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
      fontFamily: getFontFamilyRegular(),
      fontSize: vw(5.5),
      textTransform: 'lowercase',
    },
    dayOverviewWrapper: {
      marginBottom: vw(0.7),
      width: '100%',
    },
    wrapperAddEntry: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      justifyContent: 'center',
    },
  });

  const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);

  const goToAddEntry = () => navigation.navigate('AddEntry');

  return (
    <Layout>
      <HeaderBack headline={__('day-screen.header.headline')} navigation={navigation} />

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
