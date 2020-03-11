const initialState = {
  appVersionLastVisited: '',
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SET_APP_VERSION_LAST_VISITED_WELCOME':
      return { ...state, appVersionLastVisited: action.appVersionLastVisited };

    default:
      return state;
  }
};
