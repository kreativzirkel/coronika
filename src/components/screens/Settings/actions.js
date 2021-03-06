export const enableNotificationChristmas = () => ({ type: 'ENABLE_NOTIFICATION_CHRISTMAS_SETTINGS' });

export const disableNotificationChristmas = () => ({ type: 'DISABLE_NOTIFICATION_CHRISTMAS_SETTINGS' });

export const enableNotificationDiary = () => ({ type: 'ENABLE_NOTIFICATION_DIARY_SETTINGS' });

export const disableNotificationDiary = () => ({ type: 'DISABLE_NOTIFICATION_DIARY_SETTINGS' });

export const enableNotificationDisinfectPhone = () => ({ type: 'ENABLE_NOTIFICATION_DISINFECT_SMARTPHONE_SETTINGS' });

export const disableNotificationDisinfectPhone = () => ({ type: 'DISABLE_NOTIFICATION_DISINFECT_SMARTPHONE_SETTINGS' });

export const enableNotificationWashingHandsOption1 = () => ({
  type: 'ENABLE_NOTIFICATION_WASHING_HANDS_OPTION_1_SETTINGS',
});

export const enableNotificationWashingHandsOption2 = () => ({
  type: 'ENABLE_NOTIFICATION_WASHING_HANDS_OPTION_2_SETTINGS',
});

export const disableNotificationWashingHands = () => ({ type: 'DISABLE_NOTIFICATION_WASHING_HANDS_SETTINGS' });

export const setColorScheme = (colorScheme) => ({ type: 'SET_COLOR_SCHEME_SETTINGS', colorScheme });

export const setShowKeyEncounterHints = (showKeyEncounterHints) => ({
  type: 'SET_SHOW_KEY_ENCOUNTER_HINTS_SETTINGS',
  showKeyEncounterHints,
});

export const setShowKeyUpdateHints = (showKeyUpdateHints) => ({
  type: 'SET_SHOW_KEY_UPDATE_HINTS_SETTINGS',
  showKeyUpdateHints,
});

export const setShowKeyVentilationModeHints = (showKeyVentilationModeHints) => ({
  type: 'SET_SHOW_KEY_VENTILATION_MODE_HINTS_SETTINGS',
  showKeyVentilationModeHints,
});

export const setShowKeyWelcome = (showKeyWelcome) => ({ type: 'SET_SHOW_KEY_WELCOME_SETTINGS', showKeyWelcome });

export const setVersionDataStructure = (versionDataStructure) => ({
  type: 'SET_VERSION_DATA_STRUCTURE_SETTINGS',
  versionDataStructure,
});
