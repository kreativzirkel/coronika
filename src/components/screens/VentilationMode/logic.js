import moment from 'moment';
import { connect } from 'react-redux';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import { setShowKeyVentilationModeHints } from '../Settings/actions';
import { updateVentilationModeNotifications } from '../Settings/logic';
import { hideModalHints, setDuration, setHours, setTimestamps, showModalHints, reset } from './actions';
import Screen from './ui';

const closeModalHints = () => async (dispatch, getState) => {
  const {
    app: { showKeyVentilationModeHints: showKeyVentilationModeHintsApp },
  } = getState();

  dispatch(setShowKeyVentilationModeHints(showKeyVentilationModeHintsApp));
  dispatch(hideModalHints());
};

const startVentilationMode = (timestamps, __) => async (dispatch) => {
  dispatch(setTimestamps(timestamps));
  dispatch(updateVentilationModeNotifications(timestamps, __));
};

const stopVentilationMode = (__) => async (dispatch) => {
  dispatch(reset());
  dispatch(updateVentilationModeNotifications([], __));
};

const mapStateToProps = ({
  app: { showKeyVentilationModeHints: showKeyVentilationModeHintsApp },
  settings: { showKeyVentilationModeHints: showKeyVentilationModeHintsSettings },
  ventilationMode: { duration, hours, modalHintsVisible, remainingTime, timestamps },
}) => {
  let enabled = false;
  const now = moment().valueOf();
  if (timestamps.length > 0 && Math.max(...timestamps) >= now) {
    enabled = true;
  }

  return {
    duration,
    enabled,
    hours,
    modalHintsVisible: modalHintsVisible || showKeyVentilationModeHintsApp !== showKeyVentilationModeHintsSettings,
    remainingTime,
    timestamps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModalHints: () => dispatch(closeModalHints()),
    setDuration: (duration) => dispatch(setDuration(duration)),
    setHours: (hours) => dispatch(setHours(hours)),
    showModalHints: () => dispatch(showModalHints()),
    start: (timestamps, __) => dispatch(startVentilationMode(timestamps, __)),
    stop: (__) => dispatch(stopVentilationMode(__)),
  };
};

const VentilationMode = withColorScheme(
  withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen)))
);

export default VentilationMode;
