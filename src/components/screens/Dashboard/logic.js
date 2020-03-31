import moment from 'moment';
import connect from 'react-redux/lib/connect/connect';
import { DAYS_OVERVIEW } from '../../../constants';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import withViewportUnits from '../../../utils/withViewportUnits';
import { setTimestamp as setTimestampDay } from '../Day/actions';
import { initializeDays, hideFirstStartHint, confirmFirstStartHint, showFirstStartHint } from './actions';
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

  let differenceToLastDay = 0;

  if (Object.keys(days).length > 0) {
    const lastDay = Math.max(...Object.keys(days).map((timestamp) => parseInt(timestamp, 10)));
    differenceToLastDay = moment(lastDay).diff(today);
  }

  // add last 7 days if not already in list
  const daysInPast = Math.max(differenceToLastDay, 7);
  const addTimestamps = [];

  for (let i = 0; i < daysInPast; i++) {
    const currentDay = moment(today).subtract(i, 'days');
    const currentDayTimestamp = currentDay.valueOf();
    addTimestamps.push(currentDayTimestamp);
  }

  const maxTimestamp = moment(today)
    .subtract(DAYS_OVERVIEW, 'days')
    .valueOf();
  dispatch(initializeDays(addTimestamps, maxTimestamp));
};

const loadMoreDays = () => async (dispatch, getState) => {
  const {
    dashboard: { days },
  } = getState();

  const firstDay = Math.min(...Object.keys(days).map((timestamp) => parseInt(timestamp, 10)));

  const daysToAdd = 7;
  const addTimestamps = [];

  for (let i = 1; i <= daysToAdd; i++) {
    const currentDay = moment(firstDay).subtract(i, 'days');
    const currentDayTimestamp = currentDay.valueOf();
    addTimestamps.push(currentDayTimestamp);
  }

  const maxTimestamp = moment(firstDay)
    .subtract(DAYS_OVERVIEW, 'days')
    .valueOf();
  dispatch(initializeDays(addTimestamps, maxTimestamp));
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
    .map(({ persons, locations }) => ({
      persons: persons.map(({ id }) => id),
      locations: locations.map(({ id }) => id),
    }))
    .reduce(
      (accumulator, currentValue) => ({
        persons: [...accumulator.persons, ...currentValue.persons],
        locations: [...accumulator.locations, ...currentValue.locations],
      }),
      { persons: [], locations: [] }
    );

  total.locations = [...new Set(total.locations)].length;
  total.persons = [...new Set(total.persons)].length;

  return {
    days: daysList,
    firstStartHintVisible,
    total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeFirstStartHint: () => dispatch(closeFirstStartHint()),
    loadMoreDays: () => dispatch(loadMoreDays()),
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
