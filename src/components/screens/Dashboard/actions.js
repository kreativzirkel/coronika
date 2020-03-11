export const addDay = (day) => ({ type: 'ADD_DAY_DASHBOARD', day });

export const addContactToDay = (timestamp, contact) => ({ type: 'ADD_CONTACT_TO_DAY_DASHBOARD', timestamp, contact });

export const removeContactFromDay = (timestamp, contactId) => ({
  type: 'REMOVE_CONTACT_FROM_DAY_DASHBOARD',
  timestamp,
  contactId,
});

export const addLocationToDay = (timestamp, location) => ({
  type: 'ADD_LOCATION_TO_DAY_DASHBOARD',
  timestamp,
  location,
});

export const removeLocationFromDay = (timestamp, locationId, locationDescription, locationTimestamp) => ({
  type: 'REMOVE_LOCATION_FROM_DAY_DASHBOARD',
  timestamp,
  locationId,
  locationDescription,
  locationTimestamp,
});
