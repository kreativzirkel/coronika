import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import { removeContactFromDay } from '../../App/actions';
import Screen from './ui';

const deleteContactFromDay = (contactId) => async (dispatch, getState) => {
  const {
    day: { timestamp },
  } = getState();

  dispatch(removeContactFromDay(timestamp, contactId));
};

const mapStateToProps = ({ app: { days }, contacts: { contacts, locations }, day: { searchValue, timestamp } }) => {
  const dayContacts = days[timestamp]?.contacts || [];
  const dayLocations = days[timestamp]?.locations || [];

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
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const Day = withI18n(connect(mapStateToProps, mapDispatchToProps)(Container));

export default Day;
