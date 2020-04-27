import { Share } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import withViewportUnits from '../../../utils/withViewportUnits';
import createPdfFile from './createPdfFile';
import Screen from './ui';

const createExport = () => async (dispatch, getState) => {
  const {
    dashboard: { days },
    i18n: { currentLanguage },
  } = getState();

  const pdfPath = await createPdfFile({ currentLanguage, days });

  try {
    await Share.share({
      title: 'coronika export',
      url: pdfPath,
    });
  } catch (error) {
    // error
  }
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    createExport: () => dispatch(createExport()),
  };
};

const Export = withI18n(withViewportUnits(connect(mapStateToProps, mapDispatchToProps)(Screen)));

export default Export;
