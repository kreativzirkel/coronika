import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import withViewportUnits from '../../../utils/withViewportUnits';
import { setShowKey } from './actions';
import Screen from './ui';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (/* dispatch */) => {
  return {};
};

const Container = container(Screen, {
  componentDidMount() {
    const {
      store: { dispatch, getState },
    } = this.context;
    const {
      app: { welcomeScreenShowKey },
    } = getState();

    dispatch(setShowKey(welcomeScreenShowKey));
  },
});

const Welcome = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Container)));

export default Welcome;
