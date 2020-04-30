const initialState = {
  exportFilename: '',
  isExporting: false,
  isExportResultModalVisible: false,
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SET_EXPORT_FILENAME_EXPORT':
      return { ...state, exportFilename: action.exportFilename };

    case 'RESET_EXPORT_FILENAME_EXPORT':
      return { ...state, exportFilename: '' };

    case 'ENABLE_EXPORTING_EXPORT':
      return { ...state, isExporting: true };

    case 'DISABLE_EXPORTING_EXPORT':
      return { ...state, isExporting: false };

    case 'SHOW_EXPORT_RESULT_MODAL_EXPORT':
      return { ...state, isExportResultModalVisible: true };

    case 'HIDE_EXPORT_RESULT_MODAL_EXPORT':
      return { ...state, isExportResultModalVisible: false };

    default:
      return state;
  }
};
