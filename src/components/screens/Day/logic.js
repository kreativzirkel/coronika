import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import { removeContactFromDay, removeLocationFromDay } from '../../App/actions';
import Screen from './ui';

const deleteContactFromDay = (contactId) => async (dispatch, getState) => {
  const {
    day: { timestamp },
  } = getState();

  dispatch(removeContactFromDay(timestamp, contactId));
};

const deleteLocationFromDay = (locationId, description, locationTimestamp) => async (dispatch, getState) => {
  const {
    day: { timestamp },
  } = getState();

  dispatch(removeLocationFromDay(timestamp, locationId, description, locationTimestamp));
};

const contactsSortingFunction = (a, b) => {
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

const mapStateToProps = ({ app: { days }, day: { searchValue, timestamp } }) => {
  const dayContacts = days[timestamp]?.contacts || [];
  const dayLocations = days[timestamp]?.locations || [];

  dayContacts.sort((a, b) => contactsSortingFunction(a, b));
  dayLocations.sort((a, b) => locationsSortingFunction(a, b));

  return {
    contacts: dayContacts,
    locations: dayLocations,
    searchValue,
    timestamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContactFromDay: (contactId) => dispatch(deleteContactFromDay(contactId)),
    deleteLocationFromDay: (locationId, description, time) =>
      dispatch(deleteLocationFromDay(locationId, description, time)),
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const Day = withI18n(connect(mapStateToProps, mapDispatchToProps)(Container));

export default Day;
