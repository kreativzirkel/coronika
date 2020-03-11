import connect from 'react-redux/lib/connect/connect';
import { container } from '../../utils/react';
import Screen from './ui';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const Container = container(Screen, {
  componentDidMount() {},
});

const App = connect(mapStateToProps, mapDispatchToProps)(Container);

export default App;
