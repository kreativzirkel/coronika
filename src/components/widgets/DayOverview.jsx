import UilLocationPinAlt from '@iconscout/react-native-unicons/icons/uil-location-pin-alt';
import UilSmile from '@iconscout/react-native-unicons/icons/uil-smile';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';

const DayDate = memo(({ formatTimeDistance, isDark, isToday, isTotal, styles, timestamp, today, __ }) => {
  return (
    <View style={styles.dayDateWrapper}>
      {isTotal && (
        <Text style={{ ...styles.dayValueCaption, ...(isDark && styles.dayValueNumberDark) }}>
          {formatTimeDistance(moment(timestamp).add(1, 'minute').valueOf(), today.valueOf())}
        </Text>
      )}

      {!isTotal && (
        <Text style={{ ...styles.dayValueCaption, ...(isDark && styles.dayValueNumberDark) }}>
          {isToday ? __('today') : moment(timestamp).from(today)}
        </Text>
      )}

      {isTotal && (
        <Text style={{ ...styles.dayValue, ...(isDark && styles.dayValueNumberDark) }}>
          {isTotal ? __('total') : moment(timestamp).format('dd DD.MMM')}
        </Text>
      )}

      {!isTotal && (
        <View style={styles.dayValueWrapper}>
          <Text style={{ ...styles.dayValue, ...(isDark && styles.dayValueNumberDark), ...styles.dayValueDay }}>
            {moment(timestamp).format('dd')}
          </Text>
          <Text style={{ ...styles.dayValue, ...(isDark && styles.dayValueNumberDark) }}>
            {moment(timestamp).format('DD.MMM')}
          </Text>
        </View>
      )}
    </View>
  );
});

const DayLocations = memo(({ isDark, locations, showIcons, styles, vw, __ }) => {
  return (
    <View style={styles.dayLocationsWrapper}>
      <Text style={{ ...styles.dayValueCaption, ...(isDark && styles.dayValueNumberDark) }}>{__('locations')}</Text>
      {showIcons ? (
        <UilLocationPinAlt color={'#000000'} size={vw(8.2)} style={styles.dayIcon} />
      ) : (
        <Text
          style={{
            ...styles.dayValue,
            ...styles.dayValueNumber,
            ...(!locations && styles.dayValueNumberEmpty),
            ...(isDark && styles.dayValueNumberDark),
          }}>
          {locations || '-'}
        </Text>
      )}
    </View>
  );
});

const DayPersons = memo(({ isDark, persons, showIcons, styles, vw, __ }) => {
  return (
    <View style={styles.dayPersonsWrapper}>
      <Text style={{ ...styles.dayValueCaption, ...(isDark && styles.dayValueNumberDark) }}>{__('persons')}</Text>
      {showIcons ? (
        <UilSmile color={'#000000'} size={vw(8.2)} style={styles.dayIcon} />
      ) : (
        <Text
          style={{
            ...styles.dayValue,
            ...styles.dayValueNumber,
            ...(!persons && styles.dayValueNumberEmpty),
            ...(isDark && styles.dayValueNumberDark),
          }}>
          {persons || '-'}
        </Text>
      )}
    </View>
  );
});

class DayOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    day: {
      backgroundColor: COLOR_SECONDARY,
      borderRadius: this.props.vw(2.3),
      display: 'flex',
      flexDirection: 'row',
      marginBottom: this.props.vw(2),
      marginLeft: this.props.vw(2.5),
      marginRight: this.props.vw(2.5),
      padding: this.props.vw(3),
      paddingBottom: this.props.vw(2.5),
      paddingTop: this.props.vw(2.5),
    },
    dayDark: {
      backgroundColor: '#000000',
    },
    dayEmphasized: {
      borderColor: COLOR_PRIMARY,
      borderWidth: this.props.vw(0.5),
      padding: this.props.vw(2.5),
      paddingBottom: this.props.vw(2),
      paddingTop: this.props.vw(2),
    },
    dayTranslucent: {
      opacity: 0.4,
    },
    dayIcon: {
      alignSelf: 'flex-end',
    },
    dayValue: {
      fontFamily: this.props.getFontFamilyBold(),
      fontSize: this.props.vw(7),
      textTransform: 'lowercase',
    },
    dayValueDay: {
      marginRight: this.props.vw(2.5),
    },
    dayValueNumber: {
      color: COLOR_PRIMARY,
      textAlign: 'right',
    },
    dayValueNumberEmpty: {
      color: '#d6d6d6',
    },
    dayValueNumberDark: {
      color: '#ffffff',
    },
    dayValueCaption: {
      color: '#707070',
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(2.7),
      marginBottom: this.props.vw(0.5),
      textTransform: 'lowercase',
    },
    dayValueCaptionDark: {
      color: '#ffffff',
    },
    dayValueWrapper: {
      flex: 1,
      flexDirection: 'row',
    },
    dayDateWrapper: {
      flex: 1,
      flexDirection: 'column',
    },
    dayPersonsWrapper: {
      flexGrow: 0,
      flexShrink: 0,
    },
    dayLocationsWrapper: {
      flexGrow: 0,
      flexShrink: 0,
      marginRight: this.props.vw(1.8),
    },
  });

  currentDay = moment(this.props.timestamp);
  isToday = this.currentDay.diff(this.props.today) === 0;

  render() {
    const {
      formatTimeDistance,
      isDark,
      isEmphasized,
      isTotal,
      isTranslucent,
      locations,
      persons,
      showIcons,
      timestamp,
      today,
      vw,
      __,
    } = this.props;

    return (
      <View
        style={{
          ...this.styles.day,
          ...(isDark && this.styles.dayDark),
          ...(isEmphasized && this.styles.dayEmphasized),
          ...(isTranslucent && this.styles.dayTranslucent),
        }}>
        <DayDate
          {...{ formatTimeDistance, isDark, isToday: this.isToday, isTotal, styles: this.styles, timestamp, today, __ }}
        />
        <DayLocations {...{ isDark, locations, showIcons, styles: this.styles, vw, __ }} />
        <DayPersons {...{ isDark, persons, showIcons, styles: this.styles, vw, __ }} />
      </View>
    );
  }
}

export default memo(withI18n(withViewportUnits(DayOverview)));
