export const setExportFilename = (exportFilename) => ({ type: 'SET_EXPORT_FILENAME_EXPORT', exportFilename });

export const resetExportFilename = () => ({ type: 'RESET_EXPORT_FILENAME_EXPORT' });

export const enableExporting = () => ({ type: 'ENABLE_EXPORTING_EXPORT' });

export const disableExporting = () => ({ type: 'DISABLE_EXPORTING_EXPORT' });

export const showExportResultModal = () => ({ type: 'SHOW_EXPORT_RESULT_MODAL_EXPORT' });

export const hideExportResultModal = () => ({ type: 'HIDE_EXPORT_RESULT_MODAL_EXPORT' });
