import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import withViewportUnits from '../../../utils/withViewportUnits';
import { setShowKey } from './actions';
import Screen from './ui';

const finish = (navigation) => async (dispatch, getState) => {
  const {
    app: { welcomeScreenShowKey },
  } = getState();

  dispatch(setShowKey(welcomeScreenShowKey));

  navigation.navigate('App');
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    finish: (navigation) => dispatch(finish(navigation)),
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const Welcome = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Container)));

export default Welcome;
