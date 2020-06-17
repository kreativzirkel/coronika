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
        importPerson.lastUsed = c.lastUsed;
      }
    }

    importPerson.fullName = [importPerson.givenName || '', importPerson.middleName || '', importPerson.familyName || '']
      .join(' ')
      .replace(/\s+/g, ' ');
  } else {
    for (const c of persons) {
      if (c.recordID || c.fullName !== importPerson.fullName) {
        resultList.push(c);
      } else {
        importPerson.id = c.id;
        importPerson.lastUsed = c.lastUsed;
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
      const persons = state.persons.filter(({ id }) => id !== action.personId);

      return { ...state, persons };
    }

    case 'UPDATE_PERSON_DIRECTORY': {
      const person = action.person;
      const persons = state.persons.filter(({ id }) => id !== person.id);

      persons.push({
        ...state.persons.find(({ id }) => id === person.id),
        ...person,
      });

      return { ...state, persons };
    }

    case 'ADD_LOCATION_DIRECTORY': {
      const location = action.location;
      const locations = [...state.locations];

      if (!locations.find(({ title }) => title === location.title)) {
        locations.push({
          ...location,
          id: uuidv4(),
        });
      }

      return { ...state, locations };
    }

    case 'REMOVE_LOCATION_DIRECTORY': {
      const locations = state.locations.filter(({ id }) => id !== action.locationId);

      return { ...state, locations };
    }

    case 'UPDATE_LOCATION_DIRECTORY': {
      const location = action.location;
      const locations = state.locations.filter(({ id }) => id !== location.id);

      locations.push({
        ...state.locations.find(({ id }) => id === location.id),
        ...location,
      });

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

    case 'RESET_LAST_USAGE_OF_LOCATION_DIRECTORY': {
      const locations = state.locations.filter(({ id }) => id !== action.id);

      locations.push({
        ...state.locations.find(({ id }) => id === action.id),
        lastUsed: 0,
      });

      return { ...state, locations };
    }

    case 'RESET_LAST_USAGE_OF_PERSON_DIRECTORY': {
      const persons = state.persons.filter(({ id }) => id !== action.id);

      persons.push({
        ...state.persons.find(({ id }) => id === action.id),
        lastUsed: 0,
      });

      return { ...state, persons };
    }

    case 'UPDATE_LAST_USAGE_OF_LOCATION_DIRECTORY': {
      const locations = state.locations.filter(({ id }) => id !== action.id);

      locations.push({
        ...state.locations.find(({ id }) => id === action.id),
        lastUsed: Date.now(),
      });

      return { ...state, locations };
    }

    case 'UPDATE_LAST_USAGE_OF_PERSON_DIRECTORY': {
      const persons = state.persons.filter(({ id }) => id !== action.id);

      persons.push({
        ...state.persons.find(({ id }) => id === action.id),
        lastUsed: Date.now(),
      });

      return { ...state, persons };
    }

    default:
      return state;
  }
};
