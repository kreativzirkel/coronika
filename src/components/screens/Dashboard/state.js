import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  days: {},
  firstStartHintConfirmed: false,
  firstStartHintVisible: false,
  lastUpdated: 0,
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'INITIALIZE_DAYS_DASHBOARD': {
      const addTimestamps = action.addTimestamps;
      const minTimestamp = action.minTimestamp;

      const daysInitial = cloneDeep(state.days);

      addTimestamps.forEach((timestamp) => {
        if (!daysInitial[timestamp]) {
          daysInitial[timestamp] = {
            encounters: [],
            timestamp,
          };
        }
      });

      const days = {};

      Object.keys(daysInitial).forEach((timestamp) => {
        if (parseInt(timestamp, 10) > minTimestamp) {
          days[timestamp] = daysInitial[timestamp];
        }
      });

      return { ...state, days };
    }

    case 'ADD_ENCOUNTER_DASHBOARD': {
      const encounter = action.encounter;
      const timestamp = encounter.timestamp;
      const days = cloneDeep(state.days);

      if (!days[timestamp].encounters.find(({ id }) => id === encounter.id)) {
        days[timestamp].encounters.push(encounter);
        days[timestamp].noEncounters = false;
      }

      return { ...state, days };
    }

    case 'UPDATE_ENCOUNTER_DASHBOARD': {
      const encounter = action.encounter;
      const timestamp = encounter.timestamp;
      const days = cloneDeep(state.days);

      days[timestamp].encounters = days[timestamp].encounters.filter(({ id }) => id !== encounter.id);
      days[timestamp].encounters.push(encounter);

      return { ...state, days };
    }

    case 'REMOVE_ENCOUNTER_DASHBOARD': {
      const id = action.id;
      const timestamp = action.timestamp;

      const days = cloneDeep(state.days);

      days[timestamp].encounters = days[timestamp].encounters.filter((encounter) => encounter.id !== id);

      return { ...state, days };
    }

    case 'SET_NO_ENCOUNTERS_FOR_DAY_DASHBOARD': {
      const timestamp = action.timestamp;

      const days = cloneDeep(state.days);

      days[timestamp].noEncounters = true;

      return { ...state, days };
    }

    case 'REMOVE_PERSON_FROM_ALL_DAYS_DASHBOARD': {
      const personId = action.personId;
      const days = cloneDeep(state.days);

      Object.keys(days).forEach((timestamp) => {
        const encounters = [];

        days[timestamp].encounters.forEach((encounter) => {
          const enc = {
            ...encounter,
            persons: encounter.persons.filter((id) => id !== personId),
          };

          if (enc.location !== undefined || enc.persons.length > 0) {
            encounters.push(enc);
          }
        });

        days[timestamp].encounters = encounters;
      });

      return { ...state, days };
    }

    case 'REMOVE_LOCATION_FROM_ALL_DAYS_DASHBOARD': {
      const locationId = action.locationId;
      const days = cloneDeep(state.days);

      Object.keys(days).forEach((timestamp) => {
        const encounters = [];

        days[timestamp].encounters.forEach((encounter) => {
          const enc = {
            ...encounter,
            location: encounter.location === locationId ? undefined : encounter.location,
          };

          if (enc.location !== undefined || enc.persons.length > 0) {
            encounters.push(enc);
          }
        });

        days[timestamp].encounters = encounters;
      });

      return { ...state, days };
    }

    case 'CONFIRM_FIRST_START_HINT_DASHBOARD':
      return { ...state, firstStartHintConfirmed: true };

    case 'SHOW_FIRST_START_HINT_DASHBOARD':
      return { ...state, firstStartHintVisible: true };

    case 'HIDE_FIRST_START_HINT_DASHBOARD':
      return { ...state, firstStartHintVisible: false };

    case 'SET_LAST_UPDATED_DASHBOARD':
      return { ...state, lastUpdated: action.lastUpdated };

    case 'TRANSFORM_DATA_STRUCTURE_DASHBOARD': {
      const days = cloneDeep(state.days);
      Object.keys(days).forEach((timestamp) => {
        const encounters = []; //days[timestamp]?.encounters || [];

        days[timestamp]?.persons?.forEach(({ id }) => {
          const encounter = {
            id: uuidv4(),
            persons: [id],
            timestamp,
            timestampStart: parseInt(timestamp, 10),
            timestampEnd: parseInt(timestamp, 10),
          };
          encounters.push(encounter);
        });
        delete days[timestamp].persons;

        days[timestamp]?.locations?.forEach(({ description, id, timestamp: timestampStart, timestampEnd }) => {
          const encounter = {
            id: uuidv4(),
            location: id,
            note: description,
            persons: [],
            timestamp,
            timestampStart,
            timestampEnd,
          };
          encounters.push(encounter);
        });
        delete days[timestamp].locations;

        days[timestamp].encounters = encounters;
      });

      return { ...state, days };
    }

    default:
      return state;
  }
};
