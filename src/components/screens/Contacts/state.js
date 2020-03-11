import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  contacts: [],
  locations: [],
};

const addContactToList = (contacts, contact) => {
  const importContact = cloneDeep(contact);
  let resultList = [];

  if ('recordID' in importContact) {
    for (const c of contacts) {
      if (c.recordID !== importContact.recordID) {
        resultList.push(c);
      } else {
        importContact.id = c.id;
      }
    }

    importContact.fullName = [importContact.givenName, importContact.middleName, importContact.familyName]
      .join(' ')
      .replace(/\s+/g, ' ');
  } else {
    resultList = cloneDeep(contacts);
  }

  if (!importContact.id) {
    importContact.id = uuidv4();
  }

  resultList.push(importContact);

  return resultList;
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'ADD_CONTACT_CONTACTS': {
      const contacts = addContactToList(state.contacts, action.contact);

      return { ...state, contacts };
    }

    case 'REMOVE_CONTACT_CONTACTS': {
      const contactId = action.contactId;
      const contacts = [];

      for (const c of state.contacts) {
        if (c.id !== contactId) {
          contacts.push(c);
        }
      }

      return { ...state, contacts };
    }

    case 'ADD_LOCATION_CONTACTS': {
      const location = action.location;
      const locations = cloneDeep(state.locations);

      if (!location.id) {
        location.id = uuidv4();
      }

      locations.push(location);

      return { ...state, locations };
    }

    case 'REMOVE_LOCATION_CONTACTS': {
      const locationId = action.locationId;
      const locations = [];

      for (const c of state.locations) {
        if (c.id !== locationId) {
          locations.push(c);
        }
      }

      return { ...state, locations };
    }

    case 'IMPORT_CONTACTS_CONTACTS': {
      const importContacts = action.contacts;
      let contacts = cloneDeep(state.contacts);

      for (const contact of importContacts) {
        contacts = addContactToList(contacts, contact);
      }

      const importedRecordIDs = importContacts.map(({ recordID }) => recordID);

      contacts = contacts.filter(({ recordID }) => recordID === undefined || importedRecordIDs.includes(recordID));

      return { ...state, contacts };
    }

    default:
      return state;
  }
};
