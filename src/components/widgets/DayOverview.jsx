import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  day: {
    backgroundColor: COLOR_SECONDARY,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    padding: 12,
    paddingBottom: 15,
    paddingTop: 15,
  },
  dayDark: {
    backgroundColor: '#000000',
  },
  dayValue: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 30,
    textTransform: 'lowercase',
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
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 13,
    marginBottom: 3,
    textTransform: 'lowercase',
  },
  dayValueCaptionDark: {
    color: '#ffffff',
  },
  dayDateWrapper: {
    flex: 1,
  },
  dayContactsWrapper: {
    flexGrow: 0,
    flexShrink: 0,
  },
  dayLocationsWrapper: {
    flexGrow: 0,
    flexShrink: 0,
    marginRight: 15,
  },
});

const DayOverview = ({ contacts, isDark, isTotal, locations, timestamp, today, __ }) => {
  const currentDay = moment(timestamp);
  const isToday = currentDay.diff(today) === 0;

  return (
    <View style={{ ...styles.day, ...(isDark && styles.dayDark) }}>
      <View style={styles.dayDateWrapper}>
        <Text style={{ ...styles.dayValueCaption, ...(isDark && styles.dayValueNumberDark) }}>
          {isToday ? __('today') : moment(timestamp).from(today, isTotal)}
        </Text>
        <Text style={{ ...styles.dayValue, ...(isDark && styles.dayValueNumberDark) }}>
          {isTotal ? __('total') : moment(timestamp).format('DD. MMM')}
        </Text>
      </View>
      <View style={styles.dayLocationsWrapper}>
        <Text style={{ ...styles.dayValueCaption, ...(isDark && styles.dayValueNumberDark) }}>{__('locations')}</Text>
        <Text
          style={{
            ...styles.dayValue,
            ...styles.dayValueNumber,
            ...(!locations && styles.dayValueNumberEmpty),
            ...(isDark && styles.dayValueNumberDark),
          }}>
          {locations || '-'}
        </Text>
      </View>
      <View style={styles.dayContactsWrapper}>
        <Text style={{ ...styles.dayValueCaption, ...(isDark && styles.dayValueNumberDark) }}>{__('contacts')}</Text>
        <Text
          style={{
            ...styles.dayValue,
            ...styles.dayValueNumber,
            ...(!contacts && styles.dayValueNumberEmpty),
            ...(isDark && styles.dayValueNumberDark),
          }}>
          {contacts || '-'}
        </Text>
      </View>
    </View>
  );
};

export default withI18n(DayOverview);
