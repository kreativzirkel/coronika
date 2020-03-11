import UilImport from '@iconscout/react-native-unicons/icons/uil-import';
import UilLocationPinAlt from '@iconscout/react-native-unicons/icons/uil-location-pin-alt';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
// import UilUsersAlt from '@iconscout/react-native-unicons/icons/uil-users-alt';
import UilUser from '@iconscout/react-native-unicons/icons/uil-user';
import moment from 'moment';
import React, { Fragment } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import ReactReduxContext from 'react-redux/lib/components/Context';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import { addContact, addLocation } from '../screens/Contacts/actions';
import { importContacts } from '../screens/Contacts/logic';
import ContactsList from '../widgets/ContactsList';
import DateTimePickerModal from '../widgets/DateTimePickerModal';
import LocationsList from '../widgets/LocationsList';
import SearchBar from '../widgets/SearchBar';
import TabBar from '../widgets/TabBar';
import TabBarItem from '../widgets/TabBarItem';

const TABS = {
  CONTACTS: 0,
  GROUPS: 1,
  LOCATIONS: 2,
};

class EntriesTabsView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();

    const { timestamp } = this.props;

    const now = moment();
    const selectLocationTimestamp = moment(timestamp || 0)
      .hours(now.hours())
      .minutes(now.minutes())
      .valueOf();

    this.state = {
      activeTab: TABS.CONTACTS,
      isModalNewContactVisible: false,
      isModalNewLocationVisible: false,
      isModalSelectLocationVisible: false,
      isModalSelectLocationTimestampVisible: false,
      newContactName: '',
      newContactPhone: '',
      newLocationDescription: '',
      newLocationTitle: '',
      searchValue: '',
      selectedEntries: {
        contacts: [],
        groups: [],
        locations: [],
      },
      selectLocationDescription: '',
      selectLocationId: '',
      selectLocationTimestamp,
      selectLocationTitle: '',
    };
  }

  onPressSearchIcon() {
    const { searchValue } = this.state;

    if (searchValue.length > 0) {
      this.setSearchValue('');
    } else {
      this.searchInput.current.focus();
    }
  }

  addNewContact() {
    const {
      store: { dispatch },
    } = this.context;
    const { newContactName, newContactPhone } = this.state;
    const contact = {
      fullName: newContactName,
      phoneNumbers: [{ label: 'phone', number: newContactPhone }],
    };

    dispatch(addContact(contact));

    this.closeModalNewContact();
  }

  addNewLocation() {
    const {
      store: { dispatch },
    } = this.context;
    const { newLocationDescription, newLocationTitle } = this.state;
    const location = { description: newLocationDescription, title: newLocationTitle };

    dispatch(addLocation(location));

    this.closeModalNewLocation();
  }

  addSelection() {
    const { addSelection } = this.props;
    const { selectedEntries } = this.state;

    if (addSelection) {
      addSelection(selectedEntries);
    }
  }

  importContacts() {
    const {
      store: { dispatch },
    } = this.context;

    dispatch(importContacts());
  }

  openModalNewContact() {
    this.setState({ isModalNewContactVisible: true, newContactName: '', newContactPhone: '' });
  }

  closeModalNewContact() {
    this.setState({ isModalNewContactVisible: false });
  }

  openModalNewLocation() {
    this.setState({ isModalNewLocationVisible: true, newLocationTitle: '' });
  }

  closeModalNewLocation() {
    this.setState({ isModalNewLocationVisible: false });
  }

  closeModalSelectLocation() {
    this.setState({ isModalSelectLocationVisible: false });
  }

  openModalSelectLocationTimestamp() {
    this.setState({ isModalSelectLocationTimestampVisible: true });
  }

  closeModalSelectLocationTimestamp() {
    this.setState({ isModalSelectLocationTimestampVisible: false });
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  setNewContactName(newContactName) {
    this.setState({ newContactName });
  }

  setNewContactPhone(newContactPhone) {
    this.setState({ newContactPhone });
  }

  setNewLocationDescription(newLocationDescription) {
    this.setState({ newLocationDescription });
  }

  setNewLocationTitle(newLocationTitle) {
    this.setState({ newLocationTitle });
  }

  setSearchValue(searchValue) {
    this.setState({ searchValue });
  }

  setSelectLocationDescription(selectLocationDescription) {
    this.setState({ selectLocationDescription });
  }

  setSelectLocationTimestamp(selectLocationTimestamp) {
    this.setState({ selectLocationTimestamp });
  }

  confirmSelectLocationTimestamp(selectLocationTimestamp) {
    const timestamp = moment(selectLocationTimestamp).valueOf();

    this.setSelectLocationTimestamp(timestamp);
    this.closeModalSelectLocationTimestamp();
  }

  toggleContactSelection(id) {
    const { selectedEntries } = this.state;
    let updatedSelection;

    if (selectedEntries.contacts.includes(id)) {
      updatedSelection = selectedEntries.contacts.filter((item) => item !== id);
    } else {
      updatedSelection = [...selectedEntries.contacts, id];
    }

    const updatedSelectedEntries = { ...selectedEntries, contacts: updatedSelection };

    this.setState({ selectedEntries: updatedSelectedEntries });
  }

  toggleLocationSelection(id) {
    const { locations } = this.props;
    const { selectedEntries } = this.state;

    if (selectedEntries.locations.find(({ id: locationId }) => locationId === id)) {
      const updatedSelection = selectedEntries.locations.filter(({ id: locationId }) => locationId !== id);

      const updatedSelectedEntries = { ...selectedEntries, locations: updatedSelection };

      this.setState({ selectedEntries: updatedSelectedEntries });
    } else {
      const { description, title } = locations.find(({ id: locationId }) => locationId === id);

      this.setState({
        isModalSelectLocationVisible: true,
        selectLocationDescription: description,
        selectLocationId: id,
        selectLocationTitle: title,
      });
    }
  }

  addLocationToSelectedLocations() {
    const { selectedEntries, selectLocationDescription, selectLocationId, selectLocationTimestamp } = this.state;
    const updatedSelection = [
      ...selectedEntries.locations,
      { id: selectLocationId, description: selectLocationDescription, timestamp: selectLocationTimestamp },
    ];
    const updatedSelectedEntries = { ...selectedEntries, locations: updatedSelection };

    this.setState({ isModalSelectLocationVisible: false, selectedEntries: updatedSelectedEntries });
  }

  render() {
    const {
      allowSelection,
      contacts,
      customContactsEmptyText,
      customLocationsEmptyText,
      deleteContactItem,
      deleteLocationItem,
      disableDeleteImportedContacts,
      hideCreateButton,
      locations,
      vw,
      __,
    } = this.props;
    const {
      activeTab,
      isModalNewContactVisible,
      isModalNewLocationVisible,
      isModalSelectLocationVisible,
      isModalSelectLocationTimestampVisible,
      newContactName,
      newContactPhone,
      newLocationDescription,
      newLocationTitle,
      searchValue,
      selectedEntries,
      selectLocationDescription,
      selectLocationTimestamp,
      selectLocationTitle,
    } = this.state;

    const buttonAddNewContactDisabled = newContactName.length < 3;
    const buttonAddNewLocationDisabled = newLocationTitle.length < 3;
    const buttonAddSelectionDisabled =
      allowSelection &&
      selectedEntries.contacts.length === 0 &&
      selectedEntries.groups.length === 0 &&
      selectedEntries.locations.length === 0;

    const selectionCounter =
      selectedEntries.contacts.length + selectedEntries.groups.length + selectedEntries.locations.length;

    const isSearchFilled = searchValue.trim().length > 0;
    const filteredContacts = isSearchFilled
      ? contacts.filter(({ fullName }) => fullName.toLowerCase().indexOf(searchValue.trim().toLowerCase()) !== -1)
      : contacts;
    const filteredLocations = isSearchFilled
      ? locations.filter(({ title }) => title.toLowerCase().indexOf(searchValue.trim().toLowerCase()) !== -1)
      : locations;

    // noinspection JSUnresolvedFunction
    const styles = StyleSheet.create({
      buttonAddSelection: {
        marginTop: 10,
      },
      buttonCreateNew: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
        marginTop: 24,
      },
      buttonCreateNewIcon: {
        marginRight: vw(1.5),
      },
      buttonCreateNewText: {
        color: COLOR_PRIMARY,
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(4.8),
        textTransform: 'lowercase',
      },
      contactsImportButton: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      contactsImportButtonIcon: {
        marginRight: vw(1.5),
      },
      contactsImportButtonText: {
        color: COLOR_PRIMARY,
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(4.5),
        textTransform: 'lowercase',
      },
      entriesEmptyWrapper: {
        flex: 1,
        padding: vw(10),
        paddingTop: vw(5),
        alignItems: 'center',
        justifyContent: 'center',
      },
      entriesEmptyText: {
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(4.4),
        marginBottom: vw(4.5),
        textAlign: 'center',
      },
      modal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      modalContent: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: vw(2.3),
        borderTopRightRadius: vw(2.3),
        padding: vw(3),
      },
      modalHeader: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: vw(4.5),
        paddingLeft: vw(3),
        paddingRight: vw(3),
        paddingTop: vw(2),
      },
      modalHeaderText: {
        fontFamily: 'JetBrainsMono-Bold',
        fontSize: vw(5),
        textTransform: 'lowercase',
      },
      modalTextInput: {
        backgroundColor: COLOR_SECONDARY,
        borderRadius: vw(2.3),
        color: '#000000',
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(4),
        height: vw(15),
        marginBottom: vw(4),
        padding: vw(4),
      },
      modalTextInputText: {
        color: '#000000',
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(4),
      },
      modalTimeInput: {
        backgroundColor: '#b0b0b1',
        borderRadius: vw(2.3),
      },
      modalButton: {
        alignItems: 'center',
        backgroundColor: COLOR_PRIMARY,
        borderRadius: vw(2.3),
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: vw(5),
        padding: vw(3.5),
      },
      modalButtonDisabled: {
        opacity: 0.2,
      },
      modalButtonText: {
        color: '#ffffff',
        fontFamily: 'JetBrainsMono-Bold',
        fontSize: vw(6),
        textTransform: 'lowercase',
      },
      modalButtonTextCounter: {
        alignSelf: 'flex-start',
        color: '#ffffff',
        fontFamily: 'JetBrainsMono-Bold',
        fontSize: vw(4),
        marginLeft: vw(1.5),
        textTransform: 'lowercase',
      },
      tabContentWrapper: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      },
    });

    return (
      <Fragment>
        <SearchBar
          onPressSearchIcon={() => this.onPressSearchIcon()}
          ref={this.searchInput}
          searchValue={searchValue}
          setSearchValue={(value) => this.setSearchValue(value)}
        />

        <TabBar>
          <TabBarItem
            active={activeTab === TABS.CONTACTS}
            counter={filteredContacts.length}
            counterVisible={isSearchFilled}
            icon={UilUser}
            label={__('contacts')}
            onPress={() => this.setActiveTab(TABS.CONTACTS)}
          />
          {/* groups are disabled for the moment */}
          {/* <TabBarItem active={activeTab === TABS.GROUPS} icon={UilUsersAlt} label={__('groups')} onPress={() => this.setActiveTab(TABS.GROUPS)} /> */}
          <TabBarItem
            active={activeTab === TABS.LOCATIONS}
            counter={filteredLocations.length}
            counterVisible={isSearchFilled}
            icon={UilLocationPinAlt}
            label={__('locations')}
            onPress={() => this.setActiveTab(TABS.LOCATIONS)}
          />
        </TabBar>

        <View style={styles.tabContentWrapper}>
          {activeTab === TABS.CONTACTS && (
            <Fragment>
              {!hideCreateButton && (
                <TouchableOpacity onPress={() => this.openModalNewContact()} style={styles.buttonCreateNew}>
                  <UilPlus color={COLOR_PRIMARY} size={vw(5.5)} style={styles.buttonCreateNewIcon} />
                  <Text style={styles.buttonCreateNewText}>{__('entries.contacts.list.new')}</Text>
                </TouchableOpacity>
              )}

              {filteredContacts && filteredContacts.length ? (
                <ContactsList
                  allowDelete={typeof deleteContactItem === 'function'}
                  allowSelection={allowSelection}
                  contacts={filteredContacts}
                  deleteItem={(id) => deleteContactItem(id)}
                  disableDeleteImportedContacts={disableDeleteImportedContacts}
                  selectedContacts={selectedEntries.contacts}
                  toggleSelection={(id) => this.toggleContactSelection(id)}
                />
              ) : (
                <View style={styles.entriesEmptyWrapper}>
                  {isSearchFilled ? (
                    <Text style={styles.entriesEmptyText}>{__('entries.search.list.empty')}</Text>
                  ) : (
                    <Fragment>
                      {customContactsEmptyText ? (
                        <Text style={styles.entriesEmptyText}>{customContactsEmptyText}</Text>
                      ) : (
                        <Fragment>
                          <Text style={styles.entriesEmptyText}>{__('entries.contacts.list.empty')}</Text>
                          <TouchableOpacity onPress={() => this.importContacts()} style={styles.contactsImportButton}>
                            <UilImport color={COLOR_PRIMARY} size={vw(5.5)} style={styles.contactsImportButtonIcon} />
                            <Text style={styles.contactsImportButtonText}>
                              {__('entries.contacts.list.import.button')}
                            </Text>
                          </TouchableOpacity>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </View>
              )}
            </Fragment>
          )}

          {activeTab === TABS.GROUPS && <Fragment />}

          {activeTab === TABS.LOCATIONS && (
            <Fragment>
              {!hideCreateButton && (
                <TouchableOpacity onPress={() => this.openModalNewLocation()} style={styles.buttonCreateNew}>
                  <UilPlus color={COLOR_PRIMARY} size={vw(5.5)} style={styles.buttonCreateNewIcon} />
                  <Text style={styles.buttonCreateNewText}>{__('entries.locations.list.new')}</Text>
                </TouchableOpacity>
              )}

              {filteredLocations && filteredLocations.length > 0 ? (
                <LocationsList
                  allowDelete={typeof deleteLocationItem === 'function'}
                  allowSelection={allowSelection}
                  deleteItem={(id, description, time) => deleteLocationItem(id, description, time)}
                  selectedLocations={selectedEntries.locations}
                  toggleSelection={(id) => this.toggleLocationSelection(id)}
                  locations={filteredLocations}
                />
              ) : (
                <View style={styles.entriesEmptyWrapper}>
                  <Text style={styles.entriesEmptyText}>
                    {customLocationsEmptyText ? customLocationsEmptyText : __('entries.locations.list.empty')}
                  </Text>
                </View>
              )}
            </Fragment>
          )}

          {allowSelection && (
            <TouchableOpacity disabled={buttonAddSelectionDisabled} onPress={() => this.addSelection()}>
              <View
                style={{
                  ...styles.modalButton,
                  ...(buttonAddSelectionDisabled && styles.modalButtonDisabled),
                  ...styles.buttonAddSelection,
                }}>
                <Text style={styles.modalButtonText}>{__('entries.selection.add')}</Text>
                <Text style={styles.modalButtonTextCounter}>{`(${selectionCounter})`}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <Modal isVisible={isModalNewContactVisible} style={styles.modal}>
          <KeyboardAvoidingView behavior={'padding'} enabled style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{__('entries.modals.new-contact.headline')}</Text>
              <TouchableOpacity onPress={() => this.closeModalNewContact()}>
                <UilTimes size={vw(9)} color={COLOR_PRIMARY} />
              </TouchableOpacity>
            </View>

            <TextInput
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={(value) => this.setNewContactName(value)}
              placeholder={__('entries.modals.new-contact.placeholder.name').toLowerCase()}
              placeholderTextColor={'#B0B0B1'}
              style={styles.modalTextInput}
              textContentType={'none'}
              value={newContactName}
            />

            <TextInput
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={(value) => this.setNewContactPhone(value)}
              keyboardType={'phone-pad'}
              placeholder={__('entries.modals.new-contact.placeholder.phone-number').toLowerCase()}
              placeholderTextColor={'#B0B0B1'}
              style={styles.modalTextInput}
              textContentType={'none'}
              value={newContactPhone}
            />

            <TouchableOpacity disabled={buttonAddNewContactDisabled} onPress={() => this.addNewContact()}>
              <View style={{ ...styles.modalButton, ...(buttonAddNewContactDisabled && styles.modalButtonDisabled) }}>
                <Text style={styles.modalButtonText}>{__('entries.modals.new-contact.button')}</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={isModalNewLocationVisible} style={styles.modal}>
          <KeyboardAvoidingView behavior={'padding'} enabled style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{__('entries.modals.new-location.headline')}</Text>
              <TouchableOpacity onPress={() => this.closeModalNewLocation()}>
                <UilTimes size={vw(9)} color={COLOR_PRIMARY} />
              </TouchableOpacity>
            </View>

            <TextInput
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={(value) => this.setNewLocationTitle(value)}
              placeholder={__('entries.modals.new-location.placeholder.title').toLowerCase()}
              placeholderTextColor={'#B0B0B1'}
              style={styles.modalTextInput}
              textContentType={'none'}
              value={newLocationTitle}
            />

            <TextInput
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={(value) => this.setNewLocationDescription(value)}
              placeholder={__('entries.modals.new-location.placeholder.description').toLowerCase()}
              placeholderTextColor={'#B0B0B1'}
              style={styles.modalTextInput}
              textContentType={'none'}
              value={newLocationDescription}
            />

            <TouchableOpacity disabled={buttonAddNewLocationDisabled} onPress={() => this.addNewLocation()}>
              <View style={{ ...styles.modalButton, ...(buttonAddNewLocationDisabled && styles.modalButtonDisabled) }}>
                <Text style={styles.modalButtonText}>{__('entries.modals.new-location.button')}</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={isModalSelectLocationVisible} style={styles.modal}>
          <KeyboardAvoidingView behavior={'padding'} enabled style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{__('entries.modals.select-location.headline')}</Text>
              <TouchableOpacity onPress={() => this.closeModalSelectLocation()}>
                <UilTimes size={vw(9)} color={COLOR_PRIMARY} />
              </TouchableOpacity>
            </View>

            <TextInput
              autoCompleteType={'off'}
              autoCorrect={false}
              editable={false}
              style={styles.modalTextInput}
              textContentType={'none'}
              value={selectLocationTitle}
            />

            <TextInput
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={(value) => this.setSelectLocationDescription(value)}
              placeholder={__('entries.modals.select-location.placeholder.description').toLowerCase()}
              placeholderTextColor={'#B0B0B1'}
              style={styles.modalTextInput}
              textContentType={'none'}
              value={selectLocationDescription}
            />

            <TouchableOpacity onPress={() => this.openModalSelectLocationTimestamp()}>
              <View style={styles.modalTextInput}>
                <Text style={styles.modalTextInputText}>{moment(selectLocationTimestamp).format('LT')}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.modalTimeInput}>
              <DateTimePickerModal
                cancelTextIOS={__('Cancel')}
                confirmTextIOS={__('Confirm')}
                customHeaderIOS={() => <View />}
                date={new Date(selectLocationTimestamp)}
                headerTextIOS={''}
                isVisible={isModalSelectLocationTimestampVisible}
                mode={'time'}
                onCancel={() => this.closeModalSelectLocationTimestamp()}
                onConfirm={(value) => this.confirmSelectLocationTimestamp(value)}
              />
            </View>

            <TouchableOpacity onPress={() => this.addLocationToSelectedLocations()}>
              <View style={styles.modalButton}>
                <Text style={styles.modalButtonText}>{__('entries.modals.select-location.button')}</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>
      </Fragment>
    );
  }
}

EntriesTabsView.contextType = ReactReduxContext;

export default withI18n(withViewportUnits(EntriesTabsView));
