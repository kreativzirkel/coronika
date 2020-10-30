const initialState = {
  isDateSwitcherModalVisible: false,
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SHOW_DATE_SWITCHER_MODAL_ADD_ENTRY':
      return { ...state, isDateSwitcherModalVisible: true };

    case 'HIDE_DATE_SWITCHER_MODAL_ADD_ENTRY':
      return { ...state, isDateSwitcherModalVisible: false };

    default:
      return state;
  }
};
