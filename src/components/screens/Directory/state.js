import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  persons: [],
  personsImporting: false,
  isImportPersonsModalVisible: false,
  locations: [],
};

const addPersonToList = (persons, person) => {
  const importPerson = cloneDeep(person);
  const resultList = [];

  if ('recordID' in importPerson) {
    for (const c of persons) {
      if (c.recordID !== importPerson.recordID) {
        resultList.push(c);
      } else {
        importPerson.id = c.id;
      }
    }

    importPerson.fullName = [importPerson.givenName, importPerson.middleName, importPerson.familyName]
      .join(' ')
      .replace(/\s+/g, ' ');
  } else {
    for (const c of persons) {
      if (c.recordID || c.fullName !== importPerson.fullName) {
        resultList.push(c);
      } else {
        importPerson.id = c.id;
        importPerson.phoneNumbers = [...c.phoneNumbers];
      }
    }
  }

  if (!importPerson.id) {
    importPerson.id = uuidv4();
  }

  resultList.push(importPerson);

  return resultList;
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'ADD_PERSON_DIRECTORY': {
      const persons = addPersonToList(state.persons, action.person);

      return { ...state, persons };
    }

    case 'REMOVE_PERSON_DIRECTORY': {
      const personId = action.personId;
      const persons = [];

      for (const c of state.persons) {
        if (c.id !== personId) {
          persons.push(c);
        }
      }

      return { ...state, persons };
    }

    case 'UPDATE_PERSON_DIRECTORY': {
      const person = action.person;
      const persons = [];

      for (const c of state.persons) {
        if (c.id !== person.id) {
          persons.push(c);
        } else {
          persons.push({ ...c, ...person });
        }
      }

      return { ...state, persons };
    }

    case 'ADD_LOCATION_DIRECTORY': {
      const location = action.location;
      const locations = [];

      for (const l of state.locations) {
        if (l.title !== location.title) {
          locations.push(l);
        } else {
          location.description = l.description;
          location.id = l.id;
        }
      }

      if (!location.id) {
        location.id = uuidv4();
      }

      locations.push(location);

      return { ...state, locations };
    }

    case 'REMOVE_LOCATION_DIRECTORY': {
      const locationId = action.locationId;
      const locations = [];

      for (const c of state.locations) {
        if (c.id !== locationId) {
          locations.push(c);
        }
      }

      return { ...state, locations };
    }

    case 'UPDATE_LOCATION_DIRECTORY': {
      const location = action.location;
      const locations = [];

      for (const l of state.locations) {
        if (l.id !== location.id) {
          locations.push(l);
        } else {
          locations.push({ ...l, ...location });
        }
      }

      return { ...state, locations };
    }

    case 'IMPORT_PERSONS_DIRECTORY': {
      const importPersons = action.persons;
      let persons = cloneDeep(state.persons);

      for (const person of importPersons) {
        persons = addPersonToList(persons, person);
      }

      const importedRecordIDs = importPersons.map(({ recordID }) => recordID);

      persons = persons.filter(({ recordID }) => recordID === undefined || importedRecordIDs.includes(recordID));

      return { ...state, persons };
    }

    case 'SHOW_IMPORT_PERSONS_MODAL_DIRECTORY':
      return { ...state, isImportPersonsModalVisible: true };

    case 'HIDE_IMPORT_PERSONS_MODAL_DIRECTORY':
      return { ...state, isImportPersonsModalVisible: false };

    case 'ENABLE_PERSONS_IMPORTING_DIRECTORY':
      return { ...state, personsImporting: true };

    case 'DISABLE_PERSONS_IMPORTING_DIRECTORY':
      return { ...state, personsImporting: false };

    default:
      return state;
  }
};
