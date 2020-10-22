import { Alert, PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import {
  disablePersonsImporting,
  enablePersonsImporting,
  hideImportPersonsModal,
  importPersons as importPersonsAction,
} from './actions';

const importPersons = (__, closeImportPersonsModal = false) => async (dispatch) => {
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
      })
      .catch(() => {
        Alert.alert(
          __('directory-screen.alerts.import-persons.missing-permission.title'),
          __('directory-screen.alerts.import-persons.missing-permission.message')
        );

        dispatch(disablePersonsImporting());
      });
  } else {
    dispatch(disablePersonsImporting());

    Alert.alert(
      __('directory-screen.alerts.import-persons.missing-permission.title'),
      __('directory-screen.alerts.import-persons.missing-permission.message')
    );
  }
};

export default importPersons;