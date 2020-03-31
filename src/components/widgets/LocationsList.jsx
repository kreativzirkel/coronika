import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';
import ListItem from './ListItem';
import ListItemSeparator from './ListItemSeparator';
import cloneDeep from 'lodash/cloneDeep';
import UilEllipsisV from '@iconscout/react-native-unicons/icons/uil-ellipsis-v';

class LocationsListItemClass extends React.Component {
  constructor(props) {
    super(props);

    this.swipeable = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.isLocationSelected !== nextProps.isLocationSelected) return true;

    if (this.props.title !== nextProps.title) return true;

    if (this.props.description !== nextProps.description) return true;

    if (this.props.timestamp !== nextProps.timestamp) return true;

    return false;
  }

  openMore() {
    if (this.swipeable.current.openRight) {
      this.swipeable.current.openRight();
    }
  }

  render() {
    const {
      allowDelete,
      allowSelection,
      allowUpdate,
      deleteItem,
      description,
      counter,
      id,
      isLocationSelected,
      selectedLocationDescription,
      selectedLocationTime,
      showCounter,
      timestamp,
      title,
      toggleSelection,
      updateItem,
      vw,
    } = this.props;

    const styles = StyleSheet.create({
      location: {
        backgroundColor: COLOR_SECONDARY,
        borderRadius: vw(2.3),
        flexDirection: 'column',
        marginLeft: vw(2.5),
        marginRight: vw(2.5),
        marginTop: vw(2.3),
        padding: vw(3),
        paddingBottom: vw(3.8),
        paddingTop: vw(3.8),
      },
      locationText: {
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(4.2),
      },
      locationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      locationContent: {
        flexDirection: 'column',
      },
      locationContentText: {
        color: '#000000',
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(3.8),
        marginTop: vw(1),
      },
      locationContentDescription: {
        color: '#b0b0b1',
        fontSize: vw(3.5),
      },
      locationContentTime: {},
      moreButton: {
        alignItems: 'center',
        bottom: 0,
        flexDirection: 'row',
        padding: vw(2),
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
      },
      selectButton: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: -vw(1.25),
        marginTop: -vw(1.25),
      },
      selectButtonInner: {
        borderRadius: 50,
      },
      selectButtonInnerSelected: {
        backgroundColor: COLOR_PRIMARY,
      },
      viewCounter: {
        marginBottom: -vw(1.2),
        marginTop: -vw(1.2),
      },
      viewCounterText: {
        color: COLOR_PRIMARY,
        fontFamily: 'JetBrainsMono-Bold',
        fontSize: vw(6),
      },
    });

    const LocationItem = () => (
      <View style={styles.location}>
        <View style={styles.locationHeader}>
          <Text numberOfLines={1} style={styles.locationText}>
            {title}
          </Text>

          {allowSelection && (
            <View style={styles.selectButton}>
              <View
                style={{
                  ...styles.selectButtonInner,
                  ...(isLocationSelected && styles.selectButtonInnerSelected),
                }}>
                {isLocationSelected ? (
                  <UilMinus size={vw(7)} color={'#ffffff'} />
                ) : (
                  <UilPlus size={vw(7)} color={COLOR_PRIMARY} />
                )}
              </View>
            </View>
          )}

          {showCounter && (
            <View style={styles.viewCounter}>
              <Text style={styles.viewCounterText}>{counter}</Text>
            </View>
          )}
        </View>

        {allowSelection && isLocationSelected && (
          <View style={styles.locationContent}>
            {selectedLocationDescription.trim().length > 0 && (
              <Text style={{ ...styles.locationContentText, ...styles.locationContentDescription }}>
                {selectedLocationDescription}
              </Text>
            )}
            <Text style={{ ...styles.locationContentText, ...styles.locationContentTime }}>{selectedLocationTime}</Text>
          </View>
        )}

        {allowDelete && (
          <View style={styles.locationContent}>
            {description.trim().length > 0 && (
              <Text style={{ ...styles.locationContentText, ...styles.locationContentDescription }}>{description}</Text>
            )}
            {timestamp > 0 && (
              <Text style={{ ...styles.locationContentText, ...styles.locationContentTime }}>
                {moment(timestamp || 0).format('LT')}
              </Text>
            )}
          </View>
        )}

        {allowDelete && (
          <TouchableOpacity onPress={() => this.openMore()} style={styles.moreButton}>
            <UilEllipsisV size={vw(7)} color={COLOR_PRIMARY} />
          </TouchableOpacity>
        )}
      </View>
    );

    return (
      <ListItem
        allowDelete={allowDelete}
        deleteItem={() => deleteItem(id, description, timestamp)}
        ref={this.swipeable}>
        {allowUpdate ? (
          <TouchableOpacity onPress={() => updateItem(id)}>
            <LocationItem />
          </TouchableOpacity>
        ) : allowSelection ? (
          <TouchableOpacity onPress={() => toggleSelection(id)}>
            <LocationItem />
          </TouchableOpacity>
        ) : (
          <LocationItem />
        )}
      </ListItem>
    );
  }
}

const LocationsListItem = withViewportUnits(LocationsListItemClass);

const LocationsList = ({
  allowDelete,
  allowSelection,
  allowUpdate,
  deleteItem,
  locations,
  orderByLastUsage,
  selectedLocations,
  showCounter,
  toggleSelection,
  updateItem,
  vw,
}) => {
  const styles = StyleSheet.create({
    locationsList: {
      flex: 1,
      paddingBottom: vw(2.3),
      width: '100%',
    },
  });

  if (orderByLastUsage && locations) {
    locations.sort((a, b) => {
      const lastUsedA = a.lastUsed || 0;
      const lastUsedB = b.lastUsed || 0;

      if (lastUsedA > lastUsedB) {
        return -1;
      }

      if (lastUsedA < lastUsedB) {
        return 1;
      }

      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }

      return 0;
    });

    if (!locations.find(({ separatorItem }) => separatorItem === true)) {
      locations = cloneDeep(locations);
      for (const i in locations) {
        if (Object.prototype.hasOwnProperty.call(locations, i)) {
          const p = locations[i];
          const index = parseInt(i, 10);

          if (index === 0 && !p.lastUsed) break;

          if (index > 0 && !p.lastUsed) {
            locations.splice(i, 0, { description: '', id: `locations-separator-${i}`, separatorItem: true, title: '' });
            break;
          }
        }
      }
    }
  }

  return locations ? (
    <FlatList
      data={locations}
      initialNumToRender={50}
      keyExtractor={({ description, id, timestamp }) => `location-${id}-${description}-${timestamp}`}
      renderItem={({ item: { counter, description, id, separatorItem, timestamp, title } }) => {
        if (separatorItem) {
          return <ListItemSeparator />;
        }

        const selectedLocation = selectedLocations.find(({ id: locationId }) => locationId === id);
        const isLocationSelected = allowSelection && selectedLocation;
        let selectedLocationDescription = '';
        let selectedLocationTime = '';

        if (isLocationSelected) {
          selectedLocationDescription = selectedLocation.description;
          selectedLocationTime = moment(selectedLocation.timestamp || 0).format('LT');
        }

        return (
          <LocationsListItem
            allowDelete={allowDelete}
            allowSelection={allowSelection}
            allowUpdate={allowUpdate}
            counter={counter}
            deleteItem={(locationId, locationDescription, locationTimestamp) =>
              deleteItem(locationId, locationDescription, locationTimestamp)
            }
            description={description}
            id={id}
            isLocationSelected={isLocationSelected}
            selectedLocationDescription={selectedLocationDescription}
            selectedLocationTime={selectedLocationTime}
            showCounter={showCounter}
            timestamp={timestamp}
            title={title}
            toggleSelection={(locationId) => toggleSelection(locationId)}
            updateItem={(locationId) => updateItem(locationId)}
          />
        );
      }}
      style={styles.locationsList}
    />
  ) : null;
};

export default withViewportUnits(LocationsList);
