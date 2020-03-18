export const addPerson = (person) => ({ type: 'ADD_PERSON_DIRECTORY', person });

export const removePerson = (personId) => ({ type: 'REMOVE_PERSON_DIRECTORY', personId });

export const updatePerson = (person) => ({ type: 'UPDATE_PERSON_DIRECTORY', person });

export const addLocation = (location) => ({ type: 'ADD_LOCATION_DIRECTORY', location });

export const removeLocation = (locationId) => ({ type: 'REMOVE_LOCATION_DIRECTORY', locationId });

export const updateLocation = (location) => ({ type: 'UPDATE_LOCATION_DIRECTORY', location });

export const importPersons = (persons) => ({ type: 'IMPORT_PERSONS_DIRECTORY', persons });

export const showImportPersonsModal = () => ({ type: 'SHOW_IMPORT_PERSONS_MODAL_DIRECTORY' });

export const hideImportPersonsModal = () => ({ type: 'HIDE_IMPORT_PERSONS_MODAL_DIRECTORY' });

export const enablePersonsImporting = () => ({ type: 'ENABLE_PERSONS_IMPORTING_DIRECTORY' });

export const disablePersonsImporting = () => ({ type: 'DISABLE_PERSONS_IMPORTING_DIRECTORY' });
