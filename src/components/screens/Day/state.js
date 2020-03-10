const initialState = {
  timestamp: 0,
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SET_TIMESTAMP_DAY':
      return { ...state, timestamp: action.timestamp };

    default:
      return state;
  }
};
