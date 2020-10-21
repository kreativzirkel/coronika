import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../../constants';
import EntriesTabsView from '../../partials/EntriesTabsView';
import DayOverview from '../../widgets/DayOverview';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';

class Day extends React.Component {
  constructor(props) {
    super(props);

    this.deleteLocationFromDay = this.deleteLocationFromDay.bind(this);
    this.deletePersonFromDay = this.deletePersonFromDay.bind(this);
    this.goToAddEntry = this.goToAddEntry.bind(this);
    this.updateSelectedLocation = this.updateSelectedLocation.bind(this);
  }

  today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);

  styles = StyleSheet.create({
    buttonAdd: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: this.props.vw(7),
      marginTop: this.props.vw(7),
    },
    buttonAddIcon: {
      marginRight: this.props.vw(1.5),
    },
    buttonAddText: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(5.5),
      textTransform: 'lowercase',
    },
    dayOverviewWrapper: {
      marginBottom: this.props.vw(0.7),
      width: '100%',
    },
    wrapperAddEntry: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      justifyContent: 'center',
    },
  });

  goToAddEntry() {
    this.props.navigation.navigate('AddEntry');
  }

  deleteLocationFromDay(id, description, time) {
    if (this.props.deleteLocationFromDay) this.props.deleteLocationFromDay(id, description, time);
  }

  deletePersonFromDay(id) {
    if (this.props.deletePersonFromDay) this.props.deletePersonFromDay(id);
  }

  updateSelectedLocation(locationOld, locationUpdated) {
    if (this.props.updateSelectedLocation) this.props.updateSelectedLocation(locationOld, locationUpdated);
  }

  render() {
    const { locations, persons, timestamp, navigation, vw, __ } = this.props;

    return (
      <Layout>
        <HeaderBack headline={__('day-screen.header.headline')} navigation={navigation} />

        <View style={this.styles.dayOverviewWrapper}>
          <DayOverview
            isDark
            locations={locations.length}
            persons={persons.length}
            timestamp={timestamp}
            today={this.today}
          />
        </View>

        <EntriesTabsView
          customLocationsEmptyText={__('day-screen.locations.empty')}
          customPersonsEmptyText={__('day-screen.persons.empty')}
          deletePersonItem={this.deletePersonFromDay}
          deleteLocationItem={this.deleteLocationFromDay}
          hideCreateButton
          locations={locations}
          persons={persons}
          updateSelectedLocation={this.updateSelectedLocation}
        />

        <View style={this.styles.wrapperAddEntry}>
          <TouchableOpacity onPress={this.goToAddEntry} style={this.styles.buttonAdd}>
            <UilPlus color={COLOR_PRIMARY} size={vw(6)} style={this.styles.buttonAddIcon} />
            <Text style={this.styles.buttonAddText}>{__('day-screen.entries.add')}</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }
}

export default Day;
