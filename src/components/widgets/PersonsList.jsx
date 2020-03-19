import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilMobileAndroid from '@iconscout/react-native-unicons/icons/uil-mobile-android';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';
import ListItem from './ListItem';

const PersonsList = ({
  allowDelete,
  allowSelection,
  allowUpdate,
  persons,
  deleteItem,
  disableDeleteImportedPersons,
  selectedPersons,
  toggleSelection,
  updateItem,
  vw,
}) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    person: {
      backgroundColor: COLOR_SECONDARY,
      borderRadius: vw(2.3),
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: vw(2.5),
      marginRight: vw(2.5),
      marginTop: vw(2.3),
      padding: vw(3),
      paddingBottom: vw(3.8),
      paddingTop: vw(3.8),
    },
    personText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.2),
    },
    personTextIconImported: {
      marginLeft: vw(1.5),
    },
    personTextWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    personsList: {
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

  const handleOnPressToggleSelection = (id) => {
    requestAnimationFrame(() => {
      toggleSelection(id);
    });
  };

  return persons ? (
    <FlatList
      data={persons}
      keyExtractor={({ id }) => id}
      renderItem={({ item: { fullName, id, recordID } }) => {
        const allowPersonDelete = allowDelete && (recordID !== undefined ? !disableDeleteImportedPersons : true);
        const allowPersonUpdate = allowUpdate && recordID === undefined;
        const isPersonSelected = allowSelection && selectedPersons.includes(id);

        const PersonItem = () => (
          <View style={styles.person}>
            <View style={styles.personTextWrapper}>
              <Text style={styles.personText}>{fullName}</Text>

              {recordID !== undefined && (
                <View style={styles.personTextIconImported}>
                  <UilMobileAndroid color={'#b0b0b0'} size={vw(5)} />
                </View>
              )}
            </View>

            {allowSelection && (
              <View style={styles.selectButton}>
                <View
                  style={{
                    ...styles.selectButtonInner,
                    ...(isPersonSelected && styles.selectButtonInnerSelected),
                  }}>
                  {isPersonSelected ? (
                    <UilMinus size={vw(7)} color={'#ffffff'} />
                  ) : (
                    <UilPlus size={vw(7)} color={COLOR_PRIMARY} />
                  )}
                </View>
              </View>
            )}
          </View>
        );

        return (
          <ListItem allowDelete={allowPersonDelete} deleteItem={() => deleteItem(id)}>
            {allowPersonUpdate ? (
              <TouchableOpacity onPress={() => updateItem(id)}>
                <PersonItem />
              </TouchableOpacity>
            ) : allowSelection ? (
              <TouchableOpacity onPress={() => handleOnPressToggleSelection(id)}>
                <PersonItem />
              </TouchableOpacity>
            ) : (
              <PersonItem />
            )}
          </ListItem>
        );
      }}
      style={styles.personsList}
    />
  ) : null;
};

export default withViewportUnits(PersonsList);
