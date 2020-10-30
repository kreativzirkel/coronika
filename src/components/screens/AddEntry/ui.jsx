import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import EntriesTabsView from '../../partials/EntriesTabsView';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import DayOverview from '../../widgets/DayOverview';
import ModalSwitchDay from '../../widgets/ModalSwitchDay';

const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);

class AddEntry extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.daysListRenderItem = this.daysListRenderItem.bind(this);
    this.onPressDaysListItem = this.onPressDaysListItem.bind(this);
  }

  styles = StyleSheet.create({
    dayOverviewWrapper: {
      marginBottom: this.props.vw(0.7),
      width: '100%',
    },
  });

  render() {
    const {
      daysList,
      isDateSwitcherModalVisible,
      locations,
      persons,
      timestamp,
      addSelection,
      hideDateSwitcherModal,
      showDateSwitcherModal,
      setTimestamp,
      navigation,
      __,
    } = this.props;

    return (
      <Layout>
        <HeaderBack headline={__('add-entry-screen.header.headline')} navigation={navigation} />

        <View style={this.styles.dayOverviewWrapper}>
          <TouchableOpacity onPress={showDateSwitcherModal}>
            <DayOverview isDark isReduced timestamp={timestamp} today={today} />
          </TouchableOpacity>
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

        <ModalSwitchDay
          closeModal={hideDateSwitcherModal}
          days={daysList}
          isVisible={isDateSwitcherModalVisible}
          setTimestamp={setTimestamp}
        />
      </Layout>
    );
  }
}

export default AddEntry;
