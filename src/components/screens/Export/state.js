const initialState = {
  isExporting: false,
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'ENABLE_EXPORTING_EXPORT':
      return { ...state, isExporting: true };

    case 'DISABLE_EXPORTING_EXPORT':
      return { ...state, isExporting: false };

    default:
      return state;
  }
};
