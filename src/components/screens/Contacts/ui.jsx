import UilImport from '@iconscout/react-native-unicons/icons/uil-import';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../../constants';
import EntriesTabsView from '../../partials/EntriesTabsView';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const Contacts = ({
  contacts,
  contactsImporting,
  isImportContactsModalVisible,
  locations,
  deleteContact,
  deleteLocation,
  showImportContactsModal,
  hideImportContactsModal,
  importContacts,
  vw,
  __,
}) => {
  // noinspection JSUnresolvedFunction
  const styles = StyleSheet.create({
    header: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerButton: {
      flexDirection: 'row',
    },
    headerButtonText: {
      color: '#555555',
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(3.2),
      marginLeft: vw(1),
      textTransform: 'lowercase',
    },
    headerHeadline: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(5),
      marginLeft: 'auto',
      textTransform: 'lowercase',
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderTopLeftRadius: vw(2.3),
      borderTopRightRadius: vw(2.3),
      padding: vw(3),
    },
    modalHeader: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: vw(4.5),
      paddingLeft: vw(3),
      paddingRight: vw(3),
      paddingTop: vw(2),
    },
    modalHeaderText: {
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(5),
      textTransform: 'lowercase',
    },
    modalText: {
      fontFamily: 'JetBrainsMono-Regular',
      fontSize: vw(4.4),
      marginBottom: vw(7),
      paddingLeft: vw(3),
      paddingRight: vw(3),
    },
    modalButton: {
      alignItems: 'center',
      backgroundColor: COLOR_PRIMARY,
      borderRadius: vw(2.3),
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: vw(5),
      padding: vw(3.5),
    },
    modalButtonDisabled: {
      opacity: 0.2,
    },
    modalButtonText: {
      color: '#ffffff',
      fontFamily: 'JetBrainsMono-Bold',
      fontSize: vw(6),
      textTransform: 'lowercase',
    },
    view: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
    viewWrapper: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    },
  });

  return (
    <Layout backgroundColor={COLOR_SECONDARY}>
      <View style={styles.view}>
        <Header>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => showImportContactsModal()} style={styles.headerButton}>
              <UilImport size={vw(4)} color={'#000000'} />

              <Text style={styles.headerButtonText}>{__('contacts-screen.header.button.import')}</Text>
            </TouchableOpacity>

            <Text style={styles.headerHeadline}>{__('contacts-screen.header.headline')}</Text>
          </View>
        </Header>

        <EntriesTabsView
          allowUpdate
          contacts={contacts}
          deleteContactItem={(id) => deleteContact(id)}
          deleteLocationItem={(id) => deleteLocation(id)}
          disableDeleteImportedContacts
          locations={locations}
        />
      </View>

      <Modal isVisible={isImportContactsModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>{__('contacts-screen.modals.import-contacts.headline')}</Text>
            <TouchableOpacity onPress={() => hideImportContactsModal()}>
              <UilTimes size={vw(9)} color={COLOR_PRIMARY} />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalText}>{__('contacts-screen.modals.import-contacts.text')}</Text>

          <TouchableOpacity disabled={contactsImporting} onPress={() => importContacts()}>
            <View style={{ ...styles.modalButton, ...(contactsImporting && styles.modalButtonDisabled) }}>
              <Text style={styles.modalButtonText}>
                {contactsImporting
                  ? __('contacts-screen.modals.import-contacts.button.importing')
                  : __('contacts-screen.modals.import-contacts.button.default')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </Layout>
  );
};

export default Contacts;
