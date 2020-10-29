import UilFile from '@iconscout/react-native-unicons/icons/uil-file';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, DAYS_OVERVIEW_MAX } from '../../../constants';
import EntriesTabsView from '../../partials/EntriesTabsView';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import DayOverview from '../../widgets/DayOverview';
import moment from 'moment';

const Overview = ({ colors, locations, persons, total, navigation, vw, fontFamilyBold, fontFamilyRegular, __ }) => {
  const styles = StyleSheet.create({
    buttonAdd: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: vw(7),
      marginTop: vw(7),
    },
    buttonAddDisabled: {
      opacity: 0.5,
    },
    buttonAddIcon: {
      marginRight: vw(1.5),
    },
    buttonAddText: {
      color: COLOR_PRIMARY,
      fontFamily: fontFamilyRegular,
      fontSize: vw(5.5),
      textTransform: 'lowercase',
    },
    buttonAddTextDisabled: {
      //
    },
    dayOverviewWrapper: {
      marginBottom: vw(0.7),
      width: '100%',
    },
    headerContent: {
      flex: 1,
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerHeadline: {
      alignSelf: 'flex-start',
      fontFamily: fontFamilyBold,
      fontSize: vw(5),
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
    wrapperAddEntry: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const exportButtonDisabled = total.locations === 0 && total.persons === 0;
  const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
  const totalTimespan = moment(today).subtract(DAYS_OVERVIEW_MAX, 'days');

  return (
    <Layout>
      <View style={styles.view}>
        <Header>
          <View style={styles.headerContent}>
            <Text style={{ ...styles.headerHeadline, color: colors.TEXT }}>
              {__('overview-screen.header.headline')}
            </Text>
          </View>
        </Header>

        <View style={styles.dayOverviewWrapper}>
          <DayOverview
            isDark
            isSmall
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

        <View style={{ ...styles.wrapperAddEntry, backgroundColor: colors.BACKGROUND }}>
          <TouchableOpacity
            disabled={exportButtonDisabled}
            onPress={() => navigation.navigate('Export')}
            style={{ ...styles.buttonAdd, ...(exportButtonDisabled && styles.buttonAddDisabled) }}>
            <UilFile
              color={exportButtonDisabled ? colors.GRAY_3 : COLOR_PRIMARY}
              size={vw(6)}
              style={styles.buttonAddIcon}
            />
            <Text
              style={{
                ...styles.buttonAddText,
                ...(exportButtonDisabled && { ...styles.buttonAddTextDisabled, color: colors.GRAY_3 }),
              }}>
              {__('overview-screen.export.button')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Overview;
