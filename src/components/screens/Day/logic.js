import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import withViewportUnits from '../../../utils/withViewportUnits';
import { removePersonFromDay, removeLocationFromDay } from '../Dashboard/actions';
import Screen from './ui';

const deletePersonFromDay = (personId) => async (dispatch, getState) => {
  const {
    day: { timestamp },
  } = getState();

  dispatch(removePersonFromDay(timestamp, personId));
};

const deleteLocationFromDay = (locationId, description, locationTimestamp) => async (dispatch, getState) => {
  const {
    day: { timestamp },
  } = getState();

  dispatch(removeLocationFromDay(timestamp, locationId, description, locationTimestamp));
};

const personsSortingFunction = (a, b) => {
  const fullNameA = a.fullName.toLowerCase();
  const fullNameB = b.fullName.toLowerCase();
  if (fullNameA < fullNameB) {
    return -1;
  }
  if (fullNameA > fullNameB) {
    return 1;
  }

  return 0;
};

const locationsSortingFunction = (a, b) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }

  const timestampA = a.timestamp || 0;
  const timestampB = b.timestamp || 0;

  if (timestampA < timestampB) {
    return -1;
  }
  if (timestampA > timestampB) {
    return 1;
  }

  return 0;
};

const mapStateToProps = ({ dashboard: { days }, day: { searchValue, timestamp } }) => {
  const dayPersons = days[timestamp]?.persons || [];
  const dayLocations = days[timestamp]?.locations || [];

  dayPersons.sort((a, b) => personsSortingFunction(a, b));
  dayLocations.sort((a, b) => locationsSortingFunction(a, b));

  return {
    persons: dayPersons,
    locations: dayLocations,
    searchValue,
    timestamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePersonFromDay: (personId) => dispatch(deletePersonFromDay(personId)),
    deleteLocationFromDay: (locationId, description, time) =>
      dispatch(deleteLocationFromDay(locationId, description, time)),
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const Day = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Container)));

export default Day;
