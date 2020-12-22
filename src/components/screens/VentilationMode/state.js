const initialState = {
  duration: 1800, // 1800 (30 minutes) or 900 (15 minutes)
  hours: 2,
  modalHintsVisible: false,
  timestamps: [],
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SET_DURATION_VENTILATION_MODE': {
      const duration = action.duration;

      if ([900, 1800].includes(duration)) {
        return { ...state, duration };
      }

      return state;
    }

    case 'SET_HOURS_VENTILATION_MODE': {
      let hours = action.hours;

      if (hours < 1) {
        hours = 1;
      } else if (hours > 23) {
        hours = 23;
      }

      return { ...state, hours };
    }

    case 'SET_TIMESTAMPS_VENTILATION_MODE':
      return { ...state, timestamps: action.timestamps };

    case 'SHOW_MODAL_HINTS_VENTILATION_MODE':
      return { ...state, modalHintsVisible: true };

    case 'HIDE_MODAL_HINTS_VENTILATION_MODE':
      return { ...state, modalHintsVisible: false };

    case 'RESET_VENTILATION_MODE':
      return { ...initialState, duration: state.duration, hours: state.hours };

    default:
      return state;
  }
};
