import React from 'react';
import { StyleSheet, View } from 'react-native';
import EntriesTabsView from '../../partials/EntriesTabsView';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import DayOverview from '../../widgets/DayOverview';
import moment from 'moment';
import { CommonActions } from '@react-navigation/native';

const AddEntry = ({ locations, persons, timestamp, addSelection, navigation, vw, __ }) => {
  const styles = StyleSheet.create({
    dayOverviewWrapper: {
      marginBottom: vw(0.7),
      width: '100%',
    },
  });

  const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);

  return (
    <Layout>
      <HeaderBack headline={__('add-entry-screen.header.headline')} navigation={navigation} />

      <View style={styles.dayOverviewWrapper}>
        <DayOverview isDark isReduced timestamp={timestamp} today={today} />
      </View>

      <EntriesTabsView
        allowSelection
        addSelection={(selection) => addSelection(selection)}
        confirmSelection={() => navigation.dispatch(CommonActions.goBack())}
        locations={locations}
        orderByLastUsage
        persons={persons}
        timestamp={timestamp}
      />
    </Layout>
  );
};

export default AddEntry;
