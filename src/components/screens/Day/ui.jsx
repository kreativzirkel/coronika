import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../../constants';
import { DayOverview } from '../../widgets/DayOverview';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import ModalSwitchDay from '../../widgets/ModalSwitchDay';
import EncountersList from './EncountersList';

class Day extends React.Component {
  constructor(props) {
    super(props);

    this.goToEncounter = this.goToEncounter.bind(this);
    this.onPressEncounterItem = this.onPressEncounterItem.bind(this);
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
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(5.5),
      textTransform: 'lowercase',
    },
    dayOverviewWrapper: {
      marginBottom: this.props.vw(0.7),
      width: '100%',
    },
    wrapperAddEntry: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  goToEncounter() {
    this.props.navigation.navigate('Encounter');
  }

  onPressEncounterItem(id) {
    const { navigation, openEncounter } = this.props;

    openEncounter(id, navigation);
  }

  render() {
    const {
      colors,
      daysList,
      encounters,
      isDateSwitcherModalVisible,
      timestamp,
      hideDateSwitcherModal,
      showDateSwitcherModal,
      setTimestamp,
      navigation,
      vw,
      __,
    } = this.props;

    return (
      <Layout>
        <HeaderBack headline={__('day-screen.header.headline')} navigation={navigation} />

        <View style={this.styles.dayOverviewWrapper}>
          <TouchableOpacity onPress={showDateSwitcherModal}>
            <DayOverview isDark isSmall encounters={encounters.length} timestamp={timestamp} today={this.today} />
          </TouchableOpacity>
        </View>

        <EncountersList encounters={encounters} onPressItem={this.onPressEncounterItem} />

        <View style={{ ...this.styles.wrapperAddEntry, backgroundColor: colors.BACKGROUND }}>
          <TouchableOpacity onPress={this.goToEncounter} style={this.styles.buttonAdd}>
            <UilPlus color={COLOR_PRIMARY} size={vw(6)} style={this.styles.buttonAddIcon} />
            <Text style={this.styles.buttonAddText}>{__('day-screen.entries.add')}</Text>
          </TouchableOpacity>
        </View>

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

export default Day;
