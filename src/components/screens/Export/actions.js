export const setExportFilenameCsv = (exportFilenameCsv) => ({
  type: 'SET_EXPORT_FILENAME_CSV_EXPORT',
  exportFilenameCsv,
});

export const setExportFilenamePdf = (exportFilenamePdf) => ({
  type: 'SET_EXPORT_FILENAME_PDF_EXPORT',
  exportFilenamePdf,
});

export const resetExportFilename = () => ({ type: 'RESET_EXPORT_FILENAME_EXPORT' });

export const enableExporting = () => ({ type: 'ENABLE_EXPORTING_EXPORT' });

export const disableExporting = () => ({ type: 'DISABLE_EXPORTING_EXPORT' });

export const showExportRequestUserDataModal = () => ({ type: 'SHOW_EXPORT_REQUEST_USER_DATA_MODAL_EXPORT' });

export const hideExportRequestUserDataModal = () => ({ type: 'HIDE_EXPORT_REQUEST_USER_DATA_MODAL_EXPORT' });

export const showExportResultModal = () => ({ type: 'SHOW_EXPORT_RESULT_MODAL_EXPORT' });

export const hideExportResultModal = () => ({ type: 'HIDE_EXPORT_RESULT_MODAL_EXPORT' });

export const setUserFirstName = (userFirstName) => ({ type: 'SET_USER_FIRST_NAME_EXPORT', userFirstName });

export const setUserLastName = (userLastName) => ({ type: 'SET_USER_LAST_NAME_EXPORT', userLastName });

export const setUserCaseId = (userCaseId) => ({ type: 'SET_USER_CASE_ID_EXPORT', userCaseId });
