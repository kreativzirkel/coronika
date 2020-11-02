const initialState = {
  exportFilenameCsv: '',
  exportFilenamePdf: '',
  isExporting: false,
  isExportRequestUserDataModalVisible: false,
  isExportResultModalVisible: false,
  userFirstName: '',
  userLastName: '',
  userCaseId: '',
};

export default (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'SET_EXPORT_FILENAME_CSV_EXPORT':
      return { ...state, exportFilenameCsv: action.exportFilenameCsv };

    case 'SET_EXPORT_FILENAME_PDF_EXPORT':
      return { ...state, exportFilenamePdf: action.exportFilenamePdf };

    case 'RESET_EXPORT_FILENAME_EXPORT':
      return { ...state, exportFilename: '' };

    case 'ENABLE_EXPORTING_EXPORT':
      return { ...state, isExporting: true };

    case 'DISABLE_EXPORTING_EXPORT':
      return { ...state, isExporting: false };

    case 'SHOW_EXPORT_REQUEST_USER_DATA_MODAL_EXPORT':
      return { ...state, isExportRequestUserDataModalVisible: true };

    case 'HIDE_EXPORT_REQUEST_USER_DATA_MODAL_EXPORT':
      return { ...state, isExportRequestUserDataModalVisible: false };

    case 'SHOW_EXPORT_RESULT_MODAL_EXPORT':
      return { ...state, isExportResultModalVisible: true };

    case 'HIDE_EXPORT_RESULT_MODAL_EXPORT':
      return { ...state, isExportResultModalVisible: false };

    case 'SET_USER_FIRST_NAME_EXPORT':
      return { ...state, userFirstName: action.userFirstName };

    case 'SET_USER_LAST_NAME_EXPORT':
      return { ...state, userLastName: action.userLastName };

    case 'SET_USER_CASE_ID_EXPORT': {
      const userCaseId = action.userCaseId.trim().toUpperCase();

      if (userCaseId.length === 0 || userCaseId.length < 7) return { ...state, userCaseId };

      return state;
    }

    default:
      return state;
  }
};
