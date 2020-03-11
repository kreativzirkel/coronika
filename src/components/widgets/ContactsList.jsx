import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilMobileAndroid from '@iconscout/react-native-unicons/icons/uil-mobile-android';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withViewportUnits from '../../utils/withViewportUnits';
import ListItem from './ListItem';

const ContactsList = ({
  allowDelete,
  allowSelection,
  contacts,
  deleteItem,
  disableDeleteImportedContacts,
  selectedContacts,
  toggleSelection,
  vw,
}) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    contact: {
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
    contactText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.2),
    },
    contactTextIconImported: {
      marginLeft: vw(1.5),
    },
    contactTextWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    contactsList: {
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

  return contacts ? (
    <FlatList
      data={contacts}
      keyExtractor={({ id }) => id}
      renderItem={({ item: { fullName, id, recordID } }) => {
        const allowContactDelete = allowDelete && (recordID !== undefined ? !disableDeleteImportedContacts : true);
        const isContactSelected = allowSelection && selectedContacts.includes(id);

        return (
          <ListItem allowDelete={allowContactDelete} deleteItem={() => deleteItem(id)}>
            <View style={styles.contact}>
              <View style={styles.contactTextWrapper}>
                <Text style={styles.contactText}>{fullName}</Text>

                {recordID !== undefined && (
                  <View style={styles.contactTextIconImported}>
                    <UilMobileAndroid color={'#b0b0b0'} size={vw(5)} />
                  </View>
                )}
              </View>

              {allowSelection && (
                <TouchableOpacity onPress={() => toggleSelection(id)} style={styles.selectButton}>
                  <View
                    style={{ ...styles.selectButtonInner, ...(isContactSelected && styles.selectButtonInnerSelected) }}>
                    {isContactSelected ? (
                      <UilMinus size={vw(7)} color={'#ffffff'} />
                    ) : (
                      <UilPlus size={vw(7)} color={COLOR_PRIMARY} />
                    )}
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </ListItem>
        );
      }}
      style={styles.contactsList}
    />
  ) : null;
};

export default withViewportUnits(ContactsList);
