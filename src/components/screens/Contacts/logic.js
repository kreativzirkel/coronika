import { PermissionsAndroid } from 'react-native';
import RNContacts from 'react-native-contacts';
import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import { importContacts as importContactsAction, removeContact, removeLocation } from './actions';
import Screen from './ui';

export const importContacts = () => async (dispatch) => {
  // noinspection JSCheckFunctionSignatures,JSUnresolvedFunction,JSUnresolvedVariable
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    title: 'Contacts',
    message: 'This app would like to view your contacts.',
    buttonPositive: 'Please accept',
  }).then(() => {
    RNContacts.getAll((err, contacts) => {
      if (err === 'denied') {
        // error
      } else {
        const contactsToImport = [];

        contacts.forEach(({ familyName, givenName, middleName, phoneNumbers, recordID }) => {
          // ignore company contacts
          if (givenName.trim() !== '') {
            contactsToImport.push({
              givenName,
              middleName,
              familyName,
              phoneNumbers,
              recordID,
            });
          }
        });

        dispatch(importContactsAction(contactsToImport));
      }
    });
  });
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

const mapStateToProps = ({ contacts: { contacts, locations } }) => {
  contacts.sort((a, b) => contactsSortingFunction(a, b));
  locations.sort((a, b) => locationsSortingFunction(a, b));

  return {
    contacts,
    locations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContact: (contactId) => dispatch(removeContact(contactId)),
    deleteLocation: (locationId) => dispatch(removeLocation(locationId)),
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const Contacts = withI18n(connect(mapStateToProps, mapDispatchToProps)(Container));

export default Contacts;
