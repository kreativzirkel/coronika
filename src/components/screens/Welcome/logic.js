import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import { setAppVersionLastVisited } from './actions';
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
      app: { version },
    } = getState();

    dispatch(setAppVersionLastVisited(version));
  },
});

const Welcome = withI18n(connect(mapStateToProps, mapDispatchToProps)(Container));

export default Welcome;
