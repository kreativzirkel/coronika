import UilFile from '@iconscout/react-native-unicons/icons/uil-file';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, DAYS_OVERVIEW } from '../../../constants';
import EntriesTabsView from '../../partials/EntriesTabsView';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import DayOverview from '../../widgets/DayOverview';
import moment from 'moment';

const Overview = ({ locations, persons, total, navigation, vw, __ }) => {
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
      width: '100%',
    },
    header: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerButton: {
      flexDirection: 'row',
    },
    headerButtonText: {
      color: '#555555',
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(3.8),
      marginLeft: vw(1),
      textTransform: 'lowercase',
    },
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

  const totalTimespan = moment(today).subtract(DAYS_OVERVIEW, 'days');

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <View style={styles.view}>
        <HeaderBack headline={__('overview-screen.header.headline')} navigation={navigation} />

        <View style={styles.dayOverviewWrapper}>
          <DayOverview
            isDark
            isTotal
            locations={total.locations}
            persons={total.persons}
            timestamp={totalTimespan.valueOf()}
            today={today}
          />
        </View>

        <EntriesTabsView
          customPersonsEmptyText={' '}
          customLocationsEmptyText={' '}
          disableDeleteImportedPersons
          hideCreateButton
          locations={locations}
          persons={persons}
          showCounter
        />

        <View style={styles.wrapperAddEntry}>
          <TouchableOpacity onPress={() => navigation.navigate('Export')} style={styles.buttonAdd}>
            <UilFile color={COLOR_PRIMARY} size={vw(6)} style={styles.buttonAddIcon} />
            <Text style={styles.buttonAddText}>{__('overview-screen.export.button')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Overview;
