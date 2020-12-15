export const setData = (data) => ({ type: 'SET_DATA_ENCOUNTER', data });

export const showDateSwitcherModal = () => ({ type: 'SHOW_DATE_SWITCHER_MODAL_ENCOUNTER' });

export const hideDateSwitcherModal = () => ({ type: 'HIDE_DATE_SWITCHER_MODAL_ENCOUNTER' });

export const showModalConfirmDelete = () => ({ type: 'SHOW_MODAL_CONFIRM_DELETE_ENCOUNTER' });

export const hideModalConfirmDelete = () => ({ type: 'HIDE_MODAL_CONFIRM_DELETE_ENCOUNTER' });

export const showModalHints = () => ({ type: 'SHOW_MODAL_HINTS_ENCOUNTER' });

export const hideModalHints = () => ({ type: 'HIDE_MODAL_HINTS_ENCOUNTER' });

export const reset = () => ({ type: 'RESET_ENCOUNTER' });
