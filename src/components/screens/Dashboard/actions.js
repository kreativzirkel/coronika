export const initializeDays = (addTimestamps, minTimestamp) => ({
  type: 'INITIALIZE_DAYS_DASHBOARD',
  addTimestamps,
  minTimestamp,
});

export const addPersonToDay = (timestamp, personId) => ({ type: 'ADD_PERSON_TO_DAY_DASHBOARD', timestamp, personId });

export const removePersonFromDay = (timestamp, personId) => ({
  type: 'REMOVE_PERSON_FROM_DAY_DASHBOARD',
  timestamp,
  personId,
});

export const removePersonFromAllDays = (personId) => ({ type: 'REMOVE_PERSON_FROM_ALL_DAYS_DASHBOARD', personId });

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

export const removeLocationFromAllDays = (locationId) => ({
  type: 'REMOVE_LOCATION_FROM_ALL_DAYS_DASHBOARD',
  locationId,
});

export const confirmFirstStartHint = () => ({ type: 'CONFIRM_FIRST_START_HINT_DASHBOARD' });

export const showFirstStartHint = () => ({ type: 'SHOW_FIRST_START_HINT_DASHBOARD' });

export const hideFirstStartHint = () => ({ type: 'HIDE_FIRST_START_HINT_DASHBOARD' });

export const setLastUpdated = (lastUpdated) => ({ type: 'SET_LAST_UPDATED_DASHBOARD', lastUpdated });

export const transformDataStructure = () => ({ type: 'TRANSFORM_DATA_STRUCTURE_DASHBOARD' });
