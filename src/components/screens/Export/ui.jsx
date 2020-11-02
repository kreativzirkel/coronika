import UilFile from '@iconscout/react-native-unicons/icons/uil-file';
import UilSave from '@iconscout/react-native-unicons/icons/uil-save';
import UilShare from '@iconscout/react-native-unicons/icons/uil-share';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { COLOR_PRIMARY } from '../../../constants';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';

const Export = ({
  colors,
  buttonCreateExportDisabled,
  isExporting,
  isExportRequestUserDataModalVisible,
  isExportResultModalVisible,
  userFirstName,
  userLastName,
  userCaseId,
  createExport,
  hideExportRequestUserDataModal,
  hideExportResultModal,
  saveExportFileCsv,
  saveExportFilePdf,
  shareExportFileCsv,
  shareExportFilePdf,
  showExportRequestUserDataModal,
  setUserFirstName,
  setUserLastName,
  setUserCaseId,
  navigation,
  vw,
  fontFamilyBold,
  fontFamilyRegular,
  __,
}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: vw(4),
    },
    buttonIcon: {
      marginRight: vw(1.5),
    },
    buttonText: {
      color: COLOR_PRIMARY,
      fontFamily: fontFamilyRegular,
      fontSize: vw(4.8),
      textAlign: 'center',
      textTransform: 'lowercase',
    },
    buttonTextDisabled: {
      color: colors.GRAY_3,
    },
    contentHeadline: {
      color: colors.TEXT,
      fontFamily: fontFamilyBold,
      fontSize: vw(6),
      textAlign: 'center',
    },
    contentText: {
      color: colors.TEXT,
      fontFamily: fontFamilyRegular,
      fontSize: vw(4.2),
      lineHeight: vw(6.5),
      textAlign: 'center',
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
      marginBottom: vw(5),
      paddingLeft: vw(3),
      paddingRight: vw(3),
    },
    modalExportFileWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: vw(5),
      width: '100%',
    },
    modalExportFileHeadline: {
      color: colors.TEXT,
      flex: 1,
      fontFamily: fontFamilyBold,
      fontSize: vw(4.2),
      lineHeight: vw(6.5),
      paddingLeft: vw(3),
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
    modalButtonSecondary: {
      backgroundColor: colors.GRAY_3,
      width: 'auto',
    },
    modalButtonText: {
      color: colors.TEXT_ALT,
      fontFamily: fontFamilyBold,
      fontSize: vw(5),
      textTransform: 'lowercase',
    },
    modalButtonSecondaryText: {},
    modalButtonExportFile: {
      marginBottom: 0,
    },
    modalButtonSave: {
      marginLeft: vw(2.3),
    },
    modalButtonShare: {
      marginLeft: vw(2.3),
    },
    modalTextInput: {
      backgroundColor: colors.SECONDARY,
      borderRadius: vw(2.3),
      color: colors.TEXT,
      fontFamily: fontFamilyRegular,
      fontSize: vw(4),
      height: vw(15),
      marginBottom: vw(4),
      padding: vw(4),
    },
    view: {
      alignItems: 'center',
      backgroundColor: colors.BACKGROUND,
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      padding: vw(8),
      paddingTop: vw(2),
      width: '100%',
    },
    viewContent: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-evenly',
      width: '100%',
    },
  });

  return (
    <Layout>
      <HeaderBack headline={__('export-screen.header.headline')} navigation={navigation} />

      <View style={styles.view}>
        <View style={styles.viewContent}>
          <Text style={styles.contentHeadline}>{__('export-screen.content.section-1.headline')}</Text>
          <Text style={styles.contentText}>{__('export-screen.content.section-1.text')}</Text>
          <Text style={styles.contentHeadline}>{__('export-screen.content.section-2.headline')}</Text>
          <Text style={styles.contentText}>{__('export-screen.content.section-2.text')}</Text>
          <TouchableOpacity disabled={isExporting} onPress={showExportRequestUserDataModal} style={styles.button}>
            <UilFile color={isExporting ? '#b0b0b1' : COLOR_PRIMARY} size={vw(5)} style={styles.buttonIcon} />
            <Text style={{ ...styles.buttonText, ...(isExporting && styles.buttonTextDisabled) }}>
              {isExporting ? __('export-screen.export.button.exporting') : __('export-screen.export.button.default')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        backdropColor={colors.MODAL_BACKDROP_COLOR}
        hideModalContentWhileAnimating
        isVisible={isExportRequestUserDataModalVisible}
        onBackButtonPress={hideExportRequestUserDataModal}
        onBackdropPress={hideExportRequestUserDataModal}
        statusBarTranslucent
        style={styles.modal}
        useNativeDriver>
        <KeyboardAvoidingView behavior={'padding'} enabled>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{__('export-screen.modals.request-user-data.headline')}</Text>
              <TouchableOpacity onPress={hideExportRequestUserDataModal} style={styles.modalHeaderIcon}>
                <UilTimes size={vw(9)} color={COLOR_PRIMARY} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalText}>{__('export-screen.modals.request-user-data.text')}</Text>

            <TextInput
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={setUserFirstName}
              placeholder={__('export-screen.modals.request-user-data.placeholder.first-name').toLowerCase()}
              placeholderTextColor={'#B0B0B1'}
              style={styles.modalTextInput}
              textContentType={'none'}
              value={userFirstName}
            />

            <TextInput
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={setUserLastName}
              placeholder={__('export-screen.modals.request-user-data.placeholder.last-name').toLowerCase()}
              placeholderTextColor={'#B0B0B1'}
              style={styles.modalTextInput}
              textContentType={'none'}
              value={userLastName}
            />

            <TextInput
              autoCompleteType={'off'}
              autoCorrect={false}
              onChangeText={setUserCaseId}
              placeholder={__('export-screen.modals.request-user-data.placeholder.case-id').toLowerCase()}
              placeholderTextColor={'#B0B0B1'}
              style={styles.modalTextInput}
              textContentType={'none'}
              value={userCaseId}
            />

            <TouchableOpacity disabled={buttonCreateExportDisabled} onPress={createExport}>
              <View
                style={{
                  ...styles.modalButton,
                  ...(buttonCreateExportDisabled && styles.modalButtonDisabled),
                }}>
                <Text style={styles.modalButtonText}>{__('export-screen.export.button.default')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        backdropColor={colors.MODAL_BACKDROP_COLOR}
        hideModalContentWhileAnimating
        isVisible={isExportResultModalVisible}
        onBackButtonPress={hideExportResultModal}
        onBackdropPress={hideExportResultModal}
        statusBarTranslucent
        style={styles.modal}
        useNativeDriver>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>{__('export-screen.modals.export-completed.headline')}</Text>
            <TouchableOpacity onPress={hideExportResultModal} style={styles.modalHeaderIcon}>
              <UilTimes size={vw(8)} color={COLOR_PRIMARY} />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalText}>{__('export-screen.modals.export-completed.text')}</Text>

          <Text style={styles.modalText}>{__('export-screen.modals.export-completed.text.csv')}</Text>

          <View style={styles.modalExportFileWrapper}>
            <Text style={styles.modalExportFileHeadline}>
              {__('export-screen.modals.export-completed.csv.headline')}
            </Text>

            <TouchableOpacity onPress={shareExportFileCsv} style={styles.modalButtonShare}>
              <View style={{ ...styles.modalButton, ...styles.modalButtonExportFile }}>
                <UilShare color={colors.TEXT_ALT} size={vw(6.6)} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={saveExportFileCsv} style={styles.modalButtonSave}>
              <View style={{ ...styles.modalButton, ...styles.modalButtonExportFile, ...styles.modalButtonSecondary }}>
                <UilSave color={colors.TEXT_ALT} size={vw(6.6)} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.modalExportFileWrapper}>
            <Text style={styles.modalExportFileHeadline}>
              {__('export-screen.modals.export-completed.pdf.headline')}
            </Text>

            <TouchableOpacity onPress={shareExportFilePdf} style={styles.modalButtonShare}>
              <View style={{ ...styles.modalButton, ...styles.modalButtonExportFile }}>
                <UilShare color={colors.TEXT_ALT} size={vw(6.6)} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={saveExportFilePdf} style={styles.modalButtonSave}>
              <View style={{ ...styles.modalButton, ...styles.modalButtonExportFile, ...styles.modalButtonSecondary }}>
                <UilSave color={colors.TEXT_ALT} size={vw(6.6)} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default Export;
