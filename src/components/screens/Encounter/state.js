const initialState = {
  distance: undefined, // true, false, undefined
  id: undefined,
  isDateSwitcherModalVisible: false,
  outside: undefined, // true, false, undefined
  location: undefined,
  mask: undefined, // true, false, undefined
  modalConfirmDeleteVisible: false,
  modalHintsVisible: false,
  note: '',
  persons: [],
  timestampStart: 0,
  timestampEnd: 0,
  ventilation: undefined, // true, false, undefined
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SET_DATA_ENCOUNTER':
      return { ...initialState, ...action.data };

    case 'SHOW_DATE_SWITCHER_MODAL_ENCOUNTER':
      return { ...state, isDateSwitcherModalVisible: true };

    case 'HIDE_DATE_SWITCHER_MODAL_ENCOUNTER':
      return { ...state, isDateSwitcherModalVisible: false };

    case 'SHOW_MODAL_CONFIRM_DELETE_ENCOUNTER':
      return { ...state, modalConfirmDeleteVisible: true };

    case 'HIDE_MODAL_CONFIRM_DELETE_ENCOUNTER':
      return { ...state, modalConfirmDeleteVisible: false };

    case 'SHOW_MODAL_HINTS_ENCOUNTER':
      return { ...state, modalHintsVisible: true };

    case 'HIDE_MODAL_HINTS_ENCOUNTER':
      return { ...state, modalHintsVisible: false };

    case 'RESET_ENCOUNTER':
      return initialState;

    default:
      return state;
  }
};
