import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilMobileAndroid from '@iconscout/react-native-unicons/icons/uil-mobile-android';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import React, { Fragment } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';
import ListItem from './ListItem';
import ListItemSeparator from './ListItemSeparator';

const PersonsList = ({
  allowDelete,
  allowSelection,
  allowUpdate,
  persons,
  deleteItem,
  disableDeleteImportedPersons,
  orderByLastUsage,
  selectedPersons,
  showCounter,
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

  const handleOnPressToggleSelection = (id) => {
    requestAnimationFrame(() => {
      toggleSelection(id);
    });
  };

  if (orderByLastUsage && persons) {
    persons.sort((a, b) => {
      const lastUsedA = a.lastUsed || 0;
      const lastUsedB = b.lastUsed || 0;

      if (lastUsedA > lastUsedB) {
        return -1;
      }

      if (lastUsedA < lastUsedB) {
        return 1;
      }

      const fullNameA = a.fullName.toLowerCase();
      const fullNameB = b.fullName.toLowerCase();

      if (fullNameA < fullNameB) {
        return -1;
      }

      if (fullNameA > fullNameB) {
        return 1;
      }

      return 0;
    });
  }

  let firstItemWithoutLastUsage = true;

  return persons ? (
    <FlatList
      data={persons}
      keyExtractor={({ id }) => id}
      renderItem={({ index, item: { counter, fullName, id, lastUsed, recordID } }) => {
        const allowPersonDelete = allowDelete && (recordID !== undefined ? !disableDeleteImportedPersons : true);
        const allowPersonUpdate = allowUpdate && recordID === undefined;
        const isPersonSelected = allowSelection && selectedPersons.includes(id);
        let showSeperator = false;

        if (!lastUsed && firstItemWithoutLastUsage) {
          firstItemWithoutLastUsage = false;
          showSeperator = index > 0;
        }

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

            {showCounter && (
              <View style={styles.viewCounter}>
                <Text style={styles.viewCounterText}>{counter}</Text>
              </View>
            )}
          </View>
        );

        return (
          <Fragment>
            {showSeperator && <ListItemSeparator />}

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
          </Fragment>
        );
      }}
      style={styles.personsList}
    />
  ) : null;
};

export default withViewportUnits(PersonsList);
