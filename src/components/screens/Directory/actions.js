export const addPerson = (person) => ({ type: 'ADD_PERSON_DIRECTORY', person });

export const removePerson = (personId) => ({ type: 'REMOVE_PERSON_DIRECTORY', personId });

export const hidePerson = (personId) => ({ type: 'HIDE_PERSON_DIRECTORY', personId });

export const updatePerson = (person) => ({ type: 'UPDATE_PERSON_DIRECTORY', person });

export const addLocation = (location) => ({ type: 'ADD_LOCATION_DIRECTORY', location });

export const removeLocation = (locationId) => ({ type: 'REMOVE_LOCATION_DIRECTORY', locationId });

export const updateLocation = (location) => ({ type: 'UPDATE_LOCATION_DIRECTORY', location });

export const importPersons = (persons) => ({ type: 'IMPORT_PERSONS_DIRECTORY', persons });

export const showHidePersonsModal = () => ({ type: 'SHOW_HIDE_PERSONS_MODAL_DIRECTORY' });

export const hideHidePersonsModal = () => ({ type: 'HIDE_HIDE_PERSONS_MODAL_DIRECTORY' });

export const showImportPersonsModal = () => ({ type: 'SHOW_IMPORT_PERSONS_MODAL_DIRECTORY' });

export const hideImportPersonsModal = () => ({ type: 'HIDE_IMPORT_PERSONS_MODAL_DIRECTORY' });

export const showMoreModal = () => ({ type: 'SHOW_MORE_MODAL_DIRECTORY' });

export const hideMoreModal = () => ({ type: 'HIDE_MORE_MODAL_DIRECTORY' });

export const enablePersonsImporting = () => ({ type: 'ENABLE_PERSONS_IMPORTING_DIRECTORY' });

export const disablePersonsImporting = () => ({ type: 'DISABLE_PERSONS_IMPORTING_DIRECTORY' });

export const resetLastUsageOfLocation = (id) => ({ type: 'RESET_LAST_USAGE_OF_LOCATION_DIRECTORY', id });

export const resetLastUsageOfPerson = (id) => ({ type: 'RESET_LAST_USAGE_OF_PERSON_DIRECTORY', id });

export const updateLastUsageOfLocation = (id) => ({ type: 'UPDATE_LAST_USAGE_OF_LOCATION_DIRECTORY', id });

export const updateLastUsageOfPerson = (id) => ({ type: 'UPDATE_LAST_USAGE_OF_PERSON_DIRECTORY', id });

export const updateHiddenPersons = (hiddenPersons) => ({ type: 'UPDATE_HIDDEN_PERSONS_DIRECTORY', hiddenPersons });
