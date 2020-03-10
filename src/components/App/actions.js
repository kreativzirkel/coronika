export const addDay = (day) => ({ type: 'ADD_DAY_APP', day });

export const addContactToDay = (timestamp, contact) => ({ type: 'ADD_CONTACT_TO_DAY_APP', timestamp, contact });

export const removeContactFromDay = (timestamp, contactId) => ({
  type: 'REMOVE_CONTACT_FROM_DAY_APP',
  timestamp,
  contactId,
});

export const addLocationToDay = (timestamp, location) => ({ type: 'ADD_LOCATION_TO_DAY_APP', timestamp, location });

export const removeLocationFromDay = (timestamp, locationId) => ({
  type: 'REMOVE_LOCATION_FROM_DAY_APP',
  timestamp,
  locationId,
});
