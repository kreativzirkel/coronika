import { Alert, PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import {
  disablePersonsImporting,
  enablePersonsImporting,
  hideImportPersonsModal,
  importPersons as importPersonsAction,
} from './actions';

const importPersons = (__, closeImportPersonsModal = false, cb = undefined) => async (dispatch) => {
  dispatch(enablePersonsImporting());

  let permissionGranted = true;

  if (Platform.OS === 'android') {
    const permissionRequestResult = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);

    permissionGranted = permissionRequestResult === 'granted';
  }

  if (permissionGranted) {
    Contacts.getAll()
      .then((contacts) => {
        const personsToImport = [];

        contacts.forEach(({ familyName, givenName, middleName, emailAddresses, phoneNumbers, recordID }) => {
          // ignore company contacts
          if (givenName && givenName.trim() !== '') {
            personsToImport.push({
              givenName,
              middleName,
              familyName,
              emailAddresses,
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

        if (cb) cb();
      })
      .catch(() => {
        Alert.alert(
          __('directory-screen.alerts.import-persons.missing-permission.title'),
          __('directory-screen.alerts.import-persons.missing-permission.message')
        );

        dispatch(disablePersonsImporting());

        if (cb) cb();
      });
  } else {
    dispatch(disablePersonsImporting());

    Alert.alert(
      __('directory-screen.alerts.import-persons.missing-permission.title'),
      __('directory-screen.alerts.import-persons.missing-permission.message')
    );

    if (cb) cb();
  }
};

export default importPersons;
