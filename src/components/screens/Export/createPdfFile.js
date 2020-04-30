import fontkit from '@pdf-lib/fontkit';
import moment from 'moment';
import { PDFDocument, rgb } from 'pdf-lib';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { __, getFontFamilyBold, getFontFamilyRegular } from '../../../i18n';

const PAGE_MARGINS = {
  BOTTOM: 56.6928, // 2cm
  LEFT: 70.8696, // 2,5cm
  RIGHT: 56.6928, // 2cm
  TOP: 56.6928, // 2cm
};

const PAGE_SIZE = {
  HEIGHT: 842,
  WIDTH: 595,
};

const CONTENT_MARGIN = {
  TOP: PAGE_MARGINS.TOP * 2,
};

const chooseFont = (text, currentLanguage, font, fontDefault) => {
  if (['ja', 'si', 'zh'].includes(currentLanguage)) {
    const charCodes = [...new Set(text.split('').map((c) => c.charCodeAt(0)))];

    if (charCodes.every((c) => fontDefault.getCharacterSet().includes(c))) {
      return fontDefault;
    }
  }

  return font;
};

const addHeaderFooter = (pdfDoc, days, exportTime, currentLanguage, fonts) => {
  const { customFontBold, customFontRegular, customFontJetBrainsMonoBold, customFontJetBrainsMonoRegular } = fonts;

  const chooseFontRegular = (text) =>
    chooseFont(text, currentLanguage, customFontRegular, customFontJetBrainsMonoRegular);

  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    const { height, width } = page.getSize();

    const logoText = 'coronika';
    const logoTextSize = 20;
    const logoTextHeight = customFontJetBrainsMonoBold.heightAtSize(logoTextSize / 1.6);
    const logoTextWidth = customFontJetBrainsMonoBold.widthOfTextAtSize(logoText, logoTextSize);

    page.drawText(logoText, {
      x: width - PAGE_MARGINS.RIGHT - logoTextWidth,
      y: height - PAGE_MARGINS.TOP - logoTextHeight,
      color: rgb(23 / 255, 217 / 255, 188 / 255),
      font: customFontJetBrainsMonoBold,
      size: logoTextSize,
    });

    const headlineText = __('export-screen.header.headline', currentLanguage).toLowerCase();
    const headlineTextSize = 20;
    const headlineTextHeight = customFontBold.heightAtSize(headlineTextSize / 1.6);

    page.drawText(headlineText, {
      x: PAGE_MARGINS.LEFT,
      y: height - PAGE_MARGINS.TOP - headlineTextHeight * 0.5,
      color: rgb(0, 0, 0),
      font: customFontBold,
      size: headlineTextSize,
    });

    const timestamps = Object.keys(days).map((timestamp) => parseInt(timestamp, 10));
    const dayStart = Math.min(...timestamps);
    const dayEnd = Math.max(...timestamps);

    const timespanText = `${moment(dayStart).format('L')} - ${moment(dayEnd).format('L')}`;
    const timespanTextFont = chooseFontRegular(timespanText);
    const timespanTextSize = 10;
    const timespanTextHeight = timespanTextFont.heightAtSize(timespanTextSize / 1.6);

    page.drawText(timespanText, {
      x: PAGE_MARGINS.LEFT,
      y: height - PAGE_MARGINS.TOP - headlineTextHeight - 5 - timespanTextHeight,
      color: rgb(0, 0, 0),
      font: timespanTextFont,
      size: timespanTextSize,
    });

    const footerTimestampText = moment(exportTime).format('L LT');
    const footerTimestampTextFont = chooseFontRegular(footerTimestampText);
    const footerTimestampTextSize = 8;
    const footerTimestampTextHeight = footerTimestampTextFont.heightAtSize(footerTimestampTextSize / 1.6);

    page.drawText(footerTimestampText, {
      x: PAGE_MARGINS.LEFT,
      y: PAGE_MARGINS.BOTTOM / 2 + footerTimestampTextHeight / 2,
      color: rgb(0, 0, 0),
      font: footerTimestampTextFont,
      size: footerTimestampTextSize,
    });

    const footerPageText = `${__('page', currentLanguage).toLowerCase()} ${index + 1} / ${pages.length}`;
    const footerPageTextFont = chooseFontRegular(footerPageText);
    const footerPageTextSize = 8;
    const footerPageTextHeight = footerPageTextFont.heightAtSize(footerPageTextSize / 1.6);
    const footerPageTextWidth = footerPageTextFont.widthOfTextAtSize(footerPageText, footerPageTextSize);

    page.drawText(footerPageText, {
      x: width - footerPageTextWidth - PAGE_MARGINS.RIGHT,
      y: PAGE_MARGINS.BOTTOM / 2 + footerPageTextHeight / 2,
      color: rgb(0, 0, 0),
      font: footerPageTextFont,
      size: footerPageTextSize,
    });

    const footerWebsiteText = 'https://coronika.app/';
    const footerWebsiteTextSize = 8;
    const footerWebsiteTextHeight = customFontJetBrainsMonoRegular.heightAtSize(footerWebsiteTextSize / 1.6);
    const footerWebsiteTextWidth = customFontJetBrainsMonoRegular.widthOfTextAtSize(
      footerWebsiteText,
      footerWebsiteTextSize
    );

    page.drawText(footerWebsiteText, {
      x: width / 2 - footerWebsiteTextWidth / 2,
      y: PAGE_MARGINS.BOTTOM / 2 + footerWebsiteTextHeight / 2,
      color: rgb(0, 0, 0),
      font: customFontJetBrainsMonoRegular,
      size: footerWebsiteTextSize,
    });
  });
};

const createPdfFile = async (options = {}) => {
  const { currentLanguage, days } = options;

  const exportTime = new Date();
  const exportTimeFormatted = moment(exportTime).format('YYYYMMDDHHmm');
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  pdfDoc.setAuthor('coronika');
  pdfDoc.setCreationDate(exportTime);
  pdfDoc.setCreator('coronika (https://coronika.app/)');
  pdfDoc.setModificationDate(exportTime);
  pdfDoc.setProducer('coronika (https://coronika.app/)');
  pdfDoc.setSubject(
    `${exportTimeFormatted} coronika ${__('export-screen.header.headline', currentLanguage).toLowerCase()}`
  );
  pdfDoc.setTitle(
    `${exportTimeFormatted} coronika ${__('export-screen.header.headline', currentLanguage).toLowerCase()}`
  );

  let fontFileBold;
  let fontFileRegular;

  switch (currentLanguage) {
    case 'ja':
      fontFileBold = fontFileRegular = 'NotoSansJP-Regular.otf';
      break;
    case 'si':
      fontFileBold = fontFileRegular = 'NotoSansSinhala-Regular.ttf';
      break;
    case 'zh':
      fontFileBold = fontFileRegular = 'NotoSansSC-Regular.otf';
      break;
    default:
      fontFileBold = `${getFontFamilyBold(currentLanguage)}.ttf`;
      fontFileRegular = `${getFontFamilyRegular(currentLanguage)}.ttf`;
  }

  const fontFileJetBrainsMonoBold = 'JetBrainsMono-Bold.ttf';
  const fontFileJetBrainsMonoRegular = 'JetBrainsMono-Regular.ttf';

  let fontBoldBase64;
  let fontRegularBase64;
  let fontJetBrainsMonoBoldBase64;
  let fontJetBrainsMonoRegularBase64;
  if (Platform.OS === 'android') {
    fontBoldBase64 = await RNFS.readFileAssets(`fonts/${fontFileBold}`, 'base64');
    fontRegularBase64 = await RNFS.readFileAssets(`fonts/${fontFileRegular}`, 'base64');
    fontJetBrainsMonoBoldBase64 = await RNFS.readFileAssets(`fonts/${fontFileJetBrainsMonoBold}`, 'base64');
    fontJetBrainsMonoRegularBase64 = await RNFS.readFileAssets(`fonts/${fontFileJetBrainsMonoRegular}`, 'base64');
  } else {
    fontBoldBase64 = await RNFS.readFile(`${RNFS.MainBundlePath}/${fontFileBold}`, 'base64');
    fontRegularBase64 = await RNFS.readFile(`${RNFS.MainBundlePath}/${fontFileRegular}`, 'base64');
    fontJetBrainsMonoBoldBase64 = await RNFS.readFile(`${RNFS.MainBundlePath}/${fontFileJetBrainsMonoBold}`, 'base64');
    fontJetBrainsMonoRegularBase64 = await RNFS.readFile(
      `${RNFS.MainBundlePath}/${fontFileJetBrainsMonoRegular}`,
      'base64'
    );
  }

  const customFontRegular = await pdfDoc.embedFont(fontRegularBase64);
  const customFontBold = await pdfDoc.embedFont(fontBoldBase64);
  const customFontJetBrainsMonoRegular = await pdfDoc.embedFont(fontJetBrainsMonoRegularBase64);
  const customFontJetBrainsMonoBold = await pdfDoc.embedFont(fontJetBrainsMonoBoldBase64);

  const chooseFontRegular = (text) =>
    chooseFont(text, currentLanguage, customFontRegular, customFontJetBrainsMonoRegular);

  const entryPadding = 6;
  const entryNameTextSize = 9;
  const entryNameTextHeight = customFontRegular.heightAtSize(entryNameTextSize / 1.6);
  const entryNameMarginBottom = 6;
  const entryPhoneTextSize = 7;
  const entryPhoneTextHeight = customFontRegular.heightAtSize(entryPhoneTextSize / 1.6);
  const entryTimestampTextSize = 7;
  const entryTimestampTextHeight = customFontRegular.heightAtSize(entryTimestampTextSize / 1.6);
  const entryTimestampMarginBottom = 4;
  const entryHeight = 2 * entryPadding + entryNameTextHeight + entryPhoneTextHeight + entryNameMarginBottom;

  const pageCursorYInitial = PAGE_SIZE.HEIGHT - CONTENT_MARGIN.TOP;
  let pageCursorY = pageCursorYInitial;

  const sortByCounter = (a, b) => {
    if (a.counter < b.counter) {
      return 1;
    }
    if (a.counter > b.counter) {
      return -1;
    }

    return 0;
  };

  const locations = {};
  const persons = {};

  const daysSorted = Object.values(days).sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return 1;
    }
    if (a.timestamp > b.timestamp) {
      return -1;
    }

    return 0;
  });

  daysSorted.forEach((day) => {
    day.locations.forEach(({ description, id, title, timestamp }) => {
      if (Object.values(locations).find((l) => l.id === id)) {
        locations[id].counter += 1;
        locations[id].timestamps = [...locations[id].timestamps, { description, timestamp }];
      } else {
        locations[id] = { counter: 1, id, title, timestamps: [{ description, timestamp }] };
      }
    });

    day.persons.forEach(({ fullName, id, phoneNumbers }) => {
      if (Object.values(persons).find((p) => p.id === id)) {
        persons[id].counter += 1;
        persons[id].phoneNumbers = { ...persons[id].phoneNumbers, ...phoneNumbers };
      } else {
        persons[id] = { counter: 1, fullName, id, phoneNumbers };
      }
    });
  });

  const locationsSorted = Object.values(locations).sort((a, b) => sortByCounter(a, b));
  const personsSorted = Object.values(persons).sort((a, b) => sortByCounter(a, b));

  const subheadlineTextSize = 14;
  const subheadlineTextHeight = customFontBold.heightAtSize(subheadlineTextSize / 1.6);
  const subheadlineTextHeightWithMargin = subheadlineTextHeight * 1.8;
  const subheadlineQuantityText = __('quantity', currentLanguage).toLowerCase();
  const subheadlineQuantityTextSize = 9;
  let subheadlineQuantityTextWidth = customFontRegular.widthOfTextAtSize(
    subheadlineQuantityText,
    subheadlineQuantityTextSize
  );

  if (currentLanguage === 'si') {
    subheadlineQuantityTextWidth *= 1.25;
  }

  const personsHeadlineText = __('persons', currentLanguage).toLowerCase();

  let createNewPage = true;

  personsSorted.forEach(({ counter, fullName, phoneNumbers }) => {
    let page;

    if (createNewPage) {
      page = pdfDoc.addPage();
      page.setFont(customFontRegular);
      page.setSize(PAGE_SIZE.WIDTH, PAGE_SIZE.HEIGHT);

      page.drawText(personsHeadlineText, {
        x: PAGE_MARGINS.LEFT,
        y: pageCursorY - subheadlineTextHeight,
        color: rgb(0, 0, 0),
        font: customFontBold,
        size: subheadlineTextSize,
      });

      page.drawText(subheadlineQuantityText, {
        x: PAGE_SIZE.WIDTH - PAGE_MARGINS.RIGHT - subheadlineQuantityTextWidth,
        y: pageCursorY - subheadlineTextHeight,
        color: rgb(0, 0, 0),
        size: subheadlineQuantityTextSize,
      });

      pageCursorY -= subheadlineTextHeightWithMargin;

      createNewPage = false;
    } else {
      page = pdfDoc.getPage(pdfDoc.getPageCount() - 1);
    }

    page.drawRectangle({
      x: PAGE_MARGINS.LEFT,
      y: pageCursorY - entryHeight,
      height: entryHeight,
      width: PAGE_SIZE.WIDTH - PAGE_MARGINS.LEFT - PAGE_MARGINS.RIGHT,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
      color: rgb(1, 1, 1),
    });

    page.drawText(fullName, {
      x: PAGE_MARGINS.LEFT + entryPadding,
      y: pageCursorY - entryPadding - entryNameTextHeight,
      color: rgb(0, 0, 0),
      font: chooseFontRegular(fullName),
      size: entryNameTextSize,
    });

    const entryCounterTextWidth = customFontBold.widthOfTextAtSize(counter.toString(), entryNameTextSize);

    page.drawText(counter.toString(), {
      x: PAGE_SIZE.WIDTH - PAGE_MARGINS.RIGHT - entryPadding - entryCounterTextWidth,
      y: pageCursorY - entryPadding - entryNameTextHeight,
      color: rgb(0, 0, 0),
      font: chooseFontRegular(counter.toString()),
      size: entryNameTextSize,
    });

    const numbers = [...new Set(Object.values(phoneNumbers).map(({ number }) => number.toString().replace(/\s/g, '')))];
    const numbersText = numbers.join(', ');

    page.drawText(numbersText, {
      x: PAGE_MARGINS.LEFT + entryPadding,
      y: pageCursorY - entryPadding - entryNameTextHeight - entryNameMarginBottom - entryPhoneTextHeight,
      color: rgb(0, 0, 0),
      font: chooseFontRegular(numbersText),
      size: entryPhoneTextSize,
    });

    pageCursorY -= entryHeight;

    if (pageCursorY - entryHeight < PAGE_MARGINS.BOTTOM) {
      createNewPage = true;
      pageCursorY = pageCursorYInitial;
    }
  });

  const locationsHeadlineText = __('locations', currentLanguage).toLowerCase();

  const calculateLocationEntryHeight = (countTimestamps = 0) => {
    return (
      2 * entryPadding +
      entryNameTextHeight +
      countTimestamps * entryTimestampTextHeight +
      (countTimestamps - 1) * entryTimestampMarginBottom +
      entryNameMarginBottom
    );
  };

  let writeSubheadline = true;

  if (locationsSorted.length > 0) {
    const locationsMarginTop = 30;
    const firstLocationHeightWithSubheadline =
      subheadlineTextHeightWithMargin +
      calculateLocationEntryHeight(locationsSorted[0].timestamps.length) +
      locationsMarginTop;

    if (pageCursorY - firstLocationHeightWithSubheadline < PAGE_MARGINS.BOTTOM || pageCursorY === pageCursorYInitial) {
      createNewPage = true;
      pageCursorY = pageCursorYInitial;
    } else {
      pageCursorY -= locationsMarginTop;

      createNewPage = false;
    }
  }

  locationsSorted.forEach(({ counter, timestamps, title }, index) => {
    let page;

    if (createNewPage) {
      page = pdfDoc.addPage();
      page.setFont(customFontRegular);
      page.setSize(PAGE_SIZE.WIDTH, PAGE_SIZE.HEIGHT);

      createNewPage = false;
      writeSubheadline = true;
    } else {
      page = pdfDoc.getPage(pdfDoc.getPageCount() - 1);
    }

    if (writeSubheadline) {
      page.drawText(locationsHeadlineText, {
        x: PAGE_MARGINS.LEFT,
        y: pageCursorY - subheadlineTextHeight,
        color: rgb(0, 0, 0),
        font: customFontBold,
        size: subheadlineTextSize,
      });

      page.drawText(subheadlineQuantityText, {
        x: PAGE_SIZE.WIDTH - PAGE_MARGINS.RIGHT - subheadlineQuantityTextWidth,
        y: pageCursorY - subheadlineTextHeight,
        color: rgb(0, 0, 0),
        size: subheadlineQuantityTextSize,
      });

      pageCursorY -= subheadlineTextHeightWithMargin;

      writeSubheadline = false;
    }

    const locationEntryHeight = calculateLocationEntryHeight(timestamps.length);

    page.drawRectangle({
      x: PAGE_MARGINS.LEFT,
      y: pageCursorY - locationEntryHeight,
      height: locationEntryHeight,
      width: PAGE_SIZE.WIDTH - PAGE_MARGINS.LEFT - PAGE_MARGINS.RIGHT,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
      color: rgb(1, 1, 1),
    });

    page.drawText(title, {
      x: PAGE_MARGINS.LEFT + entryPadding,
      y: pageCursorY - entryPadding - entryNameTextHeight,
      color: rgb(0, 0, 0),
      font: chooseFontRegular(title),
      size: entryNameTextSize,
    });

    const entryCounterTextWidth = customFontBold.widthOfTextAtSize(counter.toString(), entryNameTextSize);

    page.drawText(counter.toString(), {
      x: PAGE_SIZE.WIDTH - PAGE_MARGINS.RIGHT - entryPadding - entryCounterTextWidth,
      y: pageCursorY - entryPadding - entryNameTextHeight,
      color: rgb(0, 0, 0),
      font: chooseFontRegular(counter.toString()),
      size: entryNameTextSize,
    });

    timestamps
      .sort((a, b) => {
        if (a.timestamp > b.timestamp) return 1;
        if (a.timestamp < b.timestamp) return -1;

        return 0;
      })
      .forEach(({ description, timestamp }, i) => {
        const timestampText = moment(timestamp).format('L LT');
        const timestampTextFont = chooseFontRegular(timestampText);

        const y =
          pageCursorY -
          entryPadding -
          entryNameTextHeight -
          i * entryTimestampTextHeight -
          entryNameMarginBottom -
          i * entryTimestampMarginBottom;

        page.drawText(timestampText, {
          x: PAGE_MARGINS.LEFT + entryPadding,
          y: y - entryTimestampTextHeight,
          color: rgb(0, 0, 0),
          font: timestampTextFont,
          size: entryTimestampTextSize,
        });

        if (description.trim().length > 0) {
          const timestampTextWidth = timestampTextFont.widthOfTextAtSize(timestampText, entryTimestampTextSize);
          const descriptionText = `(${description.trim()})`;

          page.drawText(descriptionText, {
            x: PAGE_MARGINS.LEFT + 1.5 * entryPadding + timestampTextWidth,
            y: y - entryTimestampTextHeight,
            color: rgb(0.33, 0.33, 0.33),
            font: chooseFontRegular(descriptionText),
            size: entryTimestampTextSize - 1,
          });
        }
      });

    pageCursorY -= locationEntryHeight;

    const nextLocationEntryHeight =
      index < locationsSorted.length - 1
        ? calculateLocationEntryHeight(locationsSorted[index + 1].timestamps.length)
        : 0;

    if (pageCursorY - nextLocationEntryHeight < PAGE_MARGINS.BOTTOM) {
      createNewPage = true;
      pageCursorY = pageCursorYInitial;
    }
  });

  addHeaderFooter(pdfDoc, days, exportTime, currentLanguage, {
    customFontBold,
    customFontRegular,
    customFontJetBrainsMonoBold,
    customFontJetBrainsMonoRegular,
  });

  const content = await pdfDoc.saveAsBase64();
  const filename = `${exportTimeFormatted} coronika ${__(
    'export-screen.header.headline',
    currentLanguage
  ).toLowerCase()}.pdf`;

  return { content, filename };
};

export default createPdfFile;
