export const addDay = (day) => ({ type: 'ADD_DAY_DASHBOARD', day });

export const addPersonToDay = (timestamp, person) => ({ type: 'ADD_PERSON_TO_DAY_DASHBOARD', timestamp, person });

export const removePersonFromDay = (timestamp, personId) => ({
  type: 'REMOVE_PERSON_FROM_DAY_DASHBOARD',
  timestamp,
  personId,
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

export const confirmFirstStartHint = () => ({ type: 'CONFIRM_FIRST_START_HINT_DASHBOARD' });

export const showFirstStartHint = () => ({ type: 'SHOW_FIRST_START_HINT_DASHBOARD' });

export const hideFirstStartHint = () => ({ type: 'HIDE_FIRST_START_HINT_DASHBOARD' });
