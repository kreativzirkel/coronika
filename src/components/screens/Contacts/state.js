import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  activeTab: 0,
  contacts: [],
  locations: [],
  searchValue: '',
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'ADD_CONTACT_CONTACTS': {
      const contact = action.contact;
      const contacts = [];

      if ('recordID' in contact) {
        for (const c of state.contacts) {
          if (c.recordID !== contact.recordID) {
            contacts.push(c);
          } else {
            contact.id = c.id;
          }
        }

        contact.fullName = [contact.givenName, contact.middleName, contact.familyName].join(' ').replace(/\s+/g, ' ');
      }

      if (!contact.id) {
        contact.id = uuidv4();
      }

      contacts.push(contact);

      return { ...state, contacts };
    }

    case 'ADD_LOCATION_CONTACTS':
      return { ...state, contacts: [...state.locations, action.location] };

    case 'SET_ACTIVE_TAB_CONTACTS':
      return { ...state, activeTab: action.activeTab };

    case 'SET_SEARCH_VALUE_CONTACTS': {
      let searchValue = action.searchValue;

      if (searchValue.trim().length === 0) {
        searchValue = '';
      }

      return { ...state, searchValue: action.searchValue };
    }

    default:
      return state;
  }
};
