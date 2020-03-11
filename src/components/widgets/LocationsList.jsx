import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import ListItem from './ListItem';
import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  location: {
    backgroundColor: COLOR_SECONDARY,
    borderRadius: 8,
    flexDirection: 'column',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    padding: 12,
    paddingBottom: 15,
    paddingTop: 15,
  },
  locationText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 15,
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
    fontSize: 15,
    marginTop: 4,
  },
  locationContentDescription: {
    color: '#b0b0b1',
    fontSize: 14,
  },
  locationContentTime: {},
  locationsList: {
    flex: 1,
    paddingBottom: 8,
    width: '100%',
  },
  selectButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: -5,
    marginTop: -5,
  },
  selectButtonInner: {
    borderRadius: 50,
  },
  selectButtonInnerSelected: {
    backgroundColor: COLOR_PRIMARY,
  },
});

const LocationsList = ({ allowDelete, allowSelection, deleteItem, locations, selectedLocations, toggleSelection }) =>
  locations ? (
    <FlatList
      data={locations}
      keyExtractor={({ description, id, timestamp }) => `location-${id}-${description}-${timestamp}`}
      renderItem={({ item: { description, id, timestamp, title } }) => {
        const selectedLocation = selectedLocations.find(({ id: locationId }) => locationId === id);
        const isLocationSelected = allowSelection && selectedLocation;
        let selectedLocationDescription = '';
        let selectedLocationTime = '';

        if (isLocationSelected) {
          selectedLocationDescription = selectedLocation.description;
          selectedLocationTime = moment(selectedLocation.timestamp || 0).format('LT');
        }

        return (
          <ListItem allowDelete={allowDelete} deleteItem={() => deleteItem(id, description, timestamp)}>
            <View style={styles.location}>
              <View style={styles.locationHeader}>
                <Text numberOfLines={1} style={styles.locationText}>
                  {title}
                </Text>

                {allowSelection && (
                  <TouchableOpacity onPress={() => toggleSelection(id)} style={styles.selectButton}>
                    <View
                      style={{
                        ...styles.selectButtonInner,
                        ...(isLocationSelected && styles.selectButtonInnerSelected),
                      }}>
                      {isLocationSelected ? (
                        <UilMinus size={25} color={'#ffffff'} />
                      ) : (
                        <UilPlus size={25} color={COLOR_PRIMARY} />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              {allowSelection && isLocationSelected && (
                <View style={styles.locationContent}>
                  {selectedLocationDescription.trim().length > 0 && (
                    <Text style={{ ...styles.locationContentText, ...styles.locationContentDescription }}>
                      {selectedLocationDescription}
                    </Text>
                  )}
                  <Text style={{ ...styles.locationContentText, ...styles.locationContentTime }}>
                    {selectedLocationTime}
                  </Text>
                </View>
              )}

              {allowDelete && (
                <View style={styles.locationContent}>
                  {description.trim().length > 0 && (
                    <Text style={{ ...styles.locationContentText, ...styles.locationContentDescription }}>
                      {description}
                    </Text>
                  )}
                  {timestamp > 0 && (
                    <Text style={{ ...styles.locationContentText, ...styles.locationContentTime }}>
                      {moment(timestamp || 0).format('LT')}
                    </Text>
                  )}
                </View>
              )}
            </View>
          </ListItem>
        );
      }}
      style={styles.locationsList}
    />
  ) : null;

export default LocationsList;
