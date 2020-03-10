export const addContact = (contact) => ({ type: 'ADD_CONTACT_CONTACTS', contact });

export const removeContact = (contactId) => ({ type: 'REMOVE_CONTACT_CONTACTS', contactId });

export const addLocation = (location) => ({ type: 'ADD_LOCATION_CONTACTS', location });

export const importContacts = (contacts) => ({ type: 'IMPORT_CONTACTS_CONTACTS', contacts });
