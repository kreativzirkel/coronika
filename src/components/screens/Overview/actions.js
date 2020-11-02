export const showLocationOverviewModal = () => ({ type: 'SHOW_LOCATION_OVERVIEW_MODAL_OVERVIEW' });

export const hideLocationOverviewModal = () => ({ type: 'HIDE_LOCATION_OVERVIEW_MODAL_OVERVIEW' });

export const showPersonOverviewModal = () => ({ type: 'SHOW_PERSON_OVERVIEW_MODAL_OVERVIEW' });

export const hidePersonOverviewModal = () => ({ type: 'HIDE_PERSON_OVERVIEW_MODAL_OVERVIEW' });

export const setSelectedLocationId = (selectedLocationId) => ({
  type: 'SET_SELECTED_LOCATION_ID_OVERVIEW',
  selectedLocationId,
});

export const setSelectedPersonId = (selectedPersonId) => ({
  type: 'SET_SELECTED_PERSON_ID_OVERVIEW',
  selectedPersonId,
});
