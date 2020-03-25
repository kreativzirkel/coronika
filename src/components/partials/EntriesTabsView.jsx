import UilImport from '@iconscout/react-native-unicons/icons/uil-import';
import UilLocationPinAlt from '@iconscout/react-native-unicons/icons/uil-location-pin-alt';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
// import UilUsersAlt from '@iconscout/react-native-unicons/icons/uil-users-alt';
import UilUser from '@iconscout/react-native-unicons/icons/uil-user';
import deepEqual from 'fast-deep-equal/es6';
import moment from 'moment';
import React, { Fragment } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import ReactReduxContext from 'react-redux/lib/components/Context';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import { addPerson, addLocation, updatePerson, updateLocation } from '../screens/Directory/actions';
import { importPersons } from '../screens/Directory/logic';
import PersonsList from '../widgets/PersonsList';
import DateTimePickerModal from '../widgets/DateTimePickerModal';
import LocationsList from '../widgets/LocationsList';
import SearchBar from '../widgets/SearchBar';
import TabBar from '../widgets/TabBar';
import TabBarItem from '../widgets/TabBarItem';

const TABS = {
  PERSONS: 0,
  GROUPS: 1,
  LOCATIONS: 2,
};

const setActiveTabAction = (activeTab) => ({ type: 'SET_ACTIVE_TAB_ENTRIES_TABS_VIEW', activeTab });

const initialState = {
  activeTab: TABS.PERSONS,
};

export const reducer = (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB_ENTRIES_TABS_VIEW':
      return { ...state, activeTab: action.activeTab };

    default:
      return state;
  }
};

class EntriesTabsView extends React.Component {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();

    const { timestamp, showLocationsOnly, showPersonsOnly } = this.props;

    const now = moment();
    const selectLocationTimestamp = moment(timestamp || 0)
      .hours(now.hours())
      .minutes(now.minutes())
      .valueOf();

    let activeTab = TABS.PERSONS;

    if (showLocationsOnly) {
      activeTab = TABS.LOCATIONS;
    }

    if (showPersonsOnly) {
      activeTab = TABS.PERSONS;
    }

    this.state = {
      activeTab,
      editPersonId: '',
      editLocationId: '',
      isModalNewPersonVisible: false,
      isModalNewLocationVisible: false,
      isModalSelectLocationVisible: false,
      isModalSelectLocationTimestampVisible: false,
      isUpdatePersonMode: false,
      isUpdateLocationMode: false,
      newPersonName: '',
      newPersonPhone: '',
      newLocationDescription: '',
      newLocationTitle: '',
      searchValue: '',
      selectedEntries: {
        persons: [],
        groups: [],
        locations: [],
      },
      selectLocationDescription: '',
      selectLocationId: '',
      selectLocationTimestamp,
      selectLocationTitle: '',
    };
  }

  componentDidMount() {
    const { showLocationsOnly, showPersonsOnly } = this.props;

    if (!showLocationsOnly && !showPersonsOnly) {
      const {
        store: { getState },
      } = this.context;

      const {
        entriesTabsView: { activeTab },
      } = getState();

      this.setActiveTab(activeTab);
    } else {
      const { activeTab } = this.state;

      this.setActiveTab(activeTab);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.activeTab !== nextState.activeTab) return true;

    if (this.props.persons !== nextProps.persons) return true;

    if (this.props.locations !== nextProps.locations) return true;

    if (this.props.customPersonsEmptyText !== nextProps.customPersonsEmptyText) return true;

    if (this.props.customLocationsEmptyText !== nextProps.customLocationsEmptyText) return true;

    if (!deepEqual(this.state, nextState)) return true;

    if (!deepEqual(this.props, nextProps)) return true;

    return false;
  }

  onPressSearchIcon() {
    const { searchValue } = this.state;

    if (searchValue.length > 0) {
      this.setSearchValue('');
    } else {
      this.searchInput.current.focus();
    }
  }

  async addNewPerson() {
    const {
      store: { dispatch, getState },
    } = this.context;
    const { allowSelection } = this.props;
    const { newPersonName, newPersonPhone } = this.state;
    const person = {
      fullName: newPersonName,
      phoneNumbers: [{ label: 'phone', number: newPersonPhone }],
    };

    await dispatch(await addPerson(person));

    if (allowSelection) {
      const {
        directory: { persons },
      } = getState();

      const addedPerson = persons.find(
        ({ fullName, phoneNumbers }) => fullName === newPersonName && phoneNumbers[0].number === newPersonPhone
      );

      if (addedPerson) {
        this.togglePersonSelection(addedPerson.id);
      }
    }

    this.closeModalNewPerson();
  }

  async addNewLocation() {
    const {
      store: { dispatch, getState },
    } = this.context;
    const { allowSelection } = this.props;
    const { newLocationDescription, newLocationTitle } = this.state;
    const location = { description: newLocationDescription, title: newLocationTitle };

    await dispatch(await addLocation(location));

    this.closeModalNewLocation();

    if (allowSelection) {
      const {
        directory: { locations },
      } = getState();

      const addedLocation = locations.find(
        ({ description, title }) => description === newLocationDescription && title === newLocationTitle
      );

      if (addedLocation) {
        // timeout is necessary because of waiting for other modal to close before opening a new one
        setTimeout(() => this.toggleLocationSelection(addedLocation.id), 500);
      }
    }
  }

  addSelection() {
    const { addSelection } = this.props;
    const { selectedEntries } = this.state;

    if (addSelection) {
      addSelection(selectedEntries);
    }
  }

  importPersons() {
    const {
      store: { dispatch },
    } = this.context;

    dispatch(importPersons());
  }

  openModalNewPerson() {
    this.setState({
      isUpdatePersonMode: false,
      isModalNewPersonVisible: true,
      newPersonName: '',
      newPersonPhone: '',
    });
  }

  closeModalNewPerson() {
    this.setState({ isModalNewPersonVisible: false });
  }

  openModalNewLocation() {
    this.setState({
      isUpdateLocationMode: false,
      isModalNewLocationVisible: true,
      newLocationDescription: '',
      newLocationTitle: '',
    });
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

    const {
      store: { dispatch },
    } = this.context;

    dispatch(setActiveTabAction(activeTab));
  }

  setNewPersonName(newPersonName) {
    this.setState({ newPersonName });
  }

  setNewPersonPhone(newPersonPhone) {
    this.setState({ newPersonPhone });
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

  togglePersonSelection(id) {
    const { selectedEntries } = this.state;
    let updatedSelection;

    if (selectedEntries.persons.includes(id)) {
      updatedSelection = selectedEntries.persons.filter((item) => item !== id);
    } else {
      updatedSelection = [...selectedEntries.persons, id];
    }

    const updatedSelectedEntries = { ...selectedEntries, persons: updatedSelection };

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

  editPerson(editPersonId) {
    const { persons } = this.props;
    const { fullName: newPersonName, phoneNumbers } = persons.find(({ id }) => id === editPersonId);
    const newPersonPhone = phoneNumbers[0]?.number || '';
    this.setState({
      editPersonId,
      isUpdatePersonMode: true,
      isModalNewPersonVisible: true,
      newPersonName,
      newPersonPhone,
    });
  }

  updatePerson() {
    const {
      store: { dispatch },
    } = this.context;
    const { editPersonId, newPersonName, newPersonPhone } = this.state;
    const person = {
      id: editPersonId,
      fullName: newPersonName,
      phoneNumbers: [{ label: 'phone', number: newPersonPhone }],
    };

    dispatch(updatePerson(person));

    this.setState({ isUpdatePersonMode: false, isModalNewPersonVisible: false });
  }

  editLocation(editLocationId) {
    const { locations } = this.props;
    const { description: newLocationDescription, title: newLocationTitle } = locations.find(
      ({ id }) => id === editLocationId
    );
    this.setState({
      editLocationId,
      isUpdateLocationMode: true,
      isModalNewLocationVisible: true,
      newLocationDescription,
      newLocationTitle,
    });
  }

  updateLocation() {
    const {
      store: { dispatch },
    } = this.context;
    const { editLocationId, newLocationDescription, newLocationTitle } = this.state;
    const location = { description: newLocationDescription, id: editLocationId, title: newLocationTitle };

    dispatch(updateLocation(location));

    this.setState({ isUpdateLocationMode: false, isModalNewLocationVisible: false });
  }

  render() {
    const {
      allowSelection,
      allowUpdate,
      persons,
      customPersonsEmptyText,
      customLocationsEmptyText,
      deletePersonItem,
      deleteLocationItem,
      disableDeleteImportedPersons,
      hideCreateButton,
      hideTabBar,
      locations,
      orderByLastUsage,
      showCounter,
      vw,
      __,
    } = this.props;
    const {
      isModalNewPersonVisible,
      isModalNewLocationVisible,
      isModalSelectLocationVisible,
      isModalSelectLocationTimestampVisible,
      isUpdatePersonMode,
      isUpdateLocationMode,
      newPersonName,
      newPersonPhone,
      newLocationDescription,
      newLocationTitle,
      searchValue,
      selectedEntries,
      selectLocationDescription,
      selectLocationTimestamp,
      selectLocationTitle,
    } = this.state;

    const {
      store: { getState },
    } = this.context;

    const {
      entriesTabsView: { activeTab },
    } = getState();

    const buttonAddNewPersonDisabled = newPersonName.length < 3;
    const buttonAddNewLocationDisabled = newLocationTitle.length < 3;
    const buttonAddSelectionDisabled =
      allowSelection &&
      selectedEntries.persons.length === 0 &&
      selectedEntries.groups.length === 0 &&
      selectedEntries.locations.length === 0;

    const selectionCounter =
      selectedEntries.persons.length + selectedEntries.groups.length + selectedEntries.locations.length;

    const isSearchFilled = searchValue.trim().length > 0;
    const filteredPersons = isSearchFilled
      ? persons.filter(({ fullName }) => fullName.toLowerCase().indexOf(searchValue.trim().toLowerCase()) !== -1)
      : persons;
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
      personsImportButton: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      personsImportButtonIcon: {
        marginRight: vw(1.5),
      },
      personsImportButtonText: {
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

    const keyboardAvoidingViewBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

    return (
      <Fragment>
        <SearchBar
          onPressSearchIcon={() => this.onPressSearchIcon()}
          ref={this.searchInput}
          searchValue={searchValue}
          setSearchValue={(value) => this.setSearchValue(value)}
        />

        {!hideTabBar && (
          <TabBar>
            <TabBarItem
              active={activeTab === TABS.PERSONS}
              counter={filteredPersons.length}
              counterVisible={isSearchFilled}
              icon={UilUser}
              label={__('persons')}
              onPress={() => this.setActiveTab(TABS.PERSONS)}
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
        )}

        <View style={styles.tabContentWrapper}>
          {activeTab === TABS.PERSONS && (
            <Fragment>
              {!hideCreateButton && (
                <TouchableOpacity onPress={() => this.openModalNewPerson()} style={styles.buttonCreateNew}>
                  <UilPlus color={COLOR_PRIMARY} size={vw(5.5)} style={styles.buttonCreateNewIcon} />
                  <Text style={styles.buttonCreateNewText}>{__('entries.persons.list.new')}</Text>
                </TouchableOpacity>
              )}

              {filteredPersons && filteredPersons.length ? (
                <PersonsList
                  allowDelete={typeof deletePersonItem === 'function'}
                  allowSelection={allowSelection}
                  allowUpdate={allowUpdate}
                  persons={filteredPersons}
                  deleteItem={(id) => deletePersonItem(id)}
                  disableDeleteImportedPersons={disableDeleteImportedPersons}
                  orderByLastUsage={orderByLastUsage}
                  selectedPersons={selectedEntries.persons}
                  showCounter={showCounter}
                  toggleSelection={(id) => this.togglePersonSelection(id)}
                  updateItem={(id) => this.editPerson(id)}
                />
              ) : (
                <View style={styles.entriesEmptyWrapper}>
                  {isSearchFilled ? (
                    <Text style={styles.entriesEmptyText}>{__('entries.search.list.empty')}</Text>
                  ) : (
                    <Fragment>
                      {customPersonsEmptyText ? (
                        <Text style={styles.entriesEmptyText}>{customPersonsEmptyText}</Text>
                      ) : (
                        <Fragment>
                          <Text style={styles.entriesEmptyText}>{__('entries.persons.list.empty')}</Text>
                          <TouchableOpacity onPress={() => this.importPersons()} style={styles.personsImportButton}>
                            <UilImport color={COLOR_PRIMARY} size={vw(5.5)} style={styles.personsImportButtonIcon} />
                            <Text style={styles.personsImportButtonText}>
                              {__('entries.persons.list.import.button')}
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
                  allowUpdate={allowUpdate}
                  deleteItem={(id, description, time) => deleteLocationItem(id, description, time)}
                  locations={filteredLocations}
                  orderByLastUsage={orderByLastUsage}
                  selectedLocations={selectedEntries.locations}
                  showCounter={showCounter}
                  toggleSelection={(id) => this.toggleLocationSelection(id)}
                  updateItem={(id) => this.editLocation(id)}
                />
              ) : (
                <View style={styles.entriesEmptyWrapper}>
                  {isSearchFilled ? (
                    <Text style={styles.entriesEmptyText}>{__('entries.search.list.empty')}</Text>
                  ) : (
                    <Text style={styles.entriesEmptyText}>
                      {customLocationsEmptyText ? customLocationsEmptyText : __('entries.locations.list.empty')}
                    </Text>
                  )}
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

        <Modal isVisible={isModalNewPersonVisible} style={styles.modal}>
          <KeyboardAvoidingView behavior={keyboardAvoidingViewBehavior} enabled style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>
                {isUpdatePersonMode
                  ? __('entries.modals.update-person.headline')
                  : __('entries.modals.new-person.headline')}
              </Text>
              <TouchableOpacity onPress={() => this.closeModalNewPerson()}>
                <UilTimes size={vw(9)} color={COLOR_PRIMARY} />
              </TouchableOpacity>
            </View>

            <TextInput
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={(value) => this.setNewPersonName(value)}
              placeholder={__('entries.modals.new-person.placeholder.name').toLowerCase()}
              placeholderTextColor={'#B0B0B1'}
              style={styles.modalTextInput}
              textContentType={'none'}
              value={newPersonName}
            />

            <TextInput
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={(value) => this.setNewPersonPhone(value)}
              keyboardType={'phone-pad'}
              placeholder={__('entries.modals.new-person.placeholder.phone-number').toLowerCase()}
              placeholderTextColor={'#B0B0B1'}
              style={styles.modalTextInput}
              textContentType={'none'}
              value={newPersonPhone}
            />

            <TouchableOpacity
              disabled={buttonAddNewPersonDisabled}
              onPress={() => (isUpdatePersonMode ? this.updatePerson() : this.addNewPerson())}>
              <View style={{ ...styles.modalButton, ...(buttonAddNewPersonDisabled && styles.modalButtonDisabled) }}>
                <Text style={styles.modalButtonText}>
                  {isUpdatePersonMode
                    ? __('entries.modals.update-person.button')
                    : __('entries.modals.new-person.button')}
                </Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={isModalNewLocationVisible} style={styles.modal}>
          <KeyboardAvoidingView behavior={keyboardAvoidingViewBehavior} enabled style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>
                {isUpdateLocationMode
                  ? __('entries.modals.update-location.headline')
                  : __('entries.modals.new-location.headline')}
              </Text>
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

            <TouchableOpacity
              disabled={buttonAddNewLocationDisabled}
              onPress={() => (isUpdateLocationMode ? this.updateLocation() : this.addNewLocation())}>
              <View style={{ ...styles.modalButton, ...(buttonAddNewLocationDisabled && styles.modalButtonDisabled) }}>
                <Text style={styles.modalButtonText}>
                  {isUpdateLocationMode
                    ? __('entries.modals.update-location.button')
                    : __('entries.modals.new-location.button')}
                </Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>

        <Modal isVisible={isModalSelectLocationVisible} style={styles.modal}>
          <KeyboardAvoidingView behavior={keyboardAvoidingViewBehavior} enabled style={styles.modalContent}>
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
