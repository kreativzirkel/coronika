import cloneDeep from 'lodash/cloneDeep';

const initialState = {
  days: {},
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'ADD_DAY_DASHBOARD': {
      const day = {
        contacts: [],
        locations: [],
        ...action.day,
      };

      const days = state.days;
      days[day.timestamp] = day;

      return { ...state, days };
    }

    case 'ADD_CONTACT_TO_DAY_DASHBOARD': {
      const timestamp = action.timestamp;
      const contact = action.contact;
      const days = cloneDeep(state.days);

      if (!days[timestamp].contacts.find(({ id }) => id === contact.id)) {
        days[timestamp].contacts.push(contact);
      }

      return { ...state, days };
    }

    case 'REMOVE_CONTACT_FROM_DAY_DASHBOARD': {
      const timestamp = action.timestamp;
      const contactId = action.contactId;
      const days = cloneDeep(state.days);

      if (days[timestamp].contacts.find(({ id }) => id === contactId)) {
        days[timestamp].contacts = days[timestamp].contacts.filter(({ id }) => id !== contactId);
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
      const timestamp = action.timestamp;
      const locationId = action.locationId;
      const locationDescription = action.locationDescription;
      const locationTimestamp = action.locationTimestamp;
      const days = cloneDeep(state.days);

      if (
        days[timestamp].locations.find(
          ({ id, description, timestamp }) =>
            id === locationId && description === locationDescription && timestamp === locationTimestamp
        )
      ) {
        days[timestamp].locations = days[timestamp].locations.filter(
          ({ id, description, timestamp }) =>
            id !== locationId ||
            (id === locationId && (description !== locationDescription || timestamp !== locationTimestamp))
        );
      }

      return { ...state, days };
    }

    default:
      return state;
  }
};
