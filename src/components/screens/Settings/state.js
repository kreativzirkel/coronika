const initialState = {
  notificationDiaryEnabled: false,
  notificationDisinfectSmartphoneEnabled: false,
  notificationWashingHandsEnabled: false,
  notificationWashingHandsOption1Enabled: false,
  notificationWashingHandsOption2Enabled: false,
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
