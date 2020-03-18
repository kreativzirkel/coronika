export const addContact = (contact) => ({ type: 'ADD_CONTACT_CONTACTS', contact });

export const removeContact = (contactId) => ({ type: 'REMOVE_CONTACT_CONTACTS', contactId });

export const updateContact = (contact) => ({ type: 'UPDATE_CONTACT_CONTACTS', contact });

export const addLocation = (location) => ({ type: 'ADD_LOCATION_CONTACTS', location });

export const removeLocation = (locationId) => ({ type: 'REMOVE_LOCATION_CONTACTS', locationId });

export const updateLocation = (location) => ({ type: 'UPDATE_LOCATION_CONTACTS', location });

export const importContacts = (contacts) => ({ type: 'IMPORT_CONTACTS_CONTACTS', contacts });

export const showImportContactsModal = () => ({ type: 'SHOW_IMPORT_CONTACTS_MODAL_CONTACTS' });

export const hideImportContactsModal = () => ({ type: 'HIDE_IMPORT_CONTACTS_MODAL_CONTACTS' });

export const enableContactsImporting = () => ({ type: 'ENABLE_CONTACTS_IMPORTING_CONTACTS' });

export const disableContactsImporting = () => ({ type: 'DISABLE_CONTACTS_IMPORTING_CONTACTS' });
