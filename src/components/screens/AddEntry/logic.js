import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import { addContactToDay, addLocationToDay } from '../../screens/Dashboard/actions';
import Screen from './ui';

const addSelection = (selection, navigation) => async (dispatch, getState) => {
  const {
    contacts: { contacts, locations },
    day: { timestamp },
  } = getState();

  selection.contacts.forEach((contactId) => {
    const contact = contacts.find(({ id }) => id === contactId);

    if (contact) {
      dispatch(addContactToDay(timestamp, contact));
    }
  });

  selection.locations.forEach(({ description, id: locationId, timestamp: locationTimestamp }) => {
    const location = locations.find(({ id }) => id === locationId);
    const newLocation = { ...location, description, timestamp: locationTimestamp };

    dispatch(addLocationToDay(timestamp, newLocation));
  });

  navigation.navigate('Day');
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

  return 0;
};

const mapStateToProps = ({ contacts: { contacts, locations }, dashboard: { days }, day: { timestamp } }) => {
  contacts.sort((a, b) => contactsSortingFunction(a, b));
  locations.sort((a, b) => locationsSortingFunction(a, b));

  const dayContacts = days[timestamp]?.contacts || [];
  const availableContacts = contacts.filter(
    ({ id }) => dayContacts.find(({ id: dayContactId }) => id === dayContactId) === undefined
  );

  return {
    contacts: availableContacts,
    locations,
    timestamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSelection: (selection, navigation) => dispatch(addSelection(selection, navigation)),
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const AddEntry = withI18n(connect(mapStateToProps, mapDispatchToProps)(Container));

export default AddEntry;
