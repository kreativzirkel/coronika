import UilFile from '@iconscout/react-native-unicons/icons/uil-file';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, DAYS_OVERVIEW_MAX } from '../../../constants';
import EntriesTabsView from '../../partials/EntriesTabsView';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import DayOverview from '../../widgets/DayOverview';
import moment from 'moment';
import UilBars from '@iconscout/react-native-unicons/icons/uil-bars';

const Overview = ({ colors, locations, persons, total, navigation, vw, fontFamilyBold, fontFamilyRegular, __ }) => {
  const styles = StyleSheet.create({
    buttonExport: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: vw(5),
      marginTop: vw(5),
    },
    buttonExportDisabled: {
      opacity: 0.5,
    },
    buttonExportIcon: {
      marginRight: vw(1.5),
    },
    buttonExportText: {
      color: COLOR_PRIMARY,
      fontFamily: fontFamilyRegular,
      fontSize: vw(4.8),
      textTransform: 'lowercase',
    },
    buttonExportTextDisabled: {
      //
    },
    dayOverviewWrapper: {
      marginBottom: vw(0.7),
      width: '100%',
    },
    headerContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerHeadline: {
      alignSelf: 'flex-start',
      fontFamily: fontFamilyBold,
      fontSize: vw(5),
      textTransform: 'lowercase',
    },
    headerButtons: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    headerButtonsItem: {
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft: vw(3),
      marginTop: -vw(2),
      marginBottom: -vw(2),
      paddingTop: vw(2),
      paddingBottom: vw(2),
    },
    headerButtonsItemIconMenu: {
      marginTop: vw(0.6),
    },
    headerButtonsItemText: {
      fontFamily: fontFamilyRegular,
      fontSize: vw(4.2),
      marginLeft: vw(1),
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
    wrapperExportEntries: {
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

            <View style={styles.headerButtons}>
              <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.headerButtonsItem}>
                <UilBars color={colors.TEXT} size={vw(4.8)} style={styles.headerButtonsItemIconMenu} />

                <Text style={{ ...styles.headerButtonsItemText, color: colors.TEXT }}>
                  {__('menu-screen.header.headline')}
                </Text>
              </TouchableOpacity>
            </View>
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
          customPersonsEmptyText={__('overview-screen.persons.empty')}
          customLocationsEmptyText={__('overview-screen.locations.empty')}
          hideCreateButton
          hideSearchBar
          locations={locations}
          persons={persons}
          showCounter
        />

        <View style={{ ...styles.wrapperExportEntries, backgroundColor: colors.BACKGROUND }}>
          <TouchableOpacity
            disabled={exportButtonDisabled}
            onPress={() => navigation.navigate('Export')}
            style={{ ...styles.buttonExport, ...(exportButtonDisabled && styles.buttonExportDisabled) }}>
            <UilFile
              color={exportButtonDisabled ? colors.GRAY_3 : COLOR_PRIMARY}
              size={vw(5)}
              style={styles.buttonExportIcon}
            />
            <Text
              style={{
                ...styles.buttonExportText,
                ...(exportButtonDisabled && { ...styles.buttonExportTextDisabled, color: colors.GRAY_3 }),
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
