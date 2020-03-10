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

const LocationsList = ({ allowSelection, locations, selectedLocations, toggleSelection }) =>
  locations ? (
    <FlatList
      data={locations}
      keyExtractor={({ id }) => id}
      renderItem={({ item: { id, title } }) => {
        const isLocationSelected = allowSelection && selectedLocations.includes(id);

        return (
          <ListItem>
            <View style={styles.location}>
              <Text style={styles.locationText}>{title}</Text>

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
          </ListItem>
        );
      }}
      style={styles.locationsList}
    />
  ) : null;

export default LocationsList;
