import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
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
  showDateSwitcherModal,
  showModalConfirmDelete,
  showModalHints,
  reset,
} from './actions';
import Screen from './ui';

const addPersonAsync = (personId, personName, personPhone, personMail) => async (dispatch) => {
  const person = {
    id: personId,
    fullName: personName,
    phoneNumbers: [{ label: 'phone', number: personPhone }],
    emailAddresses: [{ label: 'mail', email: personMail }],
  };
  dispatch(addPerson(person));
};

const addLocationAsync = (locationId, locationTitle, locationDescription, locationPhone) => async (dispatch) => {
  const location = { id: locationId, description: locationDescription, phone: locationPhone, title: locationTitle };
  dispatch(addLocation(location));
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

const saveEncounter = (encounterData, navigation) => async (dispatch, getState) => {
  const {
    day: { timestamp: timestampDay },
    encounter: { id, timestamp: timestampEncounter },
  } = getState();

  const { location, persons, timestampEnd, timestampStart } = encounterData;

  if (persons?.length === 0 && location === undefined) return;

  const encounter = {
    ...encounterData,
    id: id !== undefined ? id : uuidv4(),
    timestamp: id !== undefined ? timestampEncounter : timestampDay,
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
      dispatch(addLocationAsync(id, locationTitle, locationDescription, locationPhone)),
    addPerson: (id, personName, personPhone, personMail) =>
      dispatch(addPersonAsync(id, personName, personPhone, personMail)),
    deleteEncounter: (navigation) => dispatch(deleteEncounter(navigation)),
    hideDateSwitcherModal: () => dispatch(hideDateSwitcherModal()),
    hideModalConfirmDelete: () => dispatch(hideModalConfirmDelete()),
    hideModalHints: () => dispatch(closeModalHints()),
    reset: () => dispatch(reset()),
    save: (encounter, navigation) => dispatch(saveEncounter(encounter, navigation)),
    showDateSwitcherModal: () => dispatch(openDateSwitcherModal()),
    showModalConfirmDelete: () => dispatch(showModalConfirmDelete()),
    showModalHints: () => dispatch(showModalHints()),
    setTimestamp: (timestamp) => dispatch(setTimestamp(timestamp)),
  };
};

const Encounter = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default Encounter;
