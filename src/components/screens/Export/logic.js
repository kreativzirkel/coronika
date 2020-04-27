import { Platform } from 'react-native';
import Share from 'react-native-share';
import connect from 'react-redux/lib/connect/connect';
import withI18n, { __ } from '../../../i18n';
import withViewportUnits from '../../../utils/withViewportUnits';
import { enableExporting, disableExporting } from './actions';
import createPdfFile from './createPdfFile';
import Screen from './ui';

const createExport = () => async (dispatch, getState) => {
  dispatch(enableExporting());

  const {
    dashboard: { days },
    i18n: { currentLanguage },
  } = getState();

  const pdfPath = await createPdfFile({ currentLanguage, days });

  try {
    const title = `coronika ${__('export-screen.header.headline', currentLanguage).toLowerCase()}`;

    await Share.open({
      showAppsToView: true,
      title,
      type: 'application/pdf',
      url: Platform.OS === 'android' ? `file://${pdfPath}` : pdfPath,
    });
  } catch (error) {
    // error
  }

  dispatch(disableExporting());
};

const mapStateToProps = ({ export: { isExporting } }) => {
  return { isExporting };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createExport: () => dispatch(createExport()),
  };
};

const Export = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen)));

export default Export;
