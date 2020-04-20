import fontkit from '@pdf-lib/fontkit';
import moment from 'moment';
import { PDFDocument, rgb } from 'pdf-lib';
import { Platform, Share } from 'react-native';
import RNFS from 'react-native-fs';
import connect from 'react-redux/lib/connect/connect';
import withI18n from '../../../i18n';
import withViewportUnits from '../../../utils/withViewportUnits';
import Screen from './ui';

const createExport = () => async (dispatch, getState) => {
  console.log('export!');

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  pdfDoc.setAuthor('coronika');
  pdfDoc.setCreationDate(new Date());
  pdfDoc.setCreator('coronika (https://coronika.app/)');
  pdfDoc.setModificationDate(new Date());
  pdfDoc.setProducer('coronika (https://coronika.app/)');
  pdfDoc.setSubject('coronika Data Export'); // TODO
  pdfDoc.setTitle('coronika Export'); // TODO

  let fontRegularBase64;
  let fontBoldBase64;
  if (Platform.OS === 'android') {
    fontRegularBase64 = await RNFS.readFileAssets('fonts/JetBrainsMono-Regular.ttf', 'base64');
    fontBoldBase64 = await RNFS.readFileAssets('fonts/JetBrainsMono-Bold.ttf', 'base64');
  } else {
    fontRegularBase64 = await RNFS.readFile(`${RNFS.MainBundlePath}/JetBrainsMono-Regular.ttf`, 'base64');
    fontBoldBase64 = await RNFS.readFile(`${RNFS.MainBundlePath}/JetBrainsMono-Bold.ttf`, 'base64');
  }

  const customFontRegular = await pdfDoc.embedFont(fontRegularBase64);
  const customFontBold = await pdfDoc.embedFont(fontBoldBase64);

  const page = pdfDoc.addPage();
  page.setFont(customFontRegular);
  page.setSize(595, 842);

  const { height, width } = page.getSize();

  const logoText = 'coronika';
  const logoTextSize = 20;
  const logoTextHeight = customFontBold.heightAtSize(logoTextSize / 1.6);
  const logoTextWidth = customFontBold.widthOfTextAtSize(logoText, logoTextSize);

  page.drawText(logoText, {
    x: width - logoTextWidth - 15,
    y: height - logoTextHeight - 15,
    color: rgb(23 / 255, 217 / 255, 188 / 255),
    font: customFontBold,
    size: logoTextSize,
  });

  const headlineText = 'Export';
  const headlineTextSize = 20;
  const headlineTextHeight = customFontBold.heightAtSize(headlineTextSize / 1.6);

  page.drawText(headlineText, {
    x: 15,
    y: height - headlineTextHeight - 15,
    color: rgb(0, 0, 0),
    font: customFontBold,
    size: headlineTextSize,
  });

  const {
    dashboard: { days },
  } = getState();

  const dayStart = Math.min(...Object.keys(days).map((timestamp) => parseInt(timestamp, 10)));
  const dayEnd = Math.max(...Object.keys(days).map((timestamp) => parseInt(timestamp, 10)));

  const timespanText = `${moment(dayStart).format('L')} - ${moment(dayEnd).format('L')}`;
  const timespanTextSize = 10;
  const timespanTextHeight = customFontRegular.heightAtSize(timespanTextSize / 1.6);

  page.drawText(timespanText, {
    x: 15,
    y: height - headlineTextSize - 5 - timespanTextHeight - 15,
    color: rgb(0, 0, 0),
    size: timespanTextSize,
  });

  const pdfContent = await pdfDoc.saveAsBase64();
  const pdfPath = `${RNFS.DocumentDirectoryPath}/export.pdf`;
  await RNFS.writeFile(pdfPath, pdfContent, 'base64');

  console.log(pdfPath);
  console.log('PDF created at: ' + pdfPath);
  // Do stuff with your shiny new PDF!

  try {
    const result = Share.share({
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
