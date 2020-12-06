import UilLocationPinAlt from '@iconscout/react-native-unicons/icons/uil-location-pin-alt';
import UilUser from '@iconscout/react-native-unicons/icons/uil-user';
import UilUsersAlt from '@iconscout/react-native-unicons/icons/uil-users-alt';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import { COLOR_PRIMARY } from '../../../constants';

class EncountersListItemClass extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    if (this.props.onPress) this.props.onPress(this.props.id);
  }

  styles = StyleSheet.create({
    encounter: {
      borderRadius: this.props.vw(2.3),
      flexDirection: 'column',
      marginLeft: this.props.vw(2.5),
      marginRight: this.props.vw(2.5),
      marginTop: this.props.vw(2.3),
      padding: this.props.vw(3),
    },
    encounterText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
    },
    encounterHeader: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    encounterHeaderIcon: {
      marginRight: this.props.vw(1.5),
    },
    encounterContent: {
      flexDirection: 'column',
    },
    encounterContentLocation: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: this.props.vw(0.75),
    },
    encounterContentLocationIcon: {
      marginRight: this.props.vw(1.5),
    },
    encounterContentText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(3.5),
    },
    encounterContentTime: {
      marginTop: this.props.vw(0.75),
    },
  });

  render() {
    const { colors, location, persons, timestampEnd, timestampStart, title, vw } = this.props;

    const countPersons = persons?.length || 0;
    const hasLocation = location?.trim()?.length > 0 || false;
    const isLocation = hasLocation && countPersons === 0;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={{ ...this.styles.encounter, backgroundColor: colors.SECONDARY }}>
          <View style={this.styles.encounterHeader}>
            {countPersons === 1 && (
              <UilUser size={vw(4)} color={COLOR_PRIMARY} style={this.styles.encounterHeaderIcon} />
            )}
            {countPersons > 1 && (
              <UilUsersAlt size={vw(4)} color={COLOR_PRIMARY} style={this.styles.encounterHeaderIcon} />
            )}
            {isLocation && (
              <UilLocationPinAlt size={vw(4)} color={COLOR_PRIMARY} style={this.styles.encounterHeaderIcon} />
            )}
            <Text numberOfLines={1} style={{ ...this.styles.encounterText, color: colors.TEXT }}>
              {title}
            </Text>
          </View>

          <View style={this.styles.encounterContent}>
            {hasLocation && !isLocation && (
              <View style={this.styles.encounterContentLocation}>
                <UilLocationPinAlt
                  size={vw(3.5)}
                  color={colors.GRAY_3}
                  style={this.styles.encounterContentLocationIcon}
                />
                <Text style={{ ...this.styles.encounterContentText, color: colors.GRAY_3 }}>{location}</Text>
              </View>
            )}
            <Text
              style={{ ...this.styles.encounterContentText, color: colors.TEXT, ...this.styles.encounterContentTime }}>
              {moment(timestampStart || 0).format('LT')}
              {timestampEnd > 0 && timestampEnd > timestampStart && ` - ${moment(timestampEnd).format('LT')}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const EncountersListItem = withColorScheme(withI18n(withViewportUnits(EncountersListItemClass)));

class EncountersList extends React.Component {
  constructor(props) {
    super(props);

    this.onPressItem = this.onPressItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  styles = StyleSheet.create({
    encountersList: {
      flex: 1,
      paddingBottom: this.props.vw(2.3),
      width: '100%',
    },
    encountersListEmptyWrapper: {
      flex: 1,
      padding: this.props.vw(10),
      paddingTop: this.props.vw(5),
      alignItems: 'center',
      justifyContent: 'center',
    },
    encountersListEmptyText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
      lineHeight: this.props.vw(6.5),
      marginBottom: this.props.vw(4.5),
      textAlign: 'center',
    },
  });

  onPressItem(id) {
    if (this.props.onPressItem) this.props.onPressItem(id);
  }

  getItemKey({ id }) {
    return `encounter-${id}`;
  }

  renderItem({ item: { id, location, persons, timestampEnd, timestampStart, title } }) {
    return (
      <EncountersListItem
        id={id}
        location={location}
        onPress={this.onPressItem}
        persons={persons}
        timestampEnd={timestampEnd}
        timestampStart={timestampStart}
        title={title}
      />
    );
  }

  render() {
    const { colors, encounters, __ } = this.props;

    return (
      <View style={{ ...this.styles.encountersList, backgroundColor: colors.BACKGROUND }}>
        {encounters?.length > 0 ? (
          <FlatList
            data={encounters}
            initialNumToRender={10}
            keyExtractor={this.getItemKey}
            removeClippedSubviews={true}
            renderItem={this.renderItem}
            style={this.styles.encountersList}
            windowSize={5}
          />
        ) : (
          <View style={this.styles.encountersListEmptyWrapper}>
            <Text style={{ ...this.styles.encountersListEmptyText, color: colors.TEXT }}>
              {__('encounters-list.empty')}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default withColorScheme(withI18n(withViewportUnits(EncountersList)));
