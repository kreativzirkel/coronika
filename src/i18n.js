// import { __ as __wordpressi18n } from '@wordpress/i18n';
import de_DE from './assets/languages/de_DE';
import en_US from './assets/languages/en_US';
import { CURRENT_LANGUAGE } from './constants';

const __ = (text, domain) => {
  // only enable certain languages for configurator
  /* istanbul ignore if */
  if (!['de', 'en'].includes(CURRENT_LANGUAGE)) {
    return text;
  }

  if (CURRENT_LANGUAGE === 'de') {
    return de_DE.locale_data.messages[text]?.[0] || text;
  }

  if (CURRENT_LANGUAGE === 'en') {
    return en_US.locale_data.messages[text]?.[0] || text;
  }

  // TODO
  return text; //__wordpressi18n(text, domain);
};

export default __;
