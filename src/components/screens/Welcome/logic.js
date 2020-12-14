import { connect } from 'react-redux';
import withI18n from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import importPersons from '../Directory/importPersons';
import { activateDefaultNotifications } from '../Settings/logic';
import { setShowKeyWelcome } from '../Settings/actions';
import Screen from './ui';

const finish = (navigation) => async (dispatch, getState) => {
  const {
    app: { showKeyWelcome },
  } = getState();

  dispatch(setShowKeyWelcome(showKeyWelcome));

  navigation.navigate('App');
};

const activateNotifications = (__, cb) => async (dispatch) => {
  dispatch(activateDefaultNotifications(__, cb));
};

const importContacts = (__, cb) => async (dispatch) => {
  dispatch(importPersons(__, true, cb));
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateNotifications: (__, cb) => dispatch(activateNotifications(__, cb)),
    finish: (navigation) => dispatch(finish(navigation)),
    importContacts: (__, cb) => dispatch(importContacts(__, cb)),
  };
};

const Welcome = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default Welcome;
