import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLOR_PRIMARY } from '../../../constants';
import { HeaderBack } from '../../widgets/Header';
import Layout from '../../widgets/Layout';
import UilFile from '@iconscout/react-native-unicons/icons/uil-file';
import UilShare from '@iconscout/react-native-unicons/icons/uil-share';
import UilTimes from '@iconscout/react-native-unicons/icons/uil-times';
import Modal from 'react-native-modal';

const Export = ({
  colors,
  isExporting,
  isExportResultModalVisible,
  createExport,
  hideExportResultModal,
  saveExportFile,
  shareExportFile,
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
      fontSize: vw(5.5),
      textAlign: 'center',
      textTransform: 'lowercase',
    },
    buttonTextDisabled: {
      color: colors.GRAY_3,
    },
    contentHeadline: {
      color: colors.TEXT,
      fontFamily: fontFamilyBold,
      fontSize: vw(7),
      textAlign: 'center',
    },
    contentText: {
      color: colors.TEXT,
      fontFamily: fontFamilyRegular,
      fontSize: vw(4.5),
      lineHeight: vw(7),
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
      fontSize: vw(4.4),
      marginBottom: vw(7),
      paddingLeft: vw(3),
      paddingRight: vw(3),
    },
    modalButtonsWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
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
    modalButtonSecondary: {
      backgroundColor: colors.GRAY_3,
      width: 'auto',
    },
    modalButtonText: {
      color: colors.TEXT_ALT,
      fontFamily: fontFamilyBold,
      fontSize: vw(6),
      textTransform: 'lowercase',
    },
    modalButtonSecondaryText: {},
    modalButtonSave: {
      flex: 1,
    },
    modalButtonShare: {
      marginLeft: vw(2.3),
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
          <TouchableOpacity disabled={isExporting} onPress={() => createExport()} style={styles.button}>
            <UilFile color={isExporting ? '#b0b0b1' : COLOR_PRIMARY} size={vw(6.5)} style={styles.buttonIcon} />
            <Text style={{ ...styles.buttonText, ...(isExporting && styles.buttonTextDisabled) }}>
              {isExporting ? __('export-screen.export.button.exporting') : __('export-screen.export.button.default')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        backdropColor={colors.MODAL_BACKDROP_COLOR}
        hideModalContentWhileAnimating
        isVisible={isExportResultModalVisible}
        onBackButtonPress={() => hideExportResultModal()}
        onBackdropPress={() => hideExportResultModal()}
        statusBarTranslucent
        style={styles.modal}
        useNativeDriver>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>{__('export-screen.modals.export-completed.headline')}</Text>
            <TouchableOpacity onPress={() => hideExportResultModal()} style={styles.modalHeaderIcon}>
              <UilTimes size={vw(9)} color={COLOR_PRIMARY} />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalText}>{__('export-screen.modals.export-completed.text')}</Text>

          <View style={styles.modalButtonsWrapper}>
            <TouchableOpacity onPress={() => saveExportFile()} style={styles.modalButtonSave}>
              <View style={styles.modalButton}>
                <Text style={styles.modalButtonText}>{__('export-screen.modals.export-completed.button.save')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => shareExportFile()} style={styles.modalButtonShare}>
              <View style={{ ...styles.modalButton, ...styles.modalButtonSecondary }}>
                <UilShare color={colors.TEXT_ALT} size={vw(7)} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default Export;
