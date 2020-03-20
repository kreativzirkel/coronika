const fs = require('fs');
const path = require('path');
const recursiveReadSync = require('recursive-sync-readdir');
const stringify = require('csv-stringify');

const exportTranslations = (translationsDir) => {
  const filesSrc = recursiveReadSync(translationsDir, []);

  const stringIds = new Set();
  const translations = {};
  const result = [];

  if (filesSrc && filesSrc.length > 0) {
    let indexFiles = filesSrc.length;

    /* eslint-disable-next-line no-plusplus */
    while (indexFiles--) {
      const file = filesSrc[indexFiles];
      const ext = path.extname(file);

      if (ext === '.json') {
        const pathFile = path.resolve(translationsDir, file);
        const language = file.substring(0, 2);

        translations[language] = {};

        const content = JSON.parse(fs.readFileSync(pathFile).toString());

        Object.keys(content.locale_data.messages)
          .filter((key) => key.trim().length > 0)
          .forEach((id) => {
            stringIds.add(id);
            translations[language][id] = content.locale_data.messages[id][1];
          });

        // console.log(translations);
      }
    }
  }

  const headerRow = [
    'ID',
    ...Object.keys(translations)
      .sort()
      .map((language) => language.toUpperCase()),
  ];
  result.push(headerRow);

  [...stringIds].sort().forEach((messageId) => {
    const row = [messageId];

    Object.keys(translations)
      .sort()
      .forEach((language) => {
        const translation = translations[language][messageId] || '';
        row.push(translation.replace(/\n/g, '\\n'));
      });

    result.push(row);
  });

  stringify(result, { delimiter: ';', recordDelimiter: '\r\n', eof: false }, (error, output) => {
    // console.log(result);
    const file = path.resolve(translationsDir, 'export.csv');
    fs.writeFileSync(file, output, { encoding: 'utf8' });
  });
};

exportTranslations('./src/assets/translations');
