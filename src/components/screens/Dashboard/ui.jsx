import UilBars from '@iconscout/react-native-unicons/icons/uil-bars';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DayOverview from '../../widgets/DayOverview';
import Layout from '../../widgets/Layout';
import Header from '../../widgets/Header';
import { COLOR_PRIMARY, COLOR_SECONDARY, DAYS_OVERVIEW } from '../../../constants';

const Dashboard = ({ days, firstStartHintVisible, total, closeFirstStartHint, openDay, navigation, vw, __ }) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    daysList: {
      flex: 1,
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
      fontFamily: 'JetBrainsMono-Bold',
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
    },
    headerButtonsItemText: {
      color: '#555555',
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(3.8),
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
    viewHint: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      flexDirection: 'column',
      justifyContent: 'center',
      opacity: 1,
      zIndex: 1,
      padding: vw(2.5),
      paddingBottom: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    viewHintInner: {
      alignItems: 'center',
      backgroundColor: COLOR_SECONDARY,
      borderRadius: vw(2.3),
      flex: 1,
      flexDirection: 'column',
      height: vw(60),
      justifyContent: 'center',
      padding: vw(5),
      width: '100%',
    },
    viewHintText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.5),
      lineHeight: vw(7),
      textAlign: 'center',
    },
    viewHintButton: {
      marginTop: vw(5),
    },
    viewHintButtonText: {
      color: COLOR_PRIMARY,
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(4.5),
      lineHeight: vw(7),
    },
  });

  const today = moment()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0);

  const totalTimespan = moment(today).subtract(DAYS_OVERVIEW, 'days');

  //const firstStartHintVisible = true;

  return (
    <Layout>
      <View style={styles.view}>
        <Header>
          <View style={styles.headerContent}>
            <Text style={styles.headerHeadline}>coronika</Text>

            <View style={styles.headerButtons}>
              <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.headerButtonsItem}>
                <UilBars color={'#000000'} size={vw(4.6)} style={{ marginTop: vw(0.4) }} />

                <Text style={styles.headerButtonsItemText}>{__('menu-screen.header.headline')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Header>

        <View style={{ ...styles.view, backgroundColor: '#ffffff' }}>
          {firstStartHintVisible && (
            <View style={styles.viewHint}>
              <View style={styles.viewHintInner}>
                <Text style={styles.viewHintText}>{__('dashboard-screen.first-start.hint')}</Text>
                <TouchableOpacity onPress={() => closeFirstStartHint()} style={styles.viewHintButton}>
                  <Text style={styles.viewHintButtonText}>{__('Close')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {days.length > 0 && (
            <FlatList
              data={days}
              inverted
              keyExtractor={({ timestamp }) => timestamp.toString()}
              renderItem={({ index, item: { locations, persons, timestamp } }) => (
                <TouchableOpacity onPress={() => openDay(timestamp, navigation)}>
                  <DayOverview
                    isEmphasized={timestamp === today.valueOf()}
                    isTranslucent={firstStartHintVisible && timestamp !== today.valueOf()}
                    locations={locations.length}
                    persons={persons.length}
                    showIcons={firstStartHintVisible && timestamp === today.valueOf()}
                    timestamp={timestamp}
                    today={today}
                  />
                </TouchableOpacity>
              )}
              style={styles.daysList}
            />
          )}

          <TouchableOpacity onPress={() => navigation.navigate('Overview')} style={{ width: '100%' }}>
            <DayOverview
              isDark
              isTotal
              locations={total.locations}
              persons={total.persons}
              timestamp={totalTimespan.valueOf()}
              today={today}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Dashboard;
