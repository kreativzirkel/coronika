const initialState = {
  colorScheme: undefined,
  screenHeight: undefined,
  screenOrientation: undefined,
  screenWidth: undefined,
  showKeyEncounterHints: '1',
  showKeyUpdateHints: '1',
  showKeyVentilationModeHints: '1',
  showKeyWelcome: '8',
  versionDataStructure: '2',
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SET_COLOR_SCHEME_APP':
      return { ...state, colorScheme: action.colorScheme };

    case 'SET_SCREEN_DIMENSIONS_APP': {
      const screenHeight = action.screenHeight;
      const screenWidth = action.screenWidth;
      const screenOrientation = screenWidth < screenHeight ? 'portrait' : 'landscape';

      return { ...state, screenOrientation, screenHeight, screenWidth };
    }

    default:
      return state;
  }
};
