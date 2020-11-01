import cloneDeep from 'lodash/cloneDeep';

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
            persons: [],
            locations: [],
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

    case 'ADD_PERSON_TO_DAY_DASHBOARD': {
      const timestamp = action.timestamp;
      const personId = action.personId;
      const days = cloneDeep(state.days);

      if (!days[timestamp].persons.find(({ id }) => id === personId)) {
        days[timestamp].persons.push({ id: personId });
      }

      return { ...state, days };
    }

    case 'REMOVE_PERSON_FROM_DAY_DASHBOARD': {
      const timestamp = action.timestamp;
      const personId = action.personId;
      const days = cloneDeep(state.days);

      if (days[timestamp].persons.find(({ id }) => id === personId)) {
        days[timestamp].persons = days[timestamp].persons.filter(({ id }) => id !== personId);
      }

      return { ...state, days };
    }

    case 'ADD_LOCATION_TO_DAY_DASHBOARD': {
      const timestamp = action.timestamp;
      const location = action.location;
      const days = cloneDeep(state.days);
      const existingLocation = days[timestamp].locations.find(({ id }) => id === location.id);

      if (
        !existingLocation ||
        existingLocation.description !== location.description ||
        existingLocation.timestamp !== location.timestamp
      ) {
        days[timestamp].locations.push(location);
      }

      return { ...state, days };
    }

    case 'REMOVE_LOCATION_FROM_DAY_DASHBOARD': {
      const dayTimestamp = action.timestamp;
      const locationId = action.locationId;
      const locationDescription = action.locationDescription;
      const locationTimestamp = action.locationTimestamp;
      const days = cloneDeep(state.days);

      if (
        days[dayTimestamp].locations.find(
          ({ id, description, timestamp }) =>
            id === locationId && description === locationDescription && timestamp === locationTimestamp
        )
      ) {
        days[dayTimestamp].locations = days[dayTimestamp].locations.filter(
          ({ id, description, timestamp }) =>
            id !== locationId ||
            (id === locationId && (description !== locationDescription || timestamp !== locationTimestamp))
        );
      }

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

    default:
      return state;
  }
};
