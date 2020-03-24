import moment from 'moment';
import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import withViewportUnits from '../../../utils/withViewportUnits';
import { setTimestamp as setTimestampDay } from '../Day/actions';
import { addDay, hideFirstStartHint, confirmFirstStartHint, showFirstStartHint } from './actions';
import Screen from './ui';

const loadDays = () => async (dispatch, getState) => {
  const {
    dashboard: { days },
  } = getState();

  const today = moment()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0);

  // add last 7 days if not already in list
  const daysInPast = 7;

  for (let i = 0; i < daysInPast; i++) {
    const currentDay = moment(today).subtract(i, 'days');
    const currentDayTimestamp = currentDay.valueOf();

    if (!days[currentDayTimestamp]) {
      dispatch(addDay({ timestamp: currentDayTimestamp }));
    }
  }
};

const daysSortingFunction = (a, b) => {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }

  return 0;
};

const openDay = (timestamp, navigation) => async (dispatch, getState) => {
  dispatch(setTimestampDay(timestamp));
  dispatch(hideFirstStartHint());
  dispatch(confirmFirstStartHint());

  navigation.navigate('Day');
};

const closeFirstStartHint = () => async (dispatch, getState) => {
  dispatch(hideFirstStartHint());
  dispatch(confirmFirstStartHint());
};

const mapStateToProps = ({ dashboard: { days, firstStartHintVisible } }) => {
  const daysList = Object.keys(days)
    .sort((a, b) => daysSortingFunction(a, b))
    .map((timestamp) => days[timestamp]);

  const total = Object.values(days)
    .map(({ persons, locations }) => ({ persons: persons.length, locations: locations.length }))
    .reduce(
      (accumulator, currentValue) => ({
        persons: accumulator.persons + currentValue.persons,
        locations: accumulator.locations + currentValue.locations,
      }),
      { persons: 0, locations: 0 }
    );

  return {
    days: daysList,
    firstStartHintVisible,
    total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeFirstStartHint: () => dispatch(closeFirstStartHint()),
    openDay: (timestamp, navigation) => dispatch(openDay(timestamp, navigation)),
  };
};

const Container = container(Screen, {
  componentDidMount() {
    (async () => {
      const {
        store: { dispatch, getState },
      } = this.context;

      await dispatch(await loadDays());

      const {
        dashboard: { days, firstStartHintConfirmed },
      } = getState();

      if (!firstStartHintConfirmed) {
        const total = Object.values(days)
          .map(({ persons, locations }) => ({ persons: persons.length, locations: locations.length }))
          .reduce(
            (accumulator, currentValue) => ({
              persons: accumulator.persons + currentValue.persons,
              locations: accumulator.locations + currentValue.locations,
            }),
            { persons: 0, locations: 0 }
          );

        if (total.persons === 0 && total.locations === 0) {
          dispatch(showFirstStartHint());
        }
      }
    })();
  },
});

const Dashboard = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Container)));

export default Dashboard;
