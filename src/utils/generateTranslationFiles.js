/* eslint-disable import/no-extraneous-dependencies */

const { spawnSync } = require('child_process');
const colors = require('colors/safe');
const fs = require('fs');
const path = require('path');
const po2json = require('po2json');
const recursiveReadSync = require('recursive-sync-readdir');

const generateTranslationFiles = (translationsDir) => {
  try {
    spawnSync('babel', ['src']);
  } catch (e) {
    /* eslint-disable no-console */
    console.log('');
    // noinspection JSUnresolvedFunction
    console.error(colors.red('babel is not installed!'));
    /* eslint-enable no-console */

    return;
  }

  const pot = 'template.pot';
  const pathPot = path.resolve(translationsDir, pot);

  // check if msgmerge is installed

  let msgmergeInstalled = true;

  try {
    const msgmergeTest = spawnSync('msgmerge', ['-h']);

    if (msgmergeTest.error) {
      // noinspection ExceptionCaughtLocallyJS
      throw Error();
    }
  } catch (e) {
    /* eslint-disable no-console */
    console.log('');
    // noinspection JSUnresolvedFunction
    console.error(colors.red('msgmerge is not installed! Will not merge existing .PO files with new .POT file!'));
    /* eslint-enable no-console */
    msgmergeInstalled = false;
  }

  const filesSrc = recursiveReadSync(translationsDir, []);

  if (filesSrc && filesSrc.length > 0) {
    let indexFiles = filesSrc.length;

    /* eslint-disable-next-line no-plusplus */
    while (indexFiles--) {
      const file = filesSrc[indexFiles];
      const ext = path.extname(file);

      if (ext === '.po') {
        const pathFile = path.resolve(translationsDir, file);

        // use msgmerge to merge existing .PO files with new .POT file

        if (msgmergeInstalled) {
          const pathFileTemp = `${pathFile}_TEMP`;

          const msgmerge = spawnSync('msgmerge', [pathFile, pathPot, '-o', pathFileTemp]);

          if (!fs.existsSync(pathFileTemp)) {
            /* eslint-disable-next-line no-console */
            console.error(msgmerge.output.toString());
          } else {
            fs.unlinkSync(pathFile);
            fs.renameSync(pathFileTemp, pathFile);
          }
        }

        // use po2json to create .JSON files for wordpress

        const language = file.substr(0, file.indexOf(ext));
        const fileJSON = `${language}.json`;
        const jsonString = po2json.parseFileSync(pathFile, { format: 'jed', stringify: true });

        fs.writeFileSync(path.resolve(translationsDir, fileJSON), jsonString, { encoding: 'utf8', flag: 'w' });
      }
    }
  }
};

generateTranslationFiles('./src/assets/translations');
