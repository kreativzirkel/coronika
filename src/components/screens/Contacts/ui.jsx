import UilImport from '@iconscout/react-native-unicons/icons/uil-import';
import UilLocationPinAlt from '@iconscout/react-native-unicons/icons/uil-location-pin-alt';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import UilSearch from '@iconscout/react-native-unicons/icons/uil-search';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import UilUser from '@iconscout/react-native-unicons/icons/uil-user';
import UilUsersAlt from '@iconscout/react-native-unicons/icons/uil-users-alt';
import React, { Fragment } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../../constants';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import TabBar from '../../widgets/TabBar';
import TabBarItem from '../../widgets/TabBarItem';

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  buttonCreateNew: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 24,
  },
  buttonCreateNewIcon: {
    marginRight: 5,
  },
  buttonCreateNewText: {
    color: COLOR_PRIMARY,
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 17,
  },
  contact: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    padding: 12,
    paddingBottom: 15,
    paddingTop: 15,
  },
  contactText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 15,
  },
  contactsList: {
    flex: 1,
    width: '100%',
  },
  contactsImportWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  contactsImportHeadline: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 26,
    marginBottom: 10,
  },
  contactsImportText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  contactsImportButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contactsImportButtonIcon: {
    marginRight: 5,
  },
  contactsImportButtonText: {
    color: COLOR_PRIMARY,
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 18,
  },
  headerHeadline: {
    alignSelf: 'flex-end',
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 18,
    textTransform: 'lowercase',
  },
  safeAreaView: {
    backgroundColor: COLOR_SECONDARY,
    flex: 1,
  },
  searchIcon: {
    alignItems: 'center',
    bottom: 0,
    height: '100%',
    justifyContent: 'center',
    margin: 'auto',
    position: 'absolute',
    right: 20,
    top: 0,
    width: 30,
    zIndex: 2,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    color: '#000000',
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 16,
    height: 50,
    margin: 10,
    padding: 15,
    zIndex: 1,
  },
  searchWrapper: {
    width: '100%',
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  viewWrapper: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});

const searchInput = React.createRef();

const Contacts = ({ activeTab, contacts, searchValue, importContacts, setActiveTab, setSearchValue }) => {
  const onPressSearchIcon = () => {
    if (searchValue.length > 0) {
      setSearchValue('');
    } else {
      searchInput.current.focus();
    }
  };

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <View style={styles.view}>
        <Header>
          <Text style={styles.headerHeadline}>Manage contacts</Text>
        </Header>

        <View style={styles.searchWrapper}>
          <TouchableOpacity onPress={() => onPressSearchIcon()} style={styles.searchIcon}>
            {searchValue.length > 0 ? (
              <UilTimes size={30} color={COLOR_PRIMARY} />
            ) : (
              <UilSearch size={30} color={COLOR_PRIMARY} />
            )}
          </TouchableOpacity>

          <TextInput
            autoCompleteType={'off'}
            autoCorrect={false}
            onChangeText={(val) => setSearchValue(val)}
            /* onSubmitEditing={() => this.onSubmitEditing()} */
            placeholder={'Suche'}
            placeholderTextColor={'#B0B0B1'}
            ref={searchInput}
            returnKeyType={'search'}
            style={styles.searchInput}
            textContentType={'none'}
            value={searchValue}
          />
        </View>

        <TabBar>
          <TabBarItem active={activeTab === 0} icon={UilUser} label={'Contacts'} onPress={() => setActiveTab(0)} />
          <TabBarItem active={activeTab === 1} icon={UilUsersAlt} label={'Groups'} onPress={() => setActiveTab(1)} />
          <TabBarItem
            active={activeTab === 2}
            icon={UilLocationPinAlt}
            label={'Locations'}
            onPress={() => setActiveTab(2)}
          />
        </TabBar>

        <View style={styles.viewWrapper}>
          {activeTab === 0 && (
            <Fragment>
              <TouchableOpacity style={styles.buttonCreateNew}>
                <UilPlus color={COLOR_PRIMARY} size={20} style={styles.buttonCreateNewIcon} />
                <Text style={styles.buttonCreateNewText}>Neuen Kontakt erstellen</Text>
              </TouchableOpacity>

              {contacts.length > 0 ? (
                <FlatList
                  data={contacts}
                  keyExtractor={({ id }) => id}
                  renderItem={({ item: { fullName } }) => (
                    <View style={styles.contact}>
                      <Text style={styles.contactText}>{fullName}</Text>
                    </View>
                  )}
                  style={styles.contactsList}
                />
              ) : (
                <View style={styles.contactsImportWrapper}>
                  <Text style={styles.contactsImportHeadline}>Keine Kontakte?</Text>
                  <Text style={styles.contactsImportText}>
                    Du hast noch keine Kontakt angelegt. Um direkt loszulegen, kannst du deine Kontakte importieren.
                  </Text>
                  <TouchableOpacity onPress={() => importContacts()} style={styles.contactsImportButton}>
                    <UilImport color={COLOR_PRIMARY} size={22} style={styles.contactsImportButtonIcon} />
                    <Text style={styles.contactsImportButtonText}>Jetzt importieren</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Fragment>
          )}
        </View>
      </View>
    </Layout>
  );
};

export default Contacts;
