import UilImport from '@iconscout/react-native-unicons/icons/uil-import';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { COLOR_PRIMARY } from '../../../constants';
import EntriesTabsView from '../../partials/EntriesTabsView';
import Header from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const Directory = ({
  colors,
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
  fontFamilyBold,
  fontFamilyRegular,
  __,
}) => {
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
    headerButtonItemIcon: {
      marginTop: vw(0.3),
    },
    headerButtonText: {
      color: colors.TEXT,
      fontFamily: fontFamilyRegular,
      fontSize: vw(4.2),
      marginLeft: vw(1),
      textTransform: 'lowercase',
    },
    headerHeadline: {
      color: colors.TEXT,
      fontFamily: fontFamilyBold,
      fontSize: vw(5),
      marginRight: 'auto',
      textTransform: 'lowercase',
    },
    headerHeadlineWrapper: {
      flex: 1,
      flexDirection: 'row',
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      backgroundColor: colors.BACKGROUND,
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
      width: '100%',
    },
    modalHeaderIcon: {
      alignSelf: 'flex-start',
    },
    modalHeaderText: {
      color: colors.TEXT,
      flex: 1,
      fontFamily: fontFamilyBold,
      fontSize: vw(5),
      textTransform: 'lowercase',
    },
    modalText: {
      color: colors.TEXT,
      fontFamily: fontFamilyRegular,
      fontSize: vw(4.2),
      lineHeight: vw(6.5),
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
      color: colors.TEXT_ALT,
      fontFamily: fontFamilyBold,
      fontSize: vw(5),
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
  });

  return (
    <Layout>
      <View style={styles.view}>
        <Header>
          <View style={styles.header}>
            <View style={styles.headerHeadlineWrapper}>
              <Text style={styles.headerHeadline}>{__('directory-screen.header.headline')}</Text>
            </View>

            <TouchableOpacity onPress={showImportPersonsModal} style={styles.headerButton}>
              <UilImport size={vw(4.8)} color={colors.TEXT} style={styles.headerButtonItemIcon} />

              <Text style={styles.headerButtonText}>{__('directory-screen.header.button.import')}</Text>
            </TouchableOpacity>
          </View>
        </Header>

        <EntriesTabsView
          allowUpdate
          persons={persons}
          deleteLocationItem={deleteLocation}
          deletePersonItem={deletePerson}
          isDirectory
          locations={locations}
        />
      </View>

      <Modal
        backdropColor={colors.MODAL_BACKDROP_COLOR}
        hideModalContentWhileAnimating
        isVisible={isImportPersonsModalVisible}
        onBackButtonPress={hideImportPersonsModal}
        onBackdropPress={hideImportPersonsModal}
        statusBarTranslucent
        style={styles.modal}
        useNativeDriver>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>{__('directory-screen.modals.import-persons.headline')}</Text>
            <TouchableOpacity onPress={hideImportPersonsModal} style={styles.modalHeaderIcon}>
              <UilTimes size={vw(8)} color={COLOR_PRIMARY} />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalText}>{__('directory-screen.modals.import-persons.text')}</Text>

          <TouchableOpacity disabled={personsImporting} onPress={() => importPersons(__)}>
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
