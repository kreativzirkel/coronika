import UilImport from '@iconscout/react-native-unicons/icons/uil-import';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../../constants';
import EntriesTabsView from '../../partials/EntriesTabsView';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const Directory = ({
  isImportPersonsModalVisible,
  locations,
  persons,
  personsImporting,
  deleteLocation,
  deletePerson,
  showImportPersonsModal,
  hideImportPersonsModal,
  importPersons,
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
      fontSize: vw(4),
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
            <TouchableOpacity onPress={() => showImportPersonsModal()} style={styles.headerButton}>
              <UilImport size={vw(5)} color={'#000000'} />

              <Text style={styles.headerButtonText}>{__('directory-screen.header.button.import')}</Text>
            </TouchableOpacity>

            <Text style={styles.headerHeadline}>{__('directory-screen.header.headline')}</Text>
          </View>
        </Header>

        <EntriesTabsView
          allowUpdate
          persons={persons}
          deleteLocationItem={(id) => deleteLocation(id)}
          deletePersonItem={(id) => deletePerson(id)}
          disableDeleteImportedPersons
          locations={locations}
        />
      </View>

      <Modal isVisible={isImportPersonsModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>{__('directory-screen.modals.import-persons.headline')}</Text>
            <TouchableOpacity onPress={() => hideImportPersonsModal()}>
              <UilTimes size={vw(9)} color={COLOR_PRIMARY} />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalText}>{__('directory-screen.modals.import-persons.text')}</Text>

          <TouchableOpacity disabled={personsImporting} onPress={() => importPersons()}>
            <View style={{ ...styles.modalButton, ...(personsImporting && styles.modalButtonDisabled) }}>
              <Text style={styles.modalButtonText}>
                {personsImporting
                  ? __('directory-screen.modals.import-persons.button.importing')
                  : __('directory-screen.modals.import-persons.button.default')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </Layout>
  );
};

export default Directory;
