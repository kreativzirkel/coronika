const initialState = {
  colorScheme: 'light',
  notificationChristmasEnabled: undefined,
  notificationDiaryEnabled: false,
  notificationDisinfectSmartphoneEnabled: false,
  notificationWashingHandsEnabled: false,
  notificationWashingHandsOption1Enabled: false,
  notificationWashingHandsOption2Enabled: false,
  showKeyEncounterHints: '',
  showKeyUpdateHints: '',
  showKeyVentilationModeHints: '',
  showKeyWelcome: '',
  versionDataStructure: '',
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'ENABLE_NOTIFICATION_CHRISTMAS_SETTINGS':
      return { ...state, notificationChristmasEnabled: true };

    case 'DISABLE_NOTIFICATION_CHRISTMAS_SETTINGS':
      return { ...state, notificationChristmasEnabled: false };

    case 'ENABLE_NOTIFICATION_DIARY_SETTINGS':
      return { ...state, notificationDiaryEnabled: true };

    case 'DISABLE_NOTIFICATION_DIARY_SETTINGS':
      return { ...state, notificationDiaryEnabled: false };

    case 'ENABLE_NOTIFICATION_DISINFECT_SMARTPHONE_SETTINGS':
      return { ...state, notificationDisinfectSmartphoneEnabled: true };

    case 'DISABLE_NOTIFICATION_DISINFECT_SMARTPHONE_SETTINGS':
      return { ...state, notificationDisinfectSmartphoneEnabled: false };

    case 'ENABLE_NOTIFICATION_WASHING_HANDS_OPTION_1_SETTINGS':
      return {
        ...state,
        notificationWashingHandsEnabled: true,
        notificationWashingHandsOption1Enabled: true,
        notificationWashingHandsOption2Enabled: false,
      };

    case 'ENABLE_NOTIFICATION_WASHING_HANDS_OPTION_2_SETTINGS':
      return {
        ...state,
        notificationWashingHandsEnabled: true,
        notificationWashingHandsOption1Enabled: false,
        notificationWashingHandsOption2Enabled: true,
      };

    case 'DISABLE_NOTIFICATION_WASHING_HANDS_SETTINGS':
      return {
        ...state,
        notificationWashingHandsEnabled: false,
        notificationWashingHandsOption1Enabled: false,
        notificationWashingHandsOption2Enabled: false,
      };

    case 'SET_COLOR_SCHEME_SETTINGS':
      return { ...state, colorScheme: action.colorScheme };

    case 'SET_SHOW_KEY_ENCOUNTER_HINTS_SETTINGS':
      return { ...state, showKeyEncounterHints: action.showKeyEncounterHints };

    case 'SET_SHOW_KEY_UPDATE_HINTS_SETTINGS':
      return { ...state, showKeyUpdateHints: action.showKeyUpdateHints };

    case 'SET_SHOW_KEY_VENTILATION_MODE_HINTS_SETTINGS':
      return { ...state, showKeyVentilationModeHints: action.showKeyVentilationModeHints };

    case 'SET_SHOW_KEY_WELCOME_SETTINGS':
      return { ...state, showKeyWelcome: action.showKeyWelcome };

    case 'SET_VERSION_DATA_STRUCTURE_SETTINGS':
      return { ...state, versionDataStructure: action.versionDataStructure };

    default:
      return state;
  }
};
