const initialState = {
  distance: undefined, // true, false, undefined
  id: undefined,
  isDateSwitcherModalVisible: false,
  outside: undefined, // true, false, undefined
  location: undefined,
  mask: undefined, // true, false, undefined
  modalConfirmDeleteVisible: false,
  modalSelectLocationVisible: false,
  modalSelectPersonsVisible: false,
  modalTimestampEndVisible: false,
  modalTimestampStartVisible: false,
  note: '',
  persons: [],
  timestampStart: 0,
  timestampEnd: 0,
  ventilation: undefined, // true, false, undefined
};

// TODO
/* eslint-disable-next-line complexity */
export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'ADD_PERSON_ENCOUNTER': {
      const id = action.id;

      return { ...state, persons: [...state.persons, id] };
    }

    case 'REMOVE_PERSON_ENCOUNTER': {
      const id = action.id;

      return { ...state, persons: state.persons.filter((personId) => personId !== id) };
    }

    case 'SET_PERSONS_ENCOUNTER':
      return { ...state, persons: action.persons };

    case 'SET_DATA_ENCOUNTER':
      return { ...initialState, ...action.data };

    case 'SET_DISTANCE_ENCOUNTER':
      return { ...state, distance: action.distance };

    case 'SET_LOCATION_ENCOUNTER':
      return { ...state, location: action.location };

    case 'SET_MASK_ENCOUNTER':
      return { ...state, mask: action.mask };

    case 'SET_NOTE_ENCOUNTER': {
      if (action.note?.trim()?.length === 0) return { ...state, note: '' };

      if (action.note?.length <= 512) return { ...state, note: action.note };

      return state;
    }

    case 'SET_OUTSIDE_ENCOUNTER': {
      if (action.outside === undefined || action.outside === true) {
        return { ...state, outside: action.outside, ventilation: undefined };
      }

      return { ...state, outside: action.outside };
    }

    case 'SET_VENTILATION_ENCOUNTER':
      return { ...state, ventilation: action.ventilation };

    case 'SET_TIMESTAMP_START_ENCOUNTER': {
      const timestampStart = action.timestampStart;
      const timestampEnd = timestampStart < state.timestampEnd ? state.timestampEnd : timestampStart;

      return { ...state, timestampStart, timestampEnd };
    }

    case 'SET_TIMESTAMP_END_ENCOUNTER': {
      const timestampEnd = action.timestampEnd;
      const timestampStart = timestampEnd > state.timestampStart ? state.timestampStart : timestampEnd;

      return { ...state, timestampStart, timestampEnd };
    }

    case 'SHOW_DATE_SWITCHER_MODAL_ENCOUNTER':
      return { ...state, isDateSwitcherModalVisible: true };

    case 'HIDE_DATE_SWITCHER_MODAL_ENCOUNTER':
      return { ...state, isDateSwitcherModalVisible: false };

    case 'SHOW_MODAL_CONFIRM_DELETE_ENCOUNTER':
      return { ...state, modalConfirmDeleteVisible: true };

    case 'HIDE_MODAL_CONFIRM_DELETE_ENCOUNTER':
      return { ...state, modalConfirmDeleteVisible: false };

    case 'SHOW_MODAL_SELECT_LOCATION_ENCOUNTER':
      return { ...state, modalSelectLocationVisible: true };

    case 'HIDE_MODAL_SELECT_LOCATION_ENCOUNTER':
      return { ...state, modalSelectLocationVisible: false };

    case 'SHOW_MODAL_SELECT_PERSONS_ENCOUNTER':
      return { ...state, modalSelectPersonsVisible: true };

    case 'HIDE_MODAL_SELECT_PERSONS_ENCOUNTER':
      return { ...state, modalSelectPersonsVisible: false };

    case 'SHOW_MODAL_TIMESTAMP_END_ENCOUNTER':
      return { ...state, modalTimestampEndVisible: true };

    case 'HIDE_MODAL_TIMESTAMP_END_ENCOUNTER':
      return { ...state, modalTimestampEndVisible: false };

    case 'SHOW_MODAL_TIMESTAMP_START_ENCOUNTER':
      return { ...state, modalTimestampStartVisible: true };

    case 'HIDE_MODAL_TIMESTAMP_START_ENCOUNTER':
      return { ...state, modalTimestampStartVisible: false };

    case 'RESET_ENCOUNTER':
      return initialState;

    default:
      return state;
  }
};
