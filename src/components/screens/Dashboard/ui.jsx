import UilBars from '@iconscout/react-native-unicons/icons/uil-bars';
import UilFile from '@iconscout/react-native-unicons/icons/uil-file';
import UilLock from '@iconscout/react-native-unicons/icons/uil-lock';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DayOverview from '../../widgets/DayOverview';
import Layout from '../../widgets/Layout';
import Header from '../../widgets/Header';

const Dashboard = ({ days, total, openDay, navigation, vw, __ }) => {
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
      fontSize: vw(4),
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
  });

  const today = moment()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0);

  const totalTimespan = moment(today).subtract(21, 'days');

  return (
    <Layout>
      <View style={styles.view}>
        <Header>
          <View style={styles.headerContent}>
            <Text style={styles.headerHeadline}>coronika</Text>

            <View style={styles.headerButtons}>
              <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.headerButtonsItem}>
                <UilBars color={'#000000'} size={vw(5)} style={{ marginTop: vw(0.4) }} />

                <Text style={styles.headerButtonsItemText}>{__('menu-screen.header.headline')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Header>

        <View style={{ ...styles.view, backgroundColor: '#ffffff' }}>
          {days.length > 0 && (
            <FlatList
              data={days}
              inverted
              keyExtractor={({ timestamp }) => timestamp.toString()}
              renderItem={({ index, item: { locations, persons, timestamp } }) => (
                <TouchableOpacity onPress={() => openDay(timestamp, navigation)}>
                  <DayOverview
                    isEmphasized={timestamp === today.valueOf()}
                    locations={locations.length}
                    persons={persons.length}
                    timestamp={timestamp}
                    today={today}
                  />
                </TouchableOpacity>
              )}
              style={styles.daysList}
            />
          )}

          <DayOverview
            isDark
            isTotal
            locations={total.locations}
            persons={total.persons}
            timestamp={totalTimespan.valueOf()}
            today={today}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Dashboard;
