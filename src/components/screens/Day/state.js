const initialState = {
  isDateSwitcherModalVisible: false,
  timestamp: 0,
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SET_TIMESTAMP_DAY':
      return { ...state, timestamp: action.timestamp };

    case 'SHOW_DATE_SWITCHER_MODAL_DAY':
      return { ...state, isDateSwitcherModalVisible: true };

    case 'HIDE_DATE_SWITCHER_MODAL_DAY':
      return { ...state, isDateSwitcherModalVisible: false };

    default:
      return state;
  }
};
