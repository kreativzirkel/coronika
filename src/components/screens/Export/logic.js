import { Alert, Keyboard, PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { connect } from 'react-redux';
import withI18n, { __ } from '../../../i18n';
import withColorScheme from '../../../utils/withColorScheme';
import withViewportUnits from '../../../utils/withViewportUnits';
import {
  disableExporting,
  enableExporting,
  hideExportRequestUserDataModal,
  hideExportResultModal,
  resetExportFilename,
  setExportFilenameCsv,
  setExportFilenamePdf,
  showExportRequestUserDataModal,
  showExportResultModal,
  setUserCaseId,
  setUserFirstName,
  setUserLastName,
} from './actions';
import createCsvFile from './createCsvFile';
import createPdfFile from './createPdfFile';
import Screen from './ui';

const exportFileTempDirectory = RNFS.DocumentDirectoryPath;

const deleteOldExportFiles = async () => {
  const files = await RNFS.readDir(exportFileTempDirectory);
  const exportFilePdfRegex = /^contacts_(.*).pdf$/;
  const exportFileCsvRegex = /^contacts_(.*).csv$/;

  files.forEach((f) => {
    if (f.isFile() && (exportFilePdfRegex.test(f.name) || exportFileCsvRegex.test(f.name))) {
      RNFS.unlink(`${exportFileTempDirectory}/${f.name}`);
    }
  });
};

const closeExportResultModal = () => async (dispatch) => {
  dispatch(disableExporting());
  dispatch(hideExportResultModal());
};

const saveExportFile = (exportFilename, mimeType) => async (dispatch, getState) => {
  const {
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
        type: mimeType,
        url: exportFilePath,
      });
    } catch (e) {
      // error
    }
  }
};

const saveExportFileCsv = () => async (dispatch, getState) => {
  const {
    export: { exportFilenameCsv },
  } = getState();

  dispatch(saveExportFile(exportFilenameCsv, 'text/csv'));
};

const saveExportFilePdf = () => async (dispatch, getState) => {
  const {
    export: { exportFilenamePdf },
  } = getState();

  dispatch(saveExportFile(exportFilenamePdf, 'application/pdf'));
};

const shareExportFile = (exportFilename, mimeType) => async (dispatch, getState) => {
  const {
    i18n: { currentLanguage },
  } = getState();

  const exportFilePath = `${exportFileTempDirectory}/${exportFilename}`;
  const title = `coronika ${__('export-screen.header.headline', currentLanguage).toLowerCase()}`;

  try {
    await Share.open({
      showAppsToView: true,
      title,
      type: mimeType,
      url: Platform.OS === 'android' ? `file://${exportFilePath}` : exportFilePath,
    });
  } catch (e) {
    // error
  }
};

const shareExportFileCsv = () => async (dispatch, getState) => {
  const {
    export: { exportFilenameCsv },
  } = getState();

  dispatch(shareExportFile(exportFilenameCsv, 'text/csv'));
};

const shareExportFilePdf = () => async (dispatch, getState) => {
  const {
    export: { exportFilenamePdf },
  } = getState();

  dispatch(shareExportFile(exportFilenamePdf, 'application/pdf'));
};

const createExport = () => async (dispatch, getState) => {
  Keyboard.dismiss();
  dispatch(enableExporting());
  dispatch(hideExportRequestUserDataModal());
  dispatch(resetExportFilename());

  await deleteOldExportFiles();

  const {
    dashboard: { days },
    directory: { persons: directoryPersons, locations: directoryLocations },
    export: { userFirstName, userLastName, userCaseId },
    i18n: { currentLanguage },
  } = getState();

  const { content: contentPdf, filename: filenamePdf } = await createPdfFile({
    currentLanguage,
    days,
    directoryLocations,
    directoryPersons,
    userFirstName,
    userLastName,
    userCaseId,
  });
  const pdfPath = `${exportFileTempDirectory}/${filenamePdf}`;

  dispatch(setExportFilenamePdf(filenamePdf));

  await RNFS.writeFile(pdfPath, contentPdf, 'base64');

  const { content: contentCsv, filename: filenameCsv } = await createCsvFile({
    days,
    directoryPersons,
    userFirstName,
    userLastName,
    userCaseId,
  });
  const csvPath = `${exportFileTempDirectory}/${filenameCsv}`;

  dispatch(setExportFilenameCsv(filenameCsv));

  await RNFS.writeFile(csvPath, contentCsv, 'utf8');

  setTimeout(() => {
    dispatch(showExportResultModal());
  }, 500);
};

const mapStateToProps = ({
  export: {
    isExporting,
    isExportRequestUserDataModalVisible,
    isExportResultModalVisible,
    userFirstName,
    userLastName,
    userCaseId,
  },
}) => {
  const buttonCreateExportDisabled =
    userFirstName.trim().length < 1 ||
    userLastName.trim().length < 1 ||
    `${userFirstName} ${userLastName}`.replace(/\s/g, '').length < 5;

  return {
    buttonCreateExportDisabled,
    isExporting,
    isExportRequestUserDataModalVisible,
    isExportResultModalVisible,
    userFirstName,
    userLastName,
    userCaseId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createExport: () => dispatch(createExport()),
    hideExportRequestUserDataModal: () => dispatch(hideExportRequestUserDataModal()),
    hideExportResultModal: () => dispatch(closeExportResultModal()),
    saveExportFileCsv: () => dispatch(saveExportFileCsv()),
    saveExportFilePdf: () => dispatch(saveExportFilePdf()),
    shareExportFileCsv: () => dispatch(shareExportFileCsv()),
    shareExportFilePdf: () => dispatch(shareExportFilePdf()),
    showExportRequestUserDataModal: () => dispatch(showExportRequestUserDataModal()),
    setUserFirstName: (userFirstName) => dispatch(setUserFirstName(userFirstName)),
    setUserLastName: (userLastName) => dispatch(setUserLastName(userLastName)),
    setUserCaseId: (userCaseId) => dispatch(setUserCaseId(userCaseId)),
  };
};

const Export = withColorScheme(withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen))));

export default Export;
