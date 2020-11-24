import UilLocationPinAlt from '@iconscout/react-native-unicons/icons/uil-location-pin-alt';
import UilSmile from '@iconscout/react-native-unicons/icons/uil-smile';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';

const DayDate = memo(
  /* eslint-disable-next-line complexity */ // TODO: reduce complexity
  ({ formatTimeDistance, isDark, isReduced, isSmall, isToday, isTotal, styles, timestamp, today, __ }) => {
    return (
      <View style={{ ...styles.dayDateWrapper, ...(isReduced && styles.dayDateWrapperReduced) }}>
        {isTotal && (
          <Text
            style={{
              ...styles.dayValueCaption,
              ...(isReduced && styles.dayValueCaptionReduced),
              ...(isDark && styles.dayValueNumberDark),
            }}>
            {formatTimeDistance(moment(timestamp).add(1, 'minute').valueOf(), today.valueOf())}
          </Text>
        )}

        {!isTotal && (
          <Text
            style={{
              ...styles.dayValueCaption,
              ...(isReduced && styles.dayValueCaptionReduced),
              ...(isDark && styles.dayValueNumberDark),
            }}>
            {isToday ? __('today') : moment(timestamp).from(today)}
          </Text>
        )}

        {isTotal && (
          <Text
            style={{
              ...styles.dayValue,
              ...(isReduced && styles.dayValueReduced),
              ...(isSmall && styles.dayValueSmall),
              ...(isDark && styles.dayValueNumberDark),
            }}>
            {isTotal ? __('total') : moment(timestamp).format('dd DD.MMM')}
          </Text>
        )}

        {!isTotal && (
          <View style={styles.dayValueWrapper}>
            <Text
              style={{
                ...styles.dayValue,
                ...(isReduced && styles.dayValueReduced),
                ...(isSmall && styles.dayValueSmall),
                ...(isDark && styles.dayValueNumberDark),
                ...styles.dayValueDay,
                ...(isReduced && styles.dayValueDayReduced),
                ...(isSmall && styles.dayValueDaySmall),
              }}>
              {moment(timestamp).format('dd')}
            </Text>
            <Text
              style={{
                ...styles.dayValue,
                ...(isReduced && styles.dayValueReduced),
                ...(isSmall && styles.dayValueSmall),
                ...(isDark && styles.dayValueNumberDark),
              }}>
              {moment(timestamp).format('DD.MMM')}
            </Text>
          </View>
        )}
      </View>
    );
  }
);

const DayLocations = memo(({ colors, isDark, isSmall, locations, showIcons, styles, vw, __ }) => {
  return (
    <View style={styles.dayLocationsWrapper}>
      <Text style={{ ...styles.dayValueCaption, ...(isDark && styles.dayValueNumberDark) }}>{__('locations')}</Text>
      {showIcons ? (
        <UilLocationPinAlt color={colors.TEXT} size={vw(8.2)} style={styles.dayIcon} />
      ) : (
        <Text
          style={{
            ...styles.dayValue,
            ...(isSmall && styles.dayValueSmall),
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

const DayPersons = memo(({ colors, isDark, isSmall, persons, showIcons, styles, vw, __ }) => {
  return (
    <View style={styles.dayPersonsWrapper}>
      <Text style={{ ...styles.dayValueCaption, ...(isDark && styles.dayValueNumberDark) }}>{__('persons')}</Text>
      {showIcons ? (
        <UilSmile color={colors.TEXT} size={vw(8.2)} style={styles.dayIcon} />
      ) : (
        <Text
          style={{
            ...styles.dayValue,
            ...(isSmall && styles.dayValueSmall),
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

const DayEncounters = memo(({ colors, isDark, isSmall, encounters, showIcons, styles, vw, __ }) => {
  return (
    <View style={styles.dayPersonsWrapper}>
      <Text style={{ ...styles.dayValueCaption, ...(isDark && styles.dayValueNumberDark) }}>{__('encounters')}</Text>
      {showIcons ? (
        <UilSmile color={colors.TEXT} size={vw(8.2)} style={styles.dayIcon} />
      ) : (
        <Text
          style={{
            ...styles.dayValue,
            ...(isSmall && styles.dayValueSmall),
            ...styles.dayValueNumber,
            ...(!encounters && styles.dayValueNumberEmpty),
            ...(isDark && styles.dayValueNumberDark),
          }}>
          {encounters || '-'}
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
      //
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
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(7),
      textTransform: 'lowercase',
    },
    dayValueReduced: {
      fontSize: this.props.vw(4.5),
    },
    dayValueSmall: {
      fontSize: this.props.vw(5.5),
    },
    dayValueDay: {
      marginRight: this.props.vw(2.5),
    },
    dayValueDayReduced: {
      marginRight: this.props.vw(1.5),
    },
    dayValueDaySmall: {
      marginRight: this.props.vw(1.8),
    },
    dayValueNumber: {
      color: COLOR_PRIMARY,
      textAlign: 'right',
    },
    dayValueNumberEmpty: {
      //
    },
    dayValueNumberDark: {
      //
    },
    dayValueCaption: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(2.7),
      marginBottom: this.props.vw(0.5),
      textTransform: 'lowercase',
    },
    dayValueCaptionReduced: {
      marginBottom: 0,
    },
    dayValueCaptionDark: {
      //
    },
    dayValueWrapper: {
      flexDirection: 'row',
    },
    dayDateWrapper: {
      flex: 1,
      flexDirection: 'column',
    },
    dayDateWrapperReduced: {
      alignItems: 'center',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
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

  render() {
    const {
      colors,
      colorScheme,
      encounters,
      formatTimeDistance,
      isDark,
      isEmphasized,
      isReduced,
      isSmall,
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

    const styles = {
      ...this.styles,
      day: {
        ...this.styles.day,
        backgroundColor: colors.SECONDARY,
      },
      dayDark: {
        ...this.styles.dayDark,
        backgroundColor: colorScheme === 'dark' ? colors.DARK.TEXT : colors.DARK.BACKGROUND,
      },
      dayValue: {
        ...this.styles.dayValue,
        color: colors.TEXT,
      },
      dayValueNumberEmpty: {
        ...this.styles.dayValueNumberEmpty,
        color: colors.GRAY_2,
      },
      dayValueNumberDark: {
        ...this.styles.dayValueNumberDark,
        color: colors.TEXT_ALT,
      },
      dayValueCaption: {
        ...this.styles.dayValueCaption,
        color: colors.GRAY_1,
      },
      dayValueCaptionDark: {
        ...this.styles.dayValueCaptionDark,
        color: colors.DARK.TEXT,
      },
    };

    const currentDay = moment(this.props.timestamp);
    const isToday = currentDay.diff(this.props.today) === 0;

    return (
      <View
        style={{
          ...styles.day,
          ...(isDark && styles.dayDark),
          ...(isEmphasized && styles.dayEmphasized),
          ...(isTranslucent && styles.dayTranslucent),
        }}>
        <DayDate
          {...{
            formatTimeDistance,
            isDark,
            isReduced,
            isSmall,
            isToday,
            isTotal,
            styles: styles,
            timestamp,
            today,
            __,
          }}
        />
        {/* TODO: enable and refactor for Overview */}
        {/* !isReduced && <DayLocations {...{ colors, isDark, isSmall, locations, showIcons, styles: styles, vw, __ }} /> */}
        {/* !isReduced && <DayPersons {...{ colors, isDark, isSmall, persons, showIcons, styles: styles, vw, __ }} /> */}
        {!isReduced && (
          <DayEncounters {...{ colors, encounters, isDark, isSmall, showIcons, styles: styles, vw, __ }} />
        )}
      </View>
    );
  }
}

export default memo(withColorScheme(withI18n(withViewportUnits(DayOverview))));
