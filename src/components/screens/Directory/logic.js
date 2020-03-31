import { PermissionsAndroid } from 'react-native';
import RNContacts from 'react-native-contacts';
import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import { container } from '../../../utils/react';
import withViewportUnits from '../../../utils/withViewportUnits';
import {
  importPersons as importPersonsAction,
  removePerson,
  removeLocation,
  showImportPersonsModal,
  hideImportPersonsModal,
  enablePersonsImporting,
  disablePersonsImporting,
} from './actions';
import Screen from './ui';

export const importPersons = (closeImportPersonsModal = false) => async (dispatch) => {
  dispatch(enablePersonsImporting());

  // noinspection JSCheckFunctionSignatures,JSUnresolvedFunction,JSUnresolvedVariable
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    title: 'Contacts',
    message: 'This app would like to view your contacts.', // TODO: add translations
    buttonPositive: 'Please accept',
  })
    .then(() => {
      RNContacts.getAll((err, contacts) => {
        if (err === 'denied') {
          // error
          dispatch(disablePersonsImporting());
        } else {
          const personsToImport = [];

          contacts.forEach(({ familyName, givenName, middleName, phoneNumbers, recordID }) => {
            // ignore company contacts
            if (givenName && givenName.trim() !== '') {
              personsToImport.push({
                givenName,
                middleName,
                familyName,
                phoneNumbers,
                recordID,
              });
            }
          });

          dispatch(importPersonsAction(personsToImport));

          if (closeImportPersonsModal) {
            dispatch(hideImportPersonsModal());
          }

          dispatch(disablePersonsImporting());
        }
      });
    })
    .catch(() => {
      dispatch(disablePersonsImporting());
    });
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

  return 0;
};

const mapStateToProps = ({ directory: { persons, personsImporting, isImportPersonsModalVisible, locations } }) => {
  persons.sort((a, b) => personsSortingFunction(a, b));
  locations.sort((a, b) => locationsSortingFunction(a, b));

  return {
    persons,
    personsImporting,
    isImportPersonsModalVisible,
    locations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePerson: (personId) => dispatch(removePerson(personId)),
    deleteLocation: (locationId) => dispatch(removeLocation(locationId)),
    showImportPersonsModal: () => dispatch(showImportPersonsModal()),
    hideImportPersonsModal: () => dispatch(hideImportPersonsModal()),
    importPersons: () => dispatch(importPersons(true)),
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const Directory = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Container)));

export default Directory;
