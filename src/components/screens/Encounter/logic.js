import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { MODAL_OPENING_DELAY } from '../../../constants';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import { addEncounter, removeEncounter, updateEncounter } from '../Dashboard/actions';
import { setTimestamp } from '../Day/actions';
import { addPerson, addLocation, updateLastUsageOfLocation, updateLastUsageOfPerson } from '../Directory/actions';
import { setShowKeyEncounterHints } from '../Settings/actions';
import {
  hideDateSwitcherModal,
  hideModalConfirmDelete,
  hideModalHints,
  hideModalLocation,
  hideModalPerson,
  hideModalSelectLocation,
  hideModalSelectPersons,
  hideModalTimestampEnd,
  hideModalTimestampStart,
  removePerson,
  setDistance,
  setLocation,
  setMask,
  setNote,
  setOutside,
  setPersons,
  setTimestampEnd,
  setTimestampStart,
  setVentilation,
  showDateSwitcherModal,
  showModalConfirmDelete,
  showModalHints,
  showModalLocation,
  showModalPerson,
  showModalSelectLocation,
  showModalSelectPersons,
  showModalTimestampEnd,
  showModalTimestampStart,
  reset,
} from './actions';
import Screen from './ui';

const addPersonAsync = (personName, personPhone, personMail) => async (dispatch, getState) => {
  dispatch(closeModalPerson());

  const id = uuidv4();
  const person = {
    id,
    fullName: personName,
    phoneNumbers: [{ label: 'phone', number: personPhone }],
    emailAddresses: [{ label: 'mail', email: personMail }],
  };
  dispatch(addPerson(person));

  const {
    encounter: { persons },
  } = getState();
  dispatch(setPersons([...persons, id]));
};

const addLocationAsync = (locationTitle, locationDescription, locationPhone) => async (dispatch) => {
  dispatch(hideModalLocation());
  const id = uuidv4();
  const location = { id, description: locationDescription, phone: locationPhone, title: locationTitle };
  dispatch(addLocation(location));
  dispatch(setLocation(id));
};

const openDateSwitcherModal = () => async (dispatch) => {
  Keyboard.dismiss();
  dispatch(showDateSwitcherModal());
};

const closeModalHints = () => async (dispatch, getState) => {
  const {
    app: { showKeyEncounterHints: showKeyEncounterHintsApp },
  } = getState();

  dispatch(hideModalHints());
  dispatch(setShowKeyEncounterHints(showKeyEncounterHintsApp));
};

const openModalLocation = () => async (dispatch) => {
  dispatch(hideModalSelectLocation());

  setTimeout(() => dispatch(showModalLocation()), MODAL_OPENING_DELAY);
};

const closeModalLocation = () => async (dispatch) => {
  dispatch(hideModalLocation());

  setTimeout(() => dispatch(showModalSelectLocation()), MODAL_OPENING_DELAY);
};

const openModalPerson = () => async (dispatch) => {
  dispatch(hideModalSelectPersons());

  setTimeout(() => dispatch(showModalPerson()), MODAL_OPENING_DELAY);
};

const closeModalPerson = () => async (dispatch) => {
  dispatch(hideModalPerson());

  setTimeout(() => dispatch(showModalSelectPersons()), MODAL_OPENING_DELAY);
};

const confirmTimestampEnd = (timestampEnd) => async (dispatch) => {
  const timestamp = moment(timestampEnd).valueOf();

  dispatch(hideModalTimestampEnd());
  dispatch(setTimestampEnd(timestamp));
};

const confirmTimestampStart = (timestampStart) => async (dispatch) => {
  const timestamp = moment(timestampStart).valueOf();

  dispatch(hideModalTimestampStart());
  dispatch(setTimestampStart(timestamp));
};

const saveEncounter = (navigation) => async (dispatch, getState) => {
  const {
    day: { timestamp: timestampDay },
    encounter: {
      distance,
      id,
      location,
      mask,
      note,
      outside,
      persons,
      timestamp: timestampEncounter,
      timestampEnd,
      timestampStart,
      ventilation,
    },
  } = getState();

  if (persons?.length === 0 && location === undefined) return;

  const encounter = {
    distance,
    id: id !== undefined ? id : uuidv4(),
    location,
    mask,
    note,
    outside,
    persons,
    timestamp: id !== undefined ? timestampEncounter : timestampDay,
    timestampEnd,
    timestampStart,
    ventilation,
  };

  if (id !== undefined) {
    dispatch(updateEncounter(encounter));
  } else {
    const timestampStartMoment = moment(timestampStart);
    encounter.timestampStart = moment(timestampDay)
      .hours(timestampStartMoment.hours())
      .minutes(timestampStartMoment.minutes())
      .valueOf();
    const timestampEndMoment = moment(timestampEnd);
    encounter.timestampEnd = moment(timestampDay)
      .hours(timestampEndMoment.hours())
      .minutes(timestampEndMoment.minutes())
      .valueOf();

    dispatch(addEncounter(encounter));

    persons.forEach((personId) => {
      dispatch(updateLastUsageOfPerson(personId));
    });

    if (location !== undefined) {
      dispatch(updateLastUsageOfLocation(location));
    }
  }

  navigation.dispatch(CommonActions.goBack());
};

const deleteEncounter = (navigation) => async (dispatch, getState) => {
  const {
    encounter: { id, timestamp },
  } = getState();

  if (id !== undefined) {
    dispatch(removeEncounter(id, timestamp));
  }

  dispatch(hideModalConfirmDelete());
  navigation.dispatch(CommonActions.goBack());
};

const personsSortingFunction = (a, b) => {
  const fullNameA = a.fullName.toLowerCase();
  const fullNameB = b.fullName.toLowerCase();
  if (fullNameA < fullNameB) {
    return -1;
  }
  if (fullNameA > fullNameB) {
    return 1;
  }

  return 0;
};

const locationsSortingFunction = (a, b) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }

  return 0;
};

const mapStateToProps = ({
  app: { showKeyEncounterHints: showKeyEncounterHintsApp },
  directory: { persons: directoryPersons, locations: directoryLocations },
  dashboard: { days },
  day: { timestamp },
  encounter: {
    distance,
    id,
    isDateSwitcherModalVisible,
    location,
    mask,
    modalConfirmDeleteVisible,
    modalHintsVisible,
    modalLocationVisible,
    modalPersonVisible,
    modalSelectLocationVisible,
    modalSelectPersonsVisible,
    modalTimestampEndVisible,
    modalTimestampStartVisible,
    note,
    outside,
    persons,
    timestampEnd,
    timestampStart,
    ventilation,
  },
  settings: { showKeyEncounterHints: showKeyEncounterHintsSettings },
}) => {
  directoryPersons.sort((a, b) => personsSortingFunction(a, b));
  directoryLocations.sort((a, b) => locationsSortingFunction(a, b));

  const daysList = Object.keys(days)
    .map((key) => parseInt(key, 10))
    .sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;

      return 0;
    });

  const isSaveButtonDisabled = persons.length === 0 && location === undefined;

  const locationTitle = directoryLocations.find(({ id: locationId }) => locationId === location)?.title;

  const personsDisplay = persons.map((personId) => {
    const person = directoryPersons.find((p) => p.id === personId);
    const personName = person.fullNameDisplay || person.fullName;

    return {
      id: personId,
      name: personName,
    };
  });

  return {
    daysList,
    distance,
    id,
    isDateSwitcherModalVisible,
    isSaveButtonDisabled,
    location,
    locationTitle,
    mask,
    modalConfirmDeleteVisible,
    modalHintsVisible: modalHintsVisible || showKeyEncounterHintsApp !== showKeyEncounterHintsSettings,
    modalLocationVisible,
    modalPersonVisible,
    modalSelectLocationVisible,
    modalSelectPersonsVisible,
    modalTimestampEndVisible,
    modalTimestampStartVisible,
    note,
    outside,
    persons,
    personsDisplay,
    timestampEnd,
    timestampStart,
    ventilation,
    directoryPersons,
    directoryLocations,
    timestamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLocation: (id, locationTitle, locationDescription, locationPhone) =>
      dispatch(addLocationAsync(locationTitle, locationDescription, locationPhone)),
    addPerson: (id, personName, personPhone, personMail) =>
      dispatch(addPersonAsync(personName, personPhone, personMail)),
    confirmTimestampEnd: (timestampEnd) => dispatch(confirmTimestampEnd(timestampEnd)),
    confirmTimestampStart: (timestampStart) => dispatch(confirmTimestampStart(timestampStart)),
    deleteEncounter: (navigation) => dispatch(deleteEncounter(navigation)),
    hideDateSwitcherModal: () => dispatch(hideDateSwitcherModal()),
    hideModalConfirmDelete: () => dispatch(hideModalConfirmDelete()),
    hideModalHints: () => dispatch(closeModalHints()),
    hideModalLocation: () => dispatch(closeModalLocation()),
    hideModalPerson: () => dispatch(closeModalPerson()),
    hideModalSelectLocation: () => dispatch(hideModalSelectLocation()),
    hideModalSelectPersons: () => dispatch(hideModalSelectPersons()),
    hideModalTimestampEnd: () => dispatch(hideModalTimestampEnd()),
    hideModalTimestampStart: () => dispatch(hideModalTimestampStart()),
    removePerson: (id) => dispatch(removePerson(id)),
    reset: () => dispatch(reset()),
    save: (navigation) => dispatch(saveEncounter(navigation)),
    showDateSwitcherModal: () => dispatch(openDateSwitcherModal()),
    showModalConfirmDelete: () => dispatch(showModalConfirmDelete()),
    showModalHints: () => dispatch(showModalHints()),
    showModalLocation: () => dispatch(openModalLocation()),
    showModalPerson: () => dispatch(openModalPerson()),
    showModalSelectLocation: () => dispatch(showModalSelectLocation()),
    showModalSelectPersons: () => dispatch(showModalSelectPersons()),
    showModalTimestampEnd: () => dispatch(showModalTimestampEnd()),
    showModalTimestampStart: () => dispatch(showModalTimestampStart()),
    setDistance: (distance) => dispatch(setDistance(distance)),
    setLocation: (location) => dispatch(setLocation(location)),
    setMask: (mask) => dispatch(setMask(mask)),
    setNote: (note) => dispatch(setNote(note)),
    setOutside: (outside) => dispatch(setOutside(outside)),
    setPersons: (persons) => dispatch(setPersons(persons)),
    setTimestamp: (timestamp) => dispatch(setTimestamp(timestamp)),
    setTimestampEnd: (timestampEnd) => dispatch(setTimestampEnd(timestampEnd)),
    setTimestampStart: (timestampStart) => dispatch(setTimestampStart(timestampStart)),
    setVentilation: (ventilation) => dispatch(setVentilation(ventilation)),
  };
};

const Encounter = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default Encounter;
