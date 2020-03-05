import { PermissionsAndroid } from 'react-native';
import RNContacts from 'react-native-contacts';
import connect from 'react-redux/lib/connect/connect';
import { container } from '../../../utils/react';
import { addContact, setActiveTab, setSearchValue } from './actions';
import Screen from './ui';

const importContacts = () => async (dispatch) => {
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
        contacts.forEach(({ familyName, givenName, middleName, recordID }) => {
          // ignore company contacts
          if (givenName.trim() !== '') {
            dispatch(
              addContact({
                givenName,
                middleName,
                familyName,
                recordID,
              })
            );
          }
        });
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

const mapStateToProps = ({ contacts: { activeTab, contacts, searchValue } }) => {
  contacts.sort((a, b) => contactsSortingFunction(a, b));

  return {
    activeTab,
    contacts,
    searchValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    importContacts: () => dispatch(importContacts()),
    setActiveTab: (activeTab) => dispatch(setActiveTab(activeTab)),
    setSearchValue: (searchValue) => dispatch(setSearchValue(searchValue)),
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const Contacts = connect(mapStateToProps, mapDispatchToProps)(Container);

export default Contacts;
