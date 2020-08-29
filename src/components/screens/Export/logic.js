import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import connect from 'react-redux/lib/connect/connect';
import withI18n, { __ } from '../../../i18n';
import withViewportUnits from '../../../utils/withViewportUnits';
import {
  disableExporting,
  enableExporting,
  hideExportResultModal,
  resetExportFilename,
  setExportFilename,
  showExportResultModal,
} from './actions';
import createPdfFile from './createPdfFile';
import Screen from './ui';

const exportFileTempDirectory = RNFS.DocumentDirectoryPath;

const deleteOldExportFiles = async () => {
  const files = await RNFS.readDir(exportFileTempDirectory);
  const exportFileRegex = /^\d{12}[\s_]{1}coronika[\s_]{1}(.*).pdf/;
  const exportFileArabicRegex = /^[\u0660-\u0669]{12}[\s_]{1}coronika[\s_]{1}(.*).pdf/;

  files.forEach((f) => {
    if (f.isFile() && (exportFileRegex.test(f.name) || exportFileArabicRegex.test(f.name))) {
      RNFS.unlink(`${exportFileTempDirectory}/${f.name}`);
    }
  });
};

const closeExportResultModal = () => async (dispatch) => {
  dispatch(disableExporting());
  dispatch(hideExportResultModal());
};

const saveExportFile = () => async (dispatch, getState) => {
  const {
    export: { exportFilename },
    i18n: { currentLanguage },
  } = getState();

  const exportFilePath = `${exportFileTempDirectory}/${exportFilename}`;
  const title = `coronika ${__('export-screen.header.headline', currentLanguage).toLowerCase()}`;

  if (Platform.OS === 'android') {
    const dest = `${RNFS.DownloadDirectoryPath}/${exportFilename}`;

    const permissionRequestResult = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    if (permissionRequestResult === 'granted') {
      RNFS.copyFile(exportFilePath, dest)
        .then(() => {
          Alert.alert(
            __('export-screen.alerts.save-file.success.title'),
            __('export-screen.alerts.save-file.success.message')
          );
        })
        .catch(() => {
          Alert.alert(
            __('export-screen.alerts.save-file.error.title'),
            __('export-screen.alerts.save-file.error.message')
          );
        });
    } else {
      Alert.alert(
        __('export-screen.alerts.save-file.missing-permission.title'),
        __('export-screen.alerts.save-file.missing-permission.message')
      );
    }
  } else if (Platform.OS === 'ios') {
    try {
      await Share.open({
        saveToFiles: true,
        title,
        type: 'application/pdf',
        url: exportFilePath,
      });
    } catch (e) {
      // error
    }
  }
};

const shareExportFile = () => async (dispatch, getState) => {
  const {
    export: { exportFilename },
    i18n: { currentLanguage },
  } = getState();

  const exportFilePath = `${exportFileTempDirectory}/${exportFilename}`;
  const title = `coronika ${__('export-screen.header.headline', currentLanguage).toLowerCase()}`;

  try {
    await Share.open({
      showAppsToView: true,
      title,
      type: 'application/pdf',
      url: Platform.OS === 'android' ? `file://${exportFilePath}` : exportFilePath,
    });
  } catch (e) {
    // error
  }
};

const createExport = () => async (dispatch, getState) => {
  dispatch(enableExporting());
  dispatch(resetExportFilename());

  await deleteOldExportFiles();

  const {
    dashboard: { days },
    directory: { persons: directoryPersons, locations: directoryLocations },
    i18n: { currentLanguage },
  } = getState();

  const { content, filename } = await createPdfFile({ currentLanguage, days, directoryLocations, directoryPersons });
  const pdfPath = `${exportFileTempDirectory}/${filename}`;

  dispatch(setExportFilename(filename));

  await RNFS.writeFile(pdfPath, content, 'base64');

  dispatch(showExportResultModal());
};

const mapStateToProps = ({ export: { isExporting, isExportResultModalVisible } }) => {
  return { isExporting, isExportResultModalVisible };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createExport: () => dispatch(createExport()),
    hideExportResultModal: () => dispatch(closeExportResultModal()),
    saveExportFile: () => dispatch(saveExportFile()),
    shareExportFile: () => dispatch(shareExportFile()),
  };
};

const Export = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen)));

export default Export;
