import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import { activateDefaultNotifications } from '../Settings/logic';
import { setShowKey } from './actions';
import Screen from './ui';

const finish = (navigation) => async (dispatch, getState) => {
  const {
    app: { welcomeScreenShowKey },
  } = getState();

  dispatch(setShowKey(welcomeScreenShowKey));

  navigation.navigate('App');
};

const activateNotifications = (__, cb) => async (dispatch) => {
  dispatch(activateDefaultNotifications(__, cb));
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateNotifications: (__, cb) => dispatch(activateNotifications(__, cb)),
    finish: (navigation) => dispatch(finish(navigation)),
  };
};

const Welcome = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default Welcome;
