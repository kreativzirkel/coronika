import moment from 'moment';
import connect from 'react-redux/lib/connect/connect';
//import withI18n from '../../../i18n';
import { container } from '../../utils/react';
//import { setTimestamp as setTimestampDay } from '../Day/actions';
import { addDay } from './actions';
import Screen from './ui';

const loadDays = () => async (dispatch, getState) => {
  const {
    app: { days },
  } = getState();

  const today = moment()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0);

  // add last 21 days if not already in list
  for (let i = 0; i < 21; i++) {
    const currentDay = moment(today).subtract(i, 'days');
    const currentDayTimestamp = currentDay.valueOf();

    if (!days[currentDayTimestamp]) {
      dispatch(addDay({ timestamp: currentDayTimestamp }));
    }
  }
};

const mapStateToProps = () => {


  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const Container = container(Screen, {
  componentDidMount() {
    const {
      store: { dispatch },
    } = this.context;

    dispatch(loadDays());
  },
});

const App = connect(mapStateToProps, mapDispatchToProps)(Container);

export default App;
