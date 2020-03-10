import UilMinus from '@iconscout/react-native-unicons/icons/uil-minus';
import UilMobileAndroid from '@iconscout/react-native-unicons/icons/uil-mobile-android';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import ListItem from './ListItem';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  contact: {
    backgroundColor: COLOR_SECONDARY,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    padding: 12,
    paddingBottom: 15,
    paddingTop: 15,
  },
  contactText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 15,
  },
  contactTextIconImported: {
    marginLeft: 5,
  },
  contactTextWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  contactsList: {
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

const ContactsList = ({
  allowDelete,
  allowSelection,
  contacts,
  deleteItem,
  disableDeleteImportedContacts,
  selectedContacts,
  toggleSelection,
}) =>
  contacts ? (
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
                    <UilMobileAndroid color={'#b0b0b0'} size={18} />
                  </View>
                )}
              </View>

              {allowSelection && (
                <TouchableOpacity onPress={() => toggleSelection(id)} style={styles.selectButton}>
                  <View
                    style={{ ...styles.selectButtonInner, ...(isContactSelected && styles.selectButtonInnerSelected) }}>
                    {isContactSelected ? (
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
      style={styles.contactsList}
    />
  ) : null;

export default ContactsList;
