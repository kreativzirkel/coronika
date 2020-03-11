const initialState = {
  showKey: '',
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SET_SHOW_KEY_WELCOME':
      return { ...state, showKey: action.showKey };

    default:
      return state;
  }
};
