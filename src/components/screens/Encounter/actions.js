export const removePerson = (id) => ({ type: 'REMOVE_PERSON_ENCOUNTER', id });

export const setPersons = (persons) => ({ type: 'SET_PERSONS_ENCOUNTER', persons });

export const setData = (data) => ({ type: 'SET_DATA_ENCOUNTER', data });

export const setDistance = (distance) => ({ type: 'SET_DISTANCE_ENCOUNTER', distance });

export const setLocation = (location) => ({ type: 'SET_LOCATION_ENCOUNTER', location });

export const setMask = (mask) => ({ type: 'SET_MASK_ENCOUNTER', mask });

export const setNote = (note) => ({ type: 'SET_NOTE_ENCOUNTER', note });

export const setOutside = (outside) => ({ type: 'SET_OUTSIDE_ENCOUNTER', outside });

export const setTimestampStart = (timestampStart) => ({ type: 'SET_TIMESTAMP_START_ENCOUNTER', timestampStart });

export const setTimestampEnd = (timestampEnd) => ({ type: 'SET_TIMESTAMP_END_ENCOUNTER', timestampEnd });

export const setVentilation = (ventilation) => ({ type: 'SET_VENTILATION_ENCOUNTER', ventilation });

export const showDateSwitcherModal = () => ({ type: 'SHOW_DATE_SWITCHER_MODAL_ENCOUNTER' });

export const hideDateSwitcherModal = () => ({ type: 'HIDE_DATE_SWITCHER_MODAL_ENCOUNTER' });

export const showModalConfirmDelete = () => ({ type: 'SHOW_MODAL_CONFIRM_DELETE_ENCOUNTER' });

export const hideModalConfirmDelete = () => ({ type: 'HIDE_MODAL_CONFIRM_DELETE_ENCOUNTER' });

export const showModalHints = () => ({ type: 'SHOW_MODAL_HINTS_ENCOUNTER' });

export const hideModalHints = () => ({ type: 'HIDE_MODAL_HINTS_ENCOUNTER' });

export const showModalSelectLocation = () => ({ type: 'SHOW_MODAL_SELECT_LOCATION_ENCOUNTER' });

export const hideModalSelectLocation = () => ({ type: 'HIDE_MODAL_SELECT_LOCATION_ENCOUNTER' });

export const showModalSelectPersons = () => ({ type: 'SHOW_MODAL_SELECT_PERSONS_ENCOUNTER' });

export const hideModalSelectPersons = () => ({ type: 'HIDE_MODAL_SELECT_PERSONS_ENCOUNTER' });

export const showModalTimestampEnd = () => ({ type: 'SHOW_MODAL_TIMESTAMP_END_ENCOUNTER' });

export const hideModalTimestampEnd = () => ({ type: 'HIDE_MODAL_TIMESTAMP_END_ENCOUNTER' });

export const showModalTimestampStart = () => ({ type: 'SHOW_MODAL_TIMESTAMP_START_ENCOUNTER' });

export const hideModalTimestampStart = () => ({ type: 'HIDE_MODAL_TIMESTAMP_START_ENCOUNTER' });

export const reset = () => ({ type: 'RESET_ENCOUNTER' });
