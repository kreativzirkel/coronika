const initialState = {
  isLocationOverviewModalVisible: false,
  isPersonOverviewModalVisible: false,
  selectedLocationId: '',
  selectedPersonId: '',
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SHOW_LOCATION_OVERVIEW_MODAL_OVERVIEW':
      return { ...state, isLocationOverviewModalVisible: true };

    case 'HIDE_LOCATION_OVERVIEW_MODAL_OVERVIEW':
      return { ...state, isLocationOverviewModalVisible: false };

    case 'SHOW_PERSON_OVERVIEW_MODAL_OVERVIEW':
      return { ...state, isPersonOverviewModalVisible: true };

    case 'HIDE_PERSON_OVERVIEW_MODAL_OVERVIEW':
      return { ...state, isPersonOverviewModalVisible: false };

    case 'SET_SELECTED_LOCATION_ID_OVERVIEW':
      return { ...state, selectedLocationId: action.selectedLocationId };

    case 'SET_SELECTED_PERSON_ID_OVERVIEW':
      return { ...state, selectedPersonId: action.selectedPersonId };

    default:
      return state;
  }
};
