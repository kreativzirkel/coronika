import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../../constants';
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
    headerHeadline: {
      alignSelf: 'flex-start',
      fontFamily: 'JetBrainsMono-Bold',
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
          <Text style={styles.headerHeadline}>coronika</Text>
        </Header>

        <View style={{ ...styles.view, backgroundColor: '#ffffff' }}>
          {days.length > 0 && (
            <FlatList
              data={days}
              inverted
              keyExtractor={({ timestamp }) => timestamp.toString()}
              renderItem={({ index, item: { contacts, locations, timestamp } }) => (
                <TouchableOpacity onPress={() => openDay(timestamp, navigation)}>
                  <DayOverview
                    contacts={contacts.length}
                    locations={locations.length}
                    timestamp={timestamp}
                    today={today}
                  />
                </TouchableOpacity>
              )}
              style={styles.daysList}
            />
          )}

          <DayOverview
            contacts={total.contacts}
            isDark
            isTotal
            locations={total.locations}
            timestamp={totalTimespan.valueOf()}
            today={today}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Dashboard;
