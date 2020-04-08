import { Alert, PermissionsAndroid, Platform } from 'react-native';
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

export const importPersons = (__, closeImportPersonsModal = false) => async (dispatch) => {
  dispatch(enablePersonsImporting());

  let permissionGranted = true;

  if (Platform.OS === 'android') {
    const permissionRequestResult = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);

    permissionGranted = permissionRequestResult === 'granted';
  }

  if (permissionGranted) {
    RNContacts.getAll((err, contacts) => {
      if (err === 'denied') {
        Alert.alert(
          __('directory-screen.alerts.import-persons.missing-permission.title'),
          __('directory-screen.alerts.import-persons.missing-permission.message')
        );

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
  } else {
    dispatch(disablePersonsImporting());

    Alert.alert(
      __('directory-screen.alerts.import-persons.missing-permission.title'),
      __('directory-screen.alerts.import-persons.missing-permission.message')
    );
  }
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
    importPersons: (__) => dispatch(importPersons(__, true)),
  };
};

const Container = container(Screen, {
  componentDidMount() {},
});

const Directory = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Container)));

export default Directory;
