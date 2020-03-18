import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import moment from 'moment';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';
import ListItem from './ListItem';

const LocationsList = ({
  allowDelete,
  allowSelection,
  allowUpdate,
  deleteItem,
  locations,
  selectedLocations,
  toggleSelection,
  updateItem,
  vw,
}) => {
  // noinspection JSUnresolvedFunction
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
    locationsList: {
      flex: 1,
      paddingBottom: vw(2.3),
      width: '100%',
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
  });

  return locations ? (
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
        );

        return (
          <ListItem allowDelete={allowDelete} deleteItem={() => deleteItem(id, description, timestamp)}>
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
      }}
      style={styles.locationsList}
    />
  ) : null;
};

export default withViewportUnits(LocationsList);
