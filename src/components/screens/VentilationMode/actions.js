export const setDuration = (duration) => ({ type: 'SET_DURATION_VENTILATION_MODE', duration });

export const setHours = (hours) => ({ type: 'SET_HOURS_VENTILATION_MODE', hours });

export const setTimestamps = (timestamps) => ({ type: 'SET_TIMESTAMPS_VENTILATION_MODE', timestamps });

export const showModalHints = () => ({ type: 'SHOW_MODAL_HINTS_VENTILATION_MODE' });

export const hideModalHints = () => ({ type: 'HIDE_MODAL_HINTS_VENTILATION_MODE' });

export const reset = () => ({ type: 'RESET_VENTILATION_MODE' });
