export const initializeDays = (addTimestamps, minTimestamp) => ({
  type: 'INITIALIZE_DAYS_DASHBOARD',
  addTimestamps,
  minTimestamp,
});

export const addEncounter = (encounter) => ({ type: 'ADD_ENCOUNTER_DASHBOARD', encounter });

export const updateEncounter = (encounter) => ({ type: 'UPDATE_ENCOUNTER_DASHBOARD', encounter });

export const removeEncounter = (id, timestamp) => ({ type: 'REMOVE_ENCOUNTER_DASHBOARD', id, timestamp });

export const setNoEncountersForDay = (timestamp) => ({ type: 'SET_NO_ENCOUNTERS_FOR_DAY_DASHBOARD', timestamp });

export const removePersonFromAllDays = (personId) => ({ type: 'REMOVE_PERSON_FROM_ALL_DAYS_DASHBOARD', personId });

export const removeLocationFromAllDays = (locationId) => ({
  type: 'REMOVE_LOCATION_FROM_ALL_DAYS_DASHBOARD',
  locationId,
});

export const confirmFirstStartHint = () => ({ type: 'CONFIRM_FIRST_START_HINT_DASHBOARD' });

export const showFirstStartHint = () => ({ type: 'SHOW_FIRST_START_HINT_DASHBOARD' });

export const hideFirstStartHint = () => ({ type: 'HIDE_FIRST_START_HINT_DASHBOARD' });

export const setLastUpdated = (lastUpdated) => ({ type: 'SET_LAST_UPDATED_DASHBOARD', lastUpdated });

export const transformDataStructure = () => ({ type: 'TRANSFORM_DATA_STRUCTURE_DASHBOARD' });
