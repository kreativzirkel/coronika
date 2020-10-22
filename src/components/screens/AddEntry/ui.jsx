import React from 'react';
import EntriesTabsView from '../../partials/EntriesTabsView';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const AddEntry = ({ locations, persons, timestamp, addSelection, navigation, __ }) => {
  return (
    <Layout>
      <HeaderBack headline={__('add-entry-screen.header.headline')} navigation={navigation} />

      <EntriesTabsView
        allowSelection
        addSelection={(selection) => addSelection(selection)}
        confirmSelection={() => navigation.navigate('Day')}
        locations={locations}
        orderByLastUsage
        persons={persons}
        timestamp={timestamp}
      />
    </Layout>
  );
};

export default AddEntry;
