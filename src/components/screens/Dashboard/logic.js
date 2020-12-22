import moment from 'moment';
import { connect } from 'react-redux';
import { DAYS_LAST_USAGE, DAYS_OVERVIEW_MAX, DAYS_OVERVIEW_MIN, DAYS_TO_ADD } from '../../../constants';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import { setTimestamp as setTimestampDay } from '../Day/actions';
import { resetLastUsageOfLocation, resetLastUsageOfPerson } from '../Directory/actions';
import { setShowKeyUpdateHints } from '../Settings/actions';
import {
  initializeDays,
  hideFirstStartHint,
  hideModalUpdateHints,
  confirmFirstStartHint,
  showFirstStartHint,
  setLastUpdated,
} from './actions';
import Screen from './ui';

const loadDays = () => async (dispatch, getState) => {
  const {
    dashboard: { days },
  } = getState();

  const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0).valueOf();

  let differenceToLastDay = 0;

  if (Object.keys(days).length > 0) {
    const lastDay = Math.min(...Object.keys(days).map((timestamp) => parseInt(timestamp, 10)));
    differenceToLastDay = moment(today).diff(moment(lastDay), 'days');
  }

  const daysInPast = Math.max(differenceToLastDay, DAYS_OVERVIEW_MIN);
  const addTimestamps = [];

  for (let i = 0; i < daysInPast; i++) {
    const currentDay = moment(today).subtract(i, 'days');
    const currentDayTimestamp = currentDay.valueOf();
    addTimestamps.push(currentDayTimestamp);
  }

  const maxTimestamp = moment(today).subtract(DAYS_OVERVIEW_MAX, 'days').valueOf();
  dispatch(initializeDays(addTimestamps, maxTimestamp));
};

const loadMoreDays = () => async (dispatch, getState) => {
  const {
    dashboard: { days },
  } = getState();

  const firstDay = Math.min(...Object.keys(days).map((timestamp) => parseInt(timestamp, 10)));
  const addTimestamps = [];

  for (let i = 1; i <= DAYS_TO_ADD; i++) {
    const currentDay = moment(firstDay).subtract(i, 'days');
    const currentDayTimestamp = currentDay.valueOf();
    addTimestamps.push(currentDayTimestamp);
  }

  const minTimestamp = moment(firstDay).subtract(DAYS_OVERVIEW_MAX, 'days').valueOf();
  dispatch(initializeDays(addTimestamps, minTimestamp));
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

const openDay = (timestamp, navigation) => async (dispatch) => {
  dispatch(setTimestampDay(timestamp));
  dispatch(hideFirstStartHint());
  dispatch(confirmFirstStartHint());

  navigation.navigate('Day');
};

const closeFirstStartHint = () => async (dispatch) => {
  dispatch(hideFirstStartHint());
  dispatch(confirmFirstStartHint());
};

const closeModalUpdateHints = () => async (dispatch, getState) => {
  const {
    app: { showKeyUpdateHints: showKeyUpdateHintsApp },
  } = getState();

  dispatch(setShowKeyUpdateHints(showKeyUpdateHintsApp));
  dispatch(hideModalUpdateHints());
};

const resetLastUsageTimestamps = () => async (dispatch, getState) => {
  const {
    directory: { locations, persons },
  } = getState();

  const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
  const lastUsageTimestampMax = today.subtract(DAYS_LAST_USAGE, 'days').valueOf();

  locations
    .filter((location) => location.lastUsed > 0 && location.lastUsed < lastUsageTimestampMax)
    .map((location) => location.id)
    .forEach((id) => {
      dispatch(resetLastUsageOfLocation(id));
    });

  persons
    .filter((person) => person.lastUsed > 0 && person.lastUsed < lastUsageTimestampMax)
    .map((person) => person.id)
    .forEach((id) => {
      dispatch(resetLastUsageOfPerson(id));
    });
};

const mapStateToProps = ({
  app: { showKeyUpdateHints: showKeyUpdateHintsApp },
  dashboard: { days, firstStartHintVisible, modalUpdateHintsVisible },
  settings: { showKeyUpdateHints: showKeyUpdateHintsSettings },
}) => {
  const daysList = Object.keys(days)
    .sort((a, b) => daysSortingFunction(a, b))
    .map((timestamp) => days[timestamp]);

  if (daysList.length > 0 && daysList.length < DAYS_OVERVIEW_MAX) {
    daysList.push({ loadMore: true, timestamp: 'load-more' });
  }

  return {
    days: daysList,
    firstStartHintVisible,
    modalUpdateHintsVisible: modalUpdateHintsVisible || showKeyUpdateHintsApp !== showKeyUpdateHintsSettings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeFirstStartHint: () => dispatch(closeFirstStartHint()),
    hideModalUpdateHints: () => dispatch(closeModalUpdateHints()),
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

      dispatch(resetLastUsageTimestamps());

      const {
        dashboard: { days, firstStartHintConfirmed },
      } = getState();

      if (!firstStartHintConfirmed) {
        const total = Object.values(days)
          .map(({ encounters }) => ({ encounters: encounters.length }))
          .reduce(
            (accumulator, currentValue) => ({
              encounters: accumulator.encounters + currentValue.encounters,
            }),
            { encounters: 0 }
          );

        if (total.encounters === 0) {
          dispatch(showFirstStartHint());
        }
      }
    })();
  },
  componentDidUpdate() {
    const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0).valueOf();
    const {
      store: { dispatch, getState },
    } = this.context;

    const {
      dashboard: { lastUpdated },
    } = getState();

    if (lastUpdated !== today) {
      dispatch(setLastUpdated(today));
      dispatch(loadDays());
    }
  },
});

const Dashboard = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Container))));

export default Dashboard;
