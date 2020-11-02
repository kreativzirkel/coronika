import UilImport from '@iconscout/react-native-unicons/icons/uil-import';
import UilLocationPinAlt from '@iconscout/react-native-unicons/icons/uil-location-pin-alt';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
// import UilUsersAlt from '@iconscout/react-native-unicons/icons/uil-users-alt';
import UilUser from '@iconscout/react-native-unicons/icons/uil-user';
import deepEqual from 'fast-deep-equal/es6';
import moment from 'moment';
import React, { Fragment } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import ReactReduxContext from 'react-redux/lib/components/Context';
import { COLOR_PRIMARY } from '../../../constants';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import { addPerson, addLocation, updatePerson, updateLocation } from '../../screens/Directory/actions';
import importPersons from '../../screens/Directory/importPersons';
import PersonsList from '../../widgets/PersonsList';
import LocationsList from '../../widgets/LocationsList';
import SearchBar from '../../widgets/SearchBar';
import TabBar from '../../widgets/TabBar';
import TabBarItem from '../../widgets/TabBarItem';
import { ModalLocation, ModalLocationMore, ModalLocationSelection, ModalPerson, ModalPersonMore } from './Modals';

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
  constructor(props, context) {
    super(props, context);

    this.searchInput = React.createRef();

    const { timestamp, timestampEnd, showLocationsOnly, showPersonsOnly } = this.props;

    const now = moment();
    const selectLocationTimestamp = moment(timestamp || 0)
      .hours(now.hours())
      .minutes(now.minutes())
      .valueOf();
    const selectLocationTimestampEnd = moment(timestampEnd || timestamp || 0)
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

    if (!showLocationsOnly && !showPersonsOnly) {
      const {
        store: { getState },
      } = context;

      const {
        entriesTabsView: { activeTab: entriesTabsViewActiveTab },
      } = getState();

      activeTab = entriesTabsViewActiveTab;
    }

    this.state = {
      activeTab,
      personId: '',
      locationId: '',
      isModalMoreLocationVisible: false,
      isModalMorePersonVisible: false,
      isModalNewPersonVisible: false,
      isModalNewLocationVisible: false,
      isModalSelectLocationVisible: false,
      isUpdatePersonMode: false,
      isUpdateLocationMode: false,
      personDisplayName: '',
      personName: '',
      personPhone: '',
      personMail: '',
      personRecordId: undefined,
      locationDescription: '',
      locationPhone: '',
      locationTitle: '',
      locationTimestampStart: 0,
      locationTimestampEnd: 0,
      searchValue: '',
      selectedLocations: [],
      selectedPersons: [],
      selectLocationDescription: '',
      selectLocationId: '',
      selectLocationTimestamp,
      selectLocationTimestampEnd,
      selectLocationTitle: '',
    };

    this.addLocationToSelectedLocations = this.addLocationToSelectedLocations.bind(this);
    this.addNewLocation = this.addNewLocation.bind(this);
    this.addNewPerson = this.addNewPerson.bind(this);
    this.addSelection = this.addSelection.bind(this);
    this.closeModalMoreLocation = this.closeModalMoreLocation.bind(this);
    this.closeModalMorePerson = this.closeModalMorePerson.bind(this);
    this.closeModalNewLocation = this.closeModalNewLocation.bind(this);
    this.closeModalNewPerson = this.closeModalNewPerson.bind(this);
    this.closeModalSelectLocation = this.closeModalSelectLocation.bind(this);
    this.confirmSelectLocationTimestamp = this.confirmSelectLocationTimestamp.bind(this);
    this.confirmSelectLocationTimestampEnd = this.confirmSelectLocationTimestampEnd.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.editLocation = this.editLocation.bind(this);
    this.editPerson = this.editPerson.bind(this);
    this.importPersons = this.importPersons.bind(this);
    this.onPressMoreLocationDelete = this.onPressMoreLocationDelete.bind(this);
    this.onPressMoreLocationEdit = this.onPressMoreLocationEdit.bind(this);
    this.onPressMorePersonDelete = this.onPressMorePersonDelete.bind(this);
    this.onPressMorePersonEdit = this.onPressMorePersonEdit.bind(this);
    this.onPressMorePersonHide = this.onPressMorePersonHide.bind(this);
    this.onPressLocationItem = this.onPressLocationItem.bind(this);
    this.onPressPersonItem = this.onPressPersonItem.bind(this);
    this.onPressSearchIcon = this.onPressSearchIcon.bind(this);
    this.openModalMoreLocation = this.openModalMoreLocation.bind(this);
    this.openModalMorePerson = this.openModalMorePerson.bind(this);
    this.openModalNewLocation = this.openModalNewLocation.bind(this);
    this.openModalNewPerson = this.openModalNewPerson.bind(this);
    this.openTabLocations = this.openTabLocations.bind(this);
    this.openTabPersons = this.openTabPersons.bind(this);
    this.setLocationDescription = this.setLocationDescription.bind(this);
    this.setLocationPhone = this.setLocationPhone.bind(this);
    this.setLocationTitle = this.setLocationTitle.bind(this);
    this.setPersonDisplayName = this.setPersonDisplayName.bind(this);
    this.setPersonName = this.setPersonName.bind(this);
    this.setPersonPhone = this.setPersonPhone.bind(this);
    this.setPersonMail = this.setPersonMail.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);
    this.setSelectLocationDescription = this.setSelectLocationDescription.bind(this);
    this.toggleLocationSelection = this.toggleLocationSelection.bind(this);
    this.togglePersonSelection = this.togglePersonSelection.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.updateSelectedLocation = this.updateSelectedLocation.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.activeTab !== nextState.activeTab) return true;

    if (this.props.locations.length !== nextProps.locations.length) return true;

    if (this.props.persons.length !== nextProps.persons.length) return true;

    if (this.state.selectedLocations.length !== nextState.selectedLocations.length) return true;

    if (this.state.selectedPersons.length !== nextState.selectedPersons.length) return true;

    if (!deepEqual(this.state, nextState)) return true;

    if (!deepEqual(this.props, nextProps)) return true;

    return false;
  }

  onPressSearchIcon() {
    const { searchValue } = this.state;

    if (searchValue.length > 0) {
      Keyboard.dismiss();
      this.setSearchValue('');
    } else {
      this.searchInput.current.focus();
    }
  }

  async addNewPerson() {
    Keyboard.dismiss();

    const {
      store: { dispatch, getState },
    } = this.context;
    const { allowSelection } = this.props;
    const { personName, personPhone, personMail } = this.state;
    const person = {
      fullName: personName,
      phoneNumbers: [{ label: 'phone', number: personPhone }],
      emailAddresses: [{ label: 'mail', email: personMail }],
    };

    await dispatch(await addPerson(person));

    if (allowSelection) {
      const {
        directory: { persons },
      } = getState();

      const addedPerson = persons.find(
        ({ fullName, phoneNumbers, emailAddresses }) =>
          fullName === personName && phoneNumbers[0].number === personPhone && emailAddresses[0].email === personMail
      );

      if (addedPerson) {
        this.togglePersonSelection(addedPerson.id);
      }
    }

    this.closeModalNewPerson();
  }

  async addNewLocation() {
    Keyboard.dismiss();

    const {
      store: { dispatch, getState },
    } = this.context;
    const { allowSelection } = this.props;
    const { locationDescription, locationPhone, locationTitle } = this.state;
    const location = { description: locationDescription, phone: locationPhone, title: locationTitle };

    await dispatch(await addLocation(location));

    this.closeModalNewLocation();

    if (allowSelection) {
      const {
        directory: { locations },
      } = getState();

      const addedLocation = locations.find(
        ({ description, title }) => description === locationDescription && title === locationTitle
      );

      if (addedLocation) {
        // timeout is necessary because of waiting for other modal to close before opening a new one
        setTimeout(() => this.toggleLocationSelection(addedLocation.id), 500);
      }
    }
  }

  addSelection() {
    const { addSelection, confirmSelection } = this.props;
    const { selectedLocations, selectedPersons } = this.state;

    if (addSelection) {
      const selectedEntries = {
        locations: selectedLocations,
        persons: selectedPersons,
      };

      addSelection(selectedEntries);

      if (confirmSelection) confirmSelection();
    }
  }

  importPersons() {
    const {
      store: { dispatch },
    } = this.context;
    const { __ } = this.props;

    dispatch(importPersons(__));
  }

  openModalNewPerson() {
    Keyboard.dismiss();
    this.setState({
      isUpdatePersonMode: false,
      isModalNewPersonVisible: true,
      personDisplayName: '',
      personName: '',
      personPhone: '',
      personMail: '',
      personRecordId: undefined,
    });
  }

  closeModalNewPerson() {
    this.setState({ isModalNewPersonVisible: false });
  }

  openModalMoreLocation(
    locationId,
    locationTitle,
    locationDescription,
    locationPhone,
    locationTimestampStart = 0,
    locationTimestampEnd = 0
  ) {
    this.setState({
      locationId,
      isModalMoreLocationVisible: true,
      locationDescription,
      locationPhone,
      locationTitle,
      locationTimestampStart,
      locationTimestampEnd,
    });
  }

  closeModalMoreLocation() {
    this.setState({
      isModalMoreLocationVisible: false,
    });
  }

  onPressMoreLocationEdit() {
    this.closeModalMoreLocation();

    const { locationId, locationTitle, locationDescription, locationTimestampStart, locationTimestampEnd } = this.state;

    setTimeout(() => {
      if (locationTimestampStart && locationTimestampEnd) {
        this.setState({
          isModalSelectLocationVisible: true,
          isUpdateLocationMode: true,
          selectLocationDescription: locationDescription,
          selectLocationId: locationId,
          selectLocationTitle: locationTitle,
          selectLocationTimestamp: locationTimestampStart,
          selectLocationTimestampEnd: locationTimestampEnd,
        });
      } else {
        this.editLocation(locationId);
      }
    }, 500);
  }

  onPressMoreLocationDelete() {
    this.closeModalMoreLocation();

    const { locationId, locationDescription, locationTimestampStart } = this.state;

    this.deleteLocation(locationId, locationDescription, locationTimestampStart);
  }

  openModalNewLocation() {
    Keyboard.dismiss();
    this.setState({
      isUpdateLocationMode: false,
      isModalNewLocationVisible: true,
      locationDescription: '',
      locationPhone: '',
      locationTitle: '',
    });
  }

  closeModalNewLocation() {
    this.setState({ isModalNewLocationVisible: false });
  }

  closeModalSelectLocation() {
    this.setState({ isModalSelectLocationVisible: false });
  }

  openModalMorePerson(personId, personDisplayName, personName, personPhone, personMail, personRecordId) {
    this.setState({
      personId,
      personDisplayName: personDisplayName || '',
      personName,
      personPhone: personPhone || '',
      personMail: personMail || '',
      personRecordId,
      isModalMorePersonVisible: true,
    });
  }

  closeModalMorePerson() {
    this.setState({
      isModalMorePersonVisible: false,
    });
  }

  onPressMorePersonEdit() {
    this.closeModalMorePerson();

    const { personId } = this.state;

    setTimeout(() => {
      this.editPerson(personId);
    }, 500);
  }

  onPressMorePersonHide() {
    this.closeModalMorePerson();

    const { personId } = this.state;

    if (this.props.hidePersonItem) this.props.hidePersonItem(personId);
  }

  onPressMorePersonDelete() {
    this.closeModalMorePerson();

    const { personId } = this.state;

    this.deletePerson(personId);
  }

  onPressLocationItem(locationId) {
    if (this.props.onPressLocationItem) this.props.onPressLocationItem(locationId);
  }

  onPressPersonItem(personId) {
    if (this.props.onPressPersonItem) this.props.onPressPersonItem(personId);
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });

    const {
      store: { dispatch },
    } = this.context;

    dispatch(setActiveTabAction(activeTab));
  }

  openTabLocations() {
    Keyboard.dismiss();
    this.setActiveTab(TABS.LOCATIONS);
  }

  openTabPersons() {
    Keyboard.dismiss();
    this.setActiveTab(TABS.PERSONS);
  }

  setPersonDisplayName(personDisplayName) {
    this.setState({ personDisplayName });
  }

  setPersonName(personName) {
    this.setState({ personName });
  }

  setPersonPhone(personPhone) {
    this.setState({ personPhone });
  }

  setPersonMail(personMail) {
    this.setState({ personMail });
  }

  setLocationDescription(locationDescription) {
    this.setState({ locationDescription });
  }

  setLocationPhone(locationPhone) {
    this.setState({ locationPhone });
  }

  setLocationTitle(locationTitle) {
    this.setState({ locationTitle });
  }

  setSearchValue(searchValue) {
    this.setState({ searchValue });
  }

  setSelectLocationDescription(selectLocationDescription) {
    this.setState({ selectLocationDescription });
  }

  setSelectLocationTimestamp(selectLocationTimestamp) {
    const { selectLocationTimestampEnd } = this.state;
    const valueTimestampEnd =
      selectLocationTimestamp < selectLocationTimestampEnd ? selectLocationTimestampEnd : selectLocationTimestamp;
    this.setState({ selectLocationTimestamp, selectLocationTimestampEnd: valueTimestampEnd });
  }

  confirmSelectLocationTimestamp(selectLocationTimestamp) {
    const timestamp = moment(selectLocationTimestamp).valueOf();

    this.setSelectLocationTimestamp(timestamp);
  }

  setSelectLocationTimestampEnd(selectLocationTimestampEnd) {
    const { selectLocationTimestamp } = this.state;
    const valueTimestamp =
      selectLocationTimestampEnd > selectLocationTimestamp ? selectLocationTimestamp : selectLocationTimestampEnd;

    this.setState({ selectLocationTimestampEnd, selectLocationTimestamp: valueTimestamp });
  }

  confirmSelectLocationTimestampEnd(selectLocationTimestampEnd) {
    const timestamp = moment(selectLocationTimestampEnd).valueOf();

    this.setSelectLocationTimestampEnd(timestamp);
  }

  togglePersonSelection(id) {
    const { selectedPersons } = this.state;
    let updatedSelection;

    if (selectedPersons.includes(id)) {
      updatedSelection = selectedPersons.filter((item) => item !== id);
    } else {
      updatedSelection = [...selectedPersons, id];
    }

    this.setState({ selectedPersons: updatedSelection });
  }

  toggleLocationSelection(id) {
    const { locations } = this.props;
    const { selectedLocations } = this.state;

    if (selectedLocations.find(({ id: locationId }) => locationId === id)) {
      const updatedSelection = selectedLocations.filter(({ id: locationId }) => locationId !== id);

      this.setState({ selectedLocations: updatedSelection });
    } else {
      const { description, title } = locations.find(({ id: locationId }) => locationId === id);

      this.setState({
        isModalSelectLocationVisible: true,
        isUpdateLocationMode: false,
        selectLocationDescription: description,
        selectLocationId: id,
        selectLocationTitle: title,
      });
    }
  }

  addLocationToSelectedLocations() {
    const {
      selectedLocations,
      selectLocationDescription,
      selectLocationId,
      selectLocationTimestamp,
      selectLocationTimestampEnd,
    } = this.state;
    const updatedSelection = [
      ...selectedLocations,
      {
        id: selectLocationId,
        description: selectLocationDescription,
        timestamp: selectLocationTimestamp,
        timestampEnd: selectLocationTimestampEnd,
      },
    ];

    this.setState({ isModalSelectLocationVisible: false, selectedLocations: updatedSelection });
  }

  updateSelectedLocation() {
    const {
      locationDescription,
      locationTimestampStart,
      selectLocationDescription,
      selectLocationId,
      selectLocationTimestamp,
      selectLocationTimestampEnd,
    } = this.state;

    if (this.props.updateSelectedLocation) {
      const locationOld = {
        id: selectLocationId,
        description: locationDescription,
        timestamp: locationTimestampStart,
      };
      const locationUpdated = {
        id: selectLocationId,
        description: selectLocationDescription,
        timestamp: selectLocationTimestamp,
        timestampEnd: selectLocationTimestampEnd,
      };
      this.props.updateSelectedLocation(locationOld, locationUpdated);
    }

    this.closeModalSelectLocation();
  }

  editPerson(personId) {
    const { persons } = this.props;
    const { fullName: personName, phoneNumbers, emailAddresses } = persons.find(({ id }) => id === personId);
    const personPhone = phoneNumbers?.[0]?.number || '';
    const personMail = emailAddresses?.[0]?.email || '';

    this.setState({
      personId,
      isUpdatePersonMode: true,
      isModalNewPersonVisible: true,
      personName,
      personPhone,
      personMail,
    });
  }

  updatePerson() {
    Keyboard.dismiss();

    const {
      store: { dispatch },
    } = this.context;
    const { personId, personDisplayName, personName, personPhone, personMail, personRecordId } = this.state;
    let person = {
      id: personId,
    };

    if (personRecordId !== undefined) {
      person = {
        ...person,
        fullNameDisplay: personDisplayName,
        recordID: personRecordId,
      };
    } else {
      person = {
        ...person,
        fullName: personName,
        phoneNumbers: [{ label: 'phone', number: personPhone }],
        emailAddresses: [{ label: 'mail', email: personMail }],
      };
    }

    dispatch(updatePerson(person));

    this.setState({ isUpdatePersonMode: false, isModalNewPersonVisible: false });
  }

  deletePerson(id) {
    if (this.props.deletePersonItem) this.props.deletePersonItem(id);
  }

  editLocation(locationId) {
    const { locations } = this.props;
    const { description: locationDescription, phone: locationPhone, title: locationTitle } = locations.find(
      ({ id }) => id === locationId
    );
    this.setState({
      locationId,
      isUpdateLocationMode: true,
      isModalNewLocationVisible: true,
      locationDescription,
      locationPhone,
      locationTitle,
    });
  }

  updateLocation() {
    Keyboard.dismiss();

    const {
      store: { dispatch },
    } = this.context;
    const { locationId, locationDescription, locationPhone, locationTitle } = this.state;
    const location = {
      description: locationDescription,
      id: locationId,
      phone: locationPhone,
      title: locationTitle,
    };

    dispatch(updateLocation(location));

    this.setState({ isUpdateLocationMode: false, isModalNewLocationVisible: false });
  }

  deleteLocation(id, description, time) {
    if (this.props.deleteLocationItem) this.props.deleteLocationItem(id, description, time);
  }

  styles = StyleSheet.create({
    buttonAddSelection: {
      marginTop: 10,
    },
    buttonCreateNew: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: this.props.vw(4),
      marginTop: this.props.vw(5),
    },
    buttonCreateNewIcon: {
      marginRight: this.props.vw(1.5),
    },
    buttonCreateNewText: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4),
      textTransform: 'lowercase',
    },
    personsImportButton: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    personsImportButtonIcon: {
      marginRight: this.props.vw(1.5),
    },
    personsImportButtonText: {
      color: COLOR_PRIMARY,
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.5),
      textTransform: 'lowercase',
    },
    entriesEmptyWrapper: {
      flex: 1,
      padding: this.props.vw(10),
      paddingTop: this.props.vw(5),
      alignItems: 'center',
      justifyContent: 'center',
    },
    entriesEmptyText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(4.2),
      lineHeight: this.props.vw(6.5),
      marginBottom: this.props.vw(4.5),
      textAlign: 'center',
    },
    modalButton: {
      alignItems: 'center',
      backgroundColor: COLOR_PRIMARY,
      borderRadius: this.props.vw(2.3),
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: this.props.vw(5),
      padding: this.props.vw(3.5),
    },
    modalButtonDisabled: {
      opacity: 0.2,
    },
    modalButtonText: {
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(5),
      textTransform: 'lowercase',
    },
    modalButtonTextCounter: {
      alignSelf: 'flex-start',
      fontFamily: this.props.fontFamilyBold,
      fontSize: this.props.vw(3.5),
      marginLeft: this.props.vw(1.5),
      textTransform: 'lowercase',
    },
    tabContentWrapper: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
  });

  allowLocationDeletion = typeof this.props.deleteLocationItem === 'function';
  keyboardAvoidingViewBehavior = 'padding';

  // TODO: reduce complexity!!
  /* eslint-disable-next-line complexity */
  render() {
    const {
      allowDelete,
      allowMore,
      allowSelection,
      allowUpdate,
      colors,
      persons,
      customPersonsEmptyText,
      customLocationsEmptyText,
      hideCreateButton,
      hideSearchBar,
      hideTabBar,
      isDirectory,
      locations,
      onPressLocationItem,
      onPressPersonItem,
      orderByLastUsage,
      showCounter,
      showHiddenPersons,
      vw,
      __,
    } = this.props;
    const {
      activeTab,
      isModalMoreLocationVisible,
      isModalMorePersonVisible,
      isModalNewPersonVisible,
      isModalNewLocationVisible,
      isModalSelectLocationVisible,
      isUpdatePersonMode,
      isUpdateLocationMode,
      personDisplayName,
      personName,
      personPhone,
      personMail,
      personRecordId,
      locationDescription,
      locationPhone,
      locationTitle,
      locationTimestampEnd,
      locationTimestampStart,
      searchValue,
      selectedLocations,
      selectedPersons,
      selectLocationDescription,
      selectLocationTimestamp,
      selectLocationTimestampEnd,
      selectLocationTitle,
    } = this.state;

    const buttonAddNewPersonDisabled = personName.length < 3;
    const buttonAddNewLocationDisabled = locationTitle.length < 3;
    const buttonAddSelectionDisabled = allowSelection && selectedLocations.length === 0 && selectedPersons.length === 0;

    const selectionCounter = selectedLocations.length + selectedPersons.length;

    const isSearchFilled = searchValue.trim().length > 0;
    const visiblePersons = showHiddenPersons ? persons : persons.filter(({ hidden }) => !hidden);
    const filteredPersons = isSearchFilled
      ? visiblePersons.filter(({ fullName }) => fullName.toLowerCase().indexOf(searchValue.trim().toLowerCase()) !== -1)
      : visiblePersons;
    const filteredLocations = isSearchFilled
      ? locations.filter(({ title }) => title.toLowerCase().indexOf(searchValue.trim().toLowerCase()) !== -1)
      : locations;

    return (
      <Fragment>
        {!hideSearchBar && (
          <SearchBar
            onPressSearchIcon={this.onPressSearchIcon}
            ref={this.searchInput}
            searchValue={searchValue}
            setSearchValue={this.setSearchValue}
          />
        )}

        {!hideTabBar && (
          <TabBar>
            <TabBarItem
              active={activeTab === TABS.PERSONS}
              counter={filteredPersons.length}
              counterVisible={isSearchFilled}
              icon={UilUser}
              label={__('persons')}
              onPress={this.openTabPersons}
            />
            <TabBarItem
              active={activeTab === TABS.LOCATIONS}
              counter={filteredLocations.length}
              counterVisible={isSearchFilled}
              icon={UilLocationPinAlt}
              label={__('locations')}
              onPress={this.openTabLocations}
            />
          </TabBar>
        )}

        <View style={{ ...this.styles.tabContentWrapper, backgroundColor: colors.BACKGROUND }}>
          {activeTab === TABS.PERSONS && (
            <Fragment>
              {!hideCreateButton && (
                <TouchableOpacity onPress={this.openModalNewPerson} style={this.styles.buttonCreateNew}>
                  <UilPlus color={COLOR_PRIMARY} size={vw(5.5)} style={this.styles.buttonCreateNewIcon} />
                  <Text style={this.styles.buttonCreateNewText}>{__('entries.persons.list.new')}</Text>
                </TouchableOpacity>
              )}

              {filteredPersons && filteredPersons.length ? (
                <PersonsList
                  allowMore={allowMore || isDirectory}
                  allowSelection={allowSelection}
                  persons={filteredPersons}
                  onPressItem={onPressPersonItem ? this.onPressPersonItem : null}
                  openItemMore={this.openModalMorePerson}
                  orderByLastUsage={orderByLastUsage}
                  selectedPersons={selectedPersons}
                  showCounter={showCounter}
                  showHiddenPersons={showHiddenPersons}
                  toggleSelection={this.togglePersonSelection}
                />
              ) : (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                  <View style={this.styles.entriesEmptyWrapper}>
                    {isSearchFilled ? (
                      <Text style={{ ...this.styles.entriesEmptyText, color: colors.TEXT }}>
                        {__('entries.search.list.empty')}
                      </Text>
                    ) : (
                      <Fragment>
                        {customPersonsEmptyText ? (
                          <Text style={{ ...this.styles.entriesEmptyText, color: colors.TEXT }}>
                            {customPersonsEmptyText}
                          </Text>
                        ) : (
                          <Fragment>
                            <Text style={{ ...this.styles.entriesEmptyText, color: colors.TEXT }}>
                              {__('entries.persons.list.empty')}
                            </Text>
                            <TouchableOpacity onPress={this.importPersons} style={this.styles.personsImportButton}>
                              <UilImport
                                color={COLOR_PRIMARY}
                                size={vw(5.5)}
                                style={this.styles.personsImportButtonIcon}
                              />
                              <Text style={this.styles.personsImportButtonText}>
                                {__('entries.persons.list.import.button')}
                              </Text>
                            </TouchableOpacity>
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              )}
            </Fragment>
          )}

          {activeTab === TABS.LOCATIONS && (
            <Fragment>
              {!hideCreateButton && (
                <TouchableOpacity onPress={this.openModalNewLocation} style={this.styles.buttonCreateNew}>
                  <UilPlus color={COLOR_PRIMARY} size={vw(5.5)} style={this.styles.buttonCreateNewIcon} />
                  <Text style={this.styles.buttonCreateNewText}>{__('entries.locations.list.new')}</Text>
                </TouchableOpacity>
              )}

              {filteredLocations && filteredLocations.length > 0 ? (
                <LocationsList
                  allowDelete={this.allowLocationDeletion}
                  allowSelection={allowSelection}
                  allowUpdate={allowUpdate}
                  locations={filteredLocations}
                  onPressItem={onPressLocationItem ? this.onPressLocationItem : null}
                  openItemMore={this.openModalMoreLocation}
                  orderByLastUsage={orderByLastUsage}
                  selectedLocations={selectedLocations}
                  showCounter={showCounter}
                  toggleSelection={this.toggleLocationSelection}
                />
              ) : (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                  <View style={this.styles.entriesEmptyWrapper}>
                    {isSearchFilled ? (
                      <Text style={{ ...this.styles.entriesEmptyText, color: colors.TEXT }}>
                        {__('entries.search.list.empty')}
                      </Text>
                    ) : (
                      <Text style={{ ...this.styles.entriesEmptyText, color: colors.TEXT }}>
                        {customLocationsEmptyText ? customLocationsEmptyText : __('entries.locations.list.empty')}
                      </Text>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              )}
            </Fragment>
          )}

          {allowSelection && (
            <TouchableOpacity disabled={buttonAddSelectionDisabled} onPress={this.addSelection}>
              <View
                style={{
                  ...this.styles.modalButton,
                  ...(buttonAddSelectionDisabled && this.styles.modalButtonDisabled),
                  ...this.styles.buttonAddSelection,
                }}>
                <Text style={{ ...this.styles.modalButtonText, color: colors.TEXT_ALT }}>
                  {__('entries.selection.add')}
                </Text>
                <Text
                  style={{
                    ...this.styles.modalButtonTextCounter,
                    color: colors.TEXT_ALT,
                  }}>{`(${selectionCounter})`}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <ModalPerson
          buttonConfirmDisabled={buttonAddNewPersonDisabled}
          buttonConfirmLabel={
            isUpdatePersonMode ? __('entries.modals.update-person.button') : __('entries.modals.new-person.button')
          }
          headline={
            isUpdatePersonMode ? __('entries.modals.update-person.headline') : __('entries.modals.new-person.headline')
          }
          isImported={personRecordId !== undefined}
          isVisible={isModalNewPersonVisible}
          personDisplayName={personDisplayName}
          personName={personName}
          personPhone={personPhone}
          personMail={personMail}
          onPressClose={this.closeModalNewPerson}
          onPressConfirm={isUpdatePersonMode ? this.updatePerson : this.addNewPerson}
          setPersonDisplayName={this.setPersonDisplayName}
          setPersonName={this.setPersonName}
          setPersonPhone={this.setPersonPhone}
          setPersonMail={this.setPersonMail}
        />

        <ModalLocation
          buttonConfirmDisabled={buttonAddNewLocationDisabled}
          buttonConfirmLabel={
            isUpdateLocationMode
              ? __('entries.modals.update-location.button')
              : __('entries.modals.new-location.button')
          }
          headline={
            isUpdateLocationMode
              ? __('entries.modals.update-location.headline')
              : __('entries.modals.new-location.headline')
          }
          isVisible={isModalNewLocationVisible}
          locationDescription={locationDescription}
          locationPhone={locationPhone}
          locationTitle={locationTitle}
          onPressClose={this.closeModalNewLocation}
          onPressConfirm={isUpdateLocationMode ? this.updateLocation : this.addNewLocation}
          setLocationDescription={this.setLocationDescription}
          setLocationPhone={this.setLocationPhone}
          setLocationTitle={this.setLocationTitle}
        />

        <ModalLocationSelection
          buttonConfirmLabel={
            isUpdateLocationMode
              ? __('entries.modals.update-location.button')
              : __('entries.modals.select-location.button')
          }
          confirmModalTimestampEnd={this.confirmSelectLocationTimestampEnd}
          confirmModalTimestampStart={this.confirmSelectLocationTimestamp}
          headline={
            isUpdateLocationMode
              ? __('entries.modals.update-location.headline')
              : __('entries.modals.select-location.headline')
          }
          isVisible={isModalSelectLocationVisible}
          locationDescription={selectLocationDescription}
          locationTimestampEnd={selectLocationTimestampEnd}
          locationTimestampStart={selectLocationTimestamp}
          locationTitle={selectLocationTitle}
          onPressClose={this.closeModalSelectLocation}
          onPressConfirm={isUpdateLocationMode ? this.updateSelectedLocation : this.addLocationToSelectedLocations}
          setLocationDescription={this.setSelectLocationDescription}
        />

        <ModalLocationMore
          isVisible={isModalMoreLocationVisible}
          isLocationPhoneVisible={isDirectory}
          locationDescription={locationDescription}
          locationPhone={locationPhone}
          locationTitle={locationTitle}
          locationTimestampEnd={locationTimestampEnd}
          locationTimestampStart={locationTimestampStart}
          onPressClose={this.closeModalMoreLocation}
          onPressDelete={this.onPressMoreLocationDelete}
          onPressEdit={this.onPressMoreLocationEdit}
        />

        <ModalPersonMore
          allowDelete={allowDelete || personRecordId === undefined}
          allowHide={isDirectory}
          allowUpdate={isDirectory}
          isImported={personRecordId !== undefined}
          isVisible={isModalMorePersonVisible}
          personDisplayName={personDisplayName}
          personName={personName}
          personPhone={personPhone}
          personMail={personMail}
          onPressClose={this.closeModalMorePerson}
          onPressDelete={this.onPressMorePersonDelete}
          onPressEdit={this.onPressMorePersonEdit}
          onPressHide={this.onPressMorePersonHide}
        />
      </Fragment>
    );
  }
}

EntriesTabsView.contextType = ReactReduxContext;

export default withColorScheme(withI18n(withViewportUnits(EntriesTabsView)));
