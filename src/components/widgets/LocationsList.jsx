import UilEllipsisV from '@iconscout/react-native-unicons/icons/uil-ellipsis-v';
import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import cloneDeep from 'lodash/cloneDeep';
import deepEqual from 'fast-deep-equal';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import ListItemSeparator from './ListItemSeparator';

class LocationsListItemClass extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.openMore = this.openMore.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.props.isLocationSelected !== nextProps.isLocationSelected ||
      this.props.title !== nextProps.title ||
      this.props.description !== nextProps.description ||
      this.props.phone !== nextProps.phone ||
      this.props.timestamp !== nextProps.timestamp ||
      this.props.timestampEnd !== nextProps.timestampEnd
    );
  }

  onPress() {
    if (this.props.onPress) this.props.onPress(this.props.id);
  }

  openMore() {
    if (this.props.onPressMore)
      this.props.onPressMore(
        this.props.id,
        this.props.title,
        this.props.description,
        this.props.phone,
        this.props.timestamp,
        this.props.timestampEnd
      );
  }

  toggleSelection() {
    if (this.props.toggleSelection) this.props.toggleSelection(this.props.id);
  }

  styles = StyleSheet.create({
    location: {
      borderRadius: this.props.vw(2.3),
      flexDirection: 'column',
      marginLeft: this.props.vw(2.5),
      marginRight: this.props.vw(2.5),
      marginTop: this.props.vw(2.3),
      padding: this.props.vw(3),
    },
    locationText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
    },
    locationTextWithPadding: {
      paddingRight: this.props.vw(9),
    },
    locationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    locationContent: {
      flexDirection: 'column',
    },
    locationContentText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(3.8),
      marginTop: this.props.vw(1),
    },
    locationContentDescription: {
      color: '#b0b0b1',
      fontSize: this.props.vw(3.5),
    },
    locationContentTime: {},
    moreButton: {
      alignItems: 'center',
      bottom: 0,
      flexDirection: 'row',
      padding: this.props.vw(2),
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    selectButton: {
      alignItems: 'center',
      bottom: 0,
      flexDirection: 'row',
      marginBottom: -this.props.vw(1.25),
      marginTop: -this.props.vw(1.25),
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    selectButtonInner: {
      backgroundColor: 'transparent',
      borderRadius: 50,
    },
    selectButtonInnerSelected: {
      backgroundColor: COLOR_PRIMARY,
    },
    viewCounter: {
      alignItems: 'center',
      bottom: 0,
      flexDirection: 'row',
      marginBottom: -this.props.vw(1.2),
      marginTop: -this.props.vw(1.2),
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1,
    },
    viewCounterText: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(6),
    },
  });

  render() {
    const {
      allowDelete,
      allowSelection,
      allowUpdate,
      colors,
      counter,
      description,
      isLocationSelected,
      onPress,
      selectedLocationDescription,
      selectedLocationTime,
      showCounter,
      timestamp,
      timestampEnd,
      title,
      vw,
    } = this.props;

    const LocationItem = () => (
      <View style={{ ...this.styles.location, backgroundColor: colors.SECONDARY }}>
        <View style={this.styles.locationHeader}>
          <Text
            numberOfLines={1}
            style={{
              ...this.styles.locationText,
              color: colors.TEXT,
              ...((allowDelete || allowSelection || allowUpdate || showCounter) && this.styles.locationTextWithPadding),
            }}>
            {title}
          </Text>

          {allowSelection && (
            <View style={this.styles.selectButton}>
              <View
                style={{
                  ...this.styles.selectButtonInner,
                  ...(isLocationSelected && this.styles.selectButtonInnerSelected),
                }}>
                {isLocationSelected ? (
                  <UilMinus size={vw(7)} color={colors.TEXT_ALT} />
                ) : (
                  <UilPlus size={vw(7)} color={COLOR_PRIMARY} />
                )}
              </View>
            </View>
          )}

          {showCounter && (
            <View style={this.styles.viewCounter}>
              <Text style={this.styles.viewCounterText}>{counter}</Text>
            </View>
          )}
        </View>

        {allowSelection && isLocationSelected && (
          <View style={this.styles.locationContent}>
            {selectedLocationDescription.trim().length > 0 && (
              <Text
                style={{
                  ...this.styles.locationContentText,
                  ...this.styles.locationContentDescription,
                  color: colors.GRAY_3,
                }}>
                {selectedLocationDescription}
              </Text>
            )}
            <Text
              style={{ ...this.styles.locationContentText, color: colors.TEXT, ...this.styles.locationContentTime }}>
              {selectedLocationTime}
            </Text>
          </View>
        )}

        {allowDelete && (
          <View style={this.styles.locationContent}>
            {description.trim().length > 0 && (
              <Text
                style={{
                  ...this.styles.locationContentText,
                  ...this.styles.locationContentDescription,
                  color: colors.GRAY_3,
                }}>
                {description}
              </Text>
            )}
            {timestamp > 0 && (
              <Text
                style={{ ...this.styles.locationContentText, color: colors.TEXT, ...this.styles.locationContentTime }}>
                {moment(timestamp || 0).format('LT')}
                {timestampEnd > 0 && timestampEnd > timestamp && ` - ${moment(timestampEnd).format('LT')}`}
              </Text>
            )}
          </View>
        )}

        {(allowDelete || allowUpdate) && (
          <TouchableOpacity onPress={this.openMore} style={this.styles.moreButton}>
            <UilEllipsisV size={vw(7)} color={COLOR_PRIMARY} />
          </TouchableOpacity>
        )}
      </View>
    );

    return allowSelection ? (
      <TouchableOpacity onPress={this.toggleSelection}>
        <LocationItem />
      </TouchableOpacity>
    ) : onPress ? (
      <TouchableOpacity onPress={this.onPress}>
        <LocationItem />
      </TouchableOpacity>
    ) : (
      <LocationItem />
    );
  }
}

const LocationsListItem = withColorScheme(withI18n(withViewportUnits(LocationsListItemClass)));

const sortLocations = (inputLocationsList, orderByLastUsage = false) => {
  if (orderByLastUsage && inputLocationsList) {
    inputLocationsList.sort((a, b) => {
      const lastUsedA = a.lastUsed || 0;
      const lastUsedB = b.lastUsed || 0;

      if (lastUsedA > lastUsedB) return -1;

      if (lastUsedA < lastUsedB) return 1;

      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return -1;

      if (titleA > titleB) return 1;

      return 0;
    });

    if (!inputLocationsList.find(({ separatorItem }) => separatorItem === true)) {
      const locations = cloneDeep(inputLocationsList);
      for (const i in inputLocationsList) {
        if (Object.prototype.hasOwnProperty.call(inputLocationsList, i)) {
          const p = inputLocationsList[i];
          const index = parseInt(i, 10);

          if (index === 0 && !p.lastUsed) break;

          if (index > 0 && !p.lastUsed) {
            locations.splice(i, 0, {
              description: '',
              id: `locations-separator-${i}`,
              separatorItem: true,
              title: '',
            });
            break;
          }
        }
      }

      return locations;
    }
  }

  return inputLocationsList;
};

class LocationsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: sortLocations(this.props.locations, this.props.orderByLastUsage),
      locationsRaw: this.props.locations,
      locationsLength: this.props.locations.length,
      selectedLocationsLength: this.props.selectedLocations.length,
    };

    this.onPressLocation = this.onPressLocation.bind(this);
    this.onPressMoreLocation = this.onPressMoreLocation.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.locations.length !== state.locationsLength ||
      props.selectedLocations.length !== state.selectedLocationsLength ||
      !deepEqual(props.locations, state.locationsRaw)
    ) {
      return {
        locations: sortLocations(props.locations, props.orderByLastUsage),
        locationsRaw: props.locations,
        locationsLength: props.locations.length,
        selectedLocationsLength: props.selectedLocations.length,
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.locations.length !== this.state.locationsLength ||
      nextProps.selectedLocations.length !== this.state.selectedLocationsLength ||
      !deepEqual(nextProps.locations, this.state.locationsRaw)
    );
  }

  styles = StyleSheet.create({
    locationsList: {
      flex: 1,
      paddingBottom: this.props.vw(2.3),
      width: '100%',
    },
  });

  onPressLocation(locationId) {
    if (this.props.onPressItem) this.props.onPressItem(locationId);
  }

  onPressMoreLocation(
    locationId,
    locationTitle,
    locationDescription,
    locationPhone,
    locationTimestampStart,
    locationTimestampEnd
  ) {
    if (this.props.openItemMore)
      this.props.openItemMore(
        locationId,
        locationTitle,
        locationDescription,
        locationPhone,
        locationTimestampStart,
        locationTimestampEnd
      );
  }

  toggleSelection(locationId) {
    if (this.props.toggleSelection) this.props.toggleSelection(locationId);
  }

  renderItem({ item: { counter, description, id, phone, separatorItem, timestamp, timestampEnd, title } }) {
    if (separatorItem) {
      return <ListItemSeparator />;
    }

    const { allowDelete, allowSelection, allowUpdate, onPressItem, selectedLocations, showCounter } = this.props;
    const selectedLocation = allowSelection ? selectedLocations.find(({ id: locationId }) => locationId === id) : null;
    const isLocationSelected = allowSelection && selectedLocation;
    let selectedLocationDescription = '';
    let selectedLocationTime = '';

    if (isLocationSelected) {
      selectedLocationDescription = selectedLocation.description;
      selectedLocationTime = moment(selectedLocation.timestamp || 0).format('LT');
      if (selectedLocation.timestampEnd > 0 && selectedLocation.timestampEnd > selectedLocation.timestamp) {
        selectedLocationTime = `${selectedLocationTime} - ${moment(selectedLocation.timestampEnd).format('LT')}`;
      }
    }

    return (
      <LocationsListItem
        allowDelete={allowDelete}
        allowSelection={allowSelection}
        allowUpdate={allowUpdate}
        counter={counter}
        description={description}
        id={id}
        isLocationSelected={isLocationSelected}
        onPress={onPressItem ? this.onPressLocation : null}
        onPressMore={this.onPressMoreLocation}
        phone={phone}
        selectedLocationDescription={selectedLocationDescription}
        selectedLocationTime={selectedLocationTime}
        showCounter={showCounter}
        timestamp={timestamp}
        timestampEnd={timestampEnd}
        title={title}
        toggleSelection={this.toggleSelection}
      />
    );
  }

  getItemKey({ description, id, timestamp, timestampEnd }) {
    return `location-${id}-${description}-${timestamp}-${timestampEnd}`;
  }

  render() {
    const { locations } = this.state;

    return locations ? (
      <FlatList
        data={locations}
        initialNumToRender={10}
        keyExtractor={this.getItemKey}
        removeClippedSubviews={true}
        renderItem={this.renderItem}
        style={this.styles.locationsList}
        windowSize={5}
      />
    ) : null;
  }
}

export default withViewportUnits(LocationsList);
