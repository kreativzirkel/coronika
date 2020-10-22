import formatDistance from 'date-fns/formatDistance';
import {
  arSA as dateFnsArSa,
  de as dateFnsDe,
  el as dateFnsEl,
  enUS as dateFnsEnUs,
  es as dateFnsEs,
  fi as dateFnsFi,
  fr as dateFnsFr,
  it as dateFnsIt,
  ja as dateFnsJa,
  nl as dateFnsNl,
  pl as dateFnsPl,
  ro as dateFnsRo,
  ru as dateFnsRu,
  tr as dateFnsTr,
  uk as dateFnsUk,
  zhCN as dateFnsZhCn,
} from 'date-fns/locale';
import moment from 'moment';
import momentAr from 'moment/locale/ar';
import momentDe from 'moment/locale/de';
import momentEl from 'moment/locale/el';
import momentEnGb from 'moment/locale/en-gb';
import momentEs from 'moment/locale/es';
import momentFi from 'moment/locale/fi';
import momentFr from 'moment/locale/fr';
import momentIt from 'moment/locale/it';
import momentJa from 'moment/locale/ja';
import momentNl from 'moment/locale/nl';
import momentPl from 'moment/locale/pl';
import momentRo from 'moment/locale/ro';
import momentRu from 'moment/locale/ru';
import momentSi from 'moment/locale/si';
import momentTr from 'moment/locale/tr';
import momentUk from 'moment/locale/uk';
import momentZhCn from 'moment/locale/zh-cn';
import React from 'react';
import * as RNLocalize from 'react-native-localize';
import { ReactReduxContext } from 'react-redux';
import ar from './assets/translations/ar';
import de_DE from './assets/translations/de_DE';
import el_GR from './assets/translations/el_GR';
import en_US from './assets/translations/en_US';
import es_ES from './assets/translations/es_ES';
import fi_FI from './assets/translations/fi_FI';
import fr_FR from './assets/translations/fr_FR';
import it_IT from './assets/translations/it_IT';
import ja from './assets/translations/ja';
import nl_NL from './assets/translations/nl_NL';
import pl_PL from './assets/translations/pl_PL';
import ro_RO from './assets/translations/ro_RO';
import ru_RU from './assets/translations/ru_RU';
import si_LK from './assets/translations/si_LK';
import tr_TR from './assets/translations/tr_TR';
import uk_UA from './assets/translations/uk_UA';
import zh_CN from './assets/translations/zh_CN';
import { ALTERNATIVE_FONT_LANGUAGES, DEFAULT_LANGUAGE, RTL_LANGUAGES, SUPPORTED_LANGUAGES } from './constants';

const getFontFamily = (language, options = {}) => {
  let selectedLanguage = language;

  if (!selectedLanguage) {
    const bestAvailableLanguage = RNLocalize.findBestAvailableLanguage(SUPPORTED_LANGUAGES);
    selectedLanguage = bestAvailableLanguage?.languageTag?.substring(0, 2) || DEFAULT_LANGUAGE;
  }

  if (ALTERNATIVE_FONT_LANGUAGES.includes(selectedLanguage)) {
    if (options?.fontWeight === 'bold') {
      return 'DejaVuSansMono-Bold';
    }

    return 'DejaVuSansMono';
  } else {
    if (options?.fontWeight === 'bold') {
      return 'JetBrainsMono-Bold';
    }

    return 'JetBrainsMono-Regular';
  }
};

export const getFontFamilyBold = (language) => getFontFamily(language, { fontWeight: 'bold' });

export const getFontFamilyRegular = (language) => getFontFamily(language);

export const isRTL = (language) => {
  let selectedLanguage = language;

  if (!selectedLanguage) {
    const bestAvailableLanguage = RNLocalize.findBestAvailableLanguage(SUPPORTED_LANGUAGES);
    selectedLanguage = bestAvailableLanguage?.languageTag?.substring(0, 2) || DEFAULT_LANGUAGE;
  }

  return RTL_LANGUAGES.includes(selectedLanguage);
};

const getMessages = (language) => {
  let messages = {};
  const defaultMessages = {};
  const defaultMessagesList = en_US.locale_data.messages;

  if (defaultMessagesList) {
    Object.keys(defaultMessagesList).forEach((key) => {
      if (key.length > 0) {
        defaultMessages[key] = (defaultMessagesList[key].find((value) => value && value.length > 0) || '').trim();
      }
    });
  }

  if (SUPPORTED_LANGUAGES.includes(language)) {
    let messagesList;
    switch (language) {
      case 'ar':
        messagesList = ar.locale_data.messages;
        break;
      case 'de':
        messagesList = de_DE.locale_data.messages;
        break;
      case 'el':
        messagesList = el_GR.locale_data.messages;
        break;
      case 'es':
        messagesList = es_ES.locale_data.messages;
        break;
      case 'fi':
        messagesList = fi_FI.locale_data.messages;
        break;
      case 'fr':
        messagesList = fr_FR.locale_data.messages;
        break;
      case 'it':
        messagesList = it_IT.locale_data.messages;
        break;
      case 'ja':
        messagesList = ja.locale_data.messages;
        break;
      case 'nl':
        messagesList = nl_NL.locale_data.messages;
        break;
      case 'pl':
        messagesList = pl_PL.locale_data.messages;
        break;
      case 'ro':
        messagesList = ro_RO.locale_data.messages;
        break;
      case 'ru':
        messagesList = ru_RU.locale_data.messages;
        break;
      case 'si':
        messagesList = si_LK.locale_data.messages;
        break;
      case 'tr':
        messagesList = tr_TR.locale_data.messages;
        break;
      case 'uk':
        messagesList = uk_UA.locale_data.messages;
        break;
      case 'zh':
        messagesList = zh_CN.locale_data.messages;
        break;
      default:
        messagesList = en_US.locale_data.messages;
    }

    // TODO: remove!!
    // messagesList = ar.locale_data.messages;

    if (messagesList) {
      Object.keys(messagesList).forEach((key) => {
        if (key.length > 0) {
          const messageValue = (messagesList[key].find((value) => value && value.length > 0) || '').trim();
          if (messageValue.length > 0) messages[key] = messageValue;
        }
      });
    }

    messages = { ...defaultMessages, ...messages };
  } else {
    messages = { ...defaultMessages };
  }

  return messages;
};

const translations = SUPPORTED_LANGUAGES.reduce((obj, language) => {
  obj[language] = getMessages(language);

  return obj;
}, {});

export const initialState = {
  currentLanguage: DEFAULT_LANGUAGE,
};

export const changeLanguage = (language) => ({ type: 'CHANGE_LANGUAGE_I18N', language });

export const reducer = (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE_I18N': {
      const language = action.language;

      if (SUPPORTED_LANGUAGES.includes(language)) {
        const messages = translations[language];

        switch (language) {
          case 'ar':
            moment.updateLocale('ar', momentAr);
            break;
          case 'de':
            moment.updateLocale('de', momentDe);
            break;
          case 'el':
            moment.updateLocale('el', momentEl);
            break;
          case 'es':
            moment.updateLocale('es', momentEs);
            break;
          case 'fi':
            moment.updateLocale('fi', momentFi);
            break;
          case 'fr':
            moment.updateLocale('fr', momentFr);
            break;
          case 'it':
            moment.updateLocale('it', momentIt);
            break;
          case 'ja':
            moment.updateLocale('ja', momentJa);
            break;
          case 'nl':
            moment.updateLocale('nl', momentNl);
            break;
          case 'pl':
            moment.updateLocale('pl', momentPl);
            break;
          case 'ro':
            moment.updateLocale('ro', momentRo);
            break;
          case 'ru':
            moment.updateLocale('ru', momentRu);
            break;
          case 'si':
            moment.updateLocale('si', momentSi);
            break;
          case 'tr':
            moment.updateLocale('tr', momentTr);
            break;
          case 'uk':
            moment.updateLocale('uk', momentUk);
            break;
          case 'zh':
            moment.updateLocale('zh-cn', momentZhCn);
            break;
          default:
            moment.updateLocale('en', momentEnGb);
        }

        // TODO: remove!!
        // moment.updateLocale('ar', momentAr);

        return { ...state, currentLanguage: action.language, isRTL: isRTL(action.language), messages };
      }

      return state;
    }

    default:
      return state;
  }
};

export const __ = (text, language, messages) => {
  let translationLanguage = language;
  let translationMessages = messages;

  if (!translationLanguage) {
    const bestAvailableLanguage = RNLocalize.findBestAvailableLanguage(SUPPORTED_LANGUAGES);
    translationLanguage = bestAvailableLanguage?.languageTag?.substring(0, 2) || DEFAULT_LANGUAGE;
  }

  if (!SUPPORTED_LANGUAGES.includes(translationLanguage)) {
    translationLanguage = DEFAULT_LANGUAGE;
  }

  if (!translationMessages) {
    translationMessages = translations[translationLanguage];
  }

  return translationMessages?.[text] || text;
};

const withI18n = (WrappedComponent) => {
  class I18n extends React.Component {
    unsubscribeStore;

    constructor(props, context) {
      super(props, context);

      const {
        store: { getState },
      } = context;
      const {
        i18n: { currentLanguage: i18nCurrentLanguage },
      } = getState();

      const currentLanguage = i18nCurrentLanguage || DEFAULT_LANGUAGE;

      this.state = {
        currentLanguage,
        fontFamilyBold: getFontFamilyBold(currentLanguage),
        fontFamilyRegular: getFontFamilyRegular(currentLanguage),
      };

      this.formatTimeDistance = this.formatTimeDistance.bind(this);
      this.__i18n = this.__i18n.bind(this);
    }

    componentDidMount() {
      const {
        store: { getState, subscribe },
      } = this.context;

      this.unsubscribeStore = subscribe(() => {
        const { i18n } = getState();
        const currentLanguage = i18n.currentLanguage;
        this.setState({
          ...i18n,
          fontFamilyBold: getFontFamilyBold(currentLanguage),
          fontFamilyRegular: getFontFamilyRegular(currentLanguage),
        });
      });
    }

    componentWillUnmount() {
      if (this.unsubscribeStore) this.unsubscribeStore();
    }

    formatTimeDistance(start, end) {
      const { currentLanguage } = this.state;
      let locale;

      switch (currentLanguage) {
        case 'ar':
          locale = dateFnsArSa;
          break;
        case 'de':
          locale = dateFnsDe;
          break;
        case 'el':
          locale = dateFnsEl;
          break;
        case 'es':
          locale = dateFnsEs;
          break;
        case 'fi':
          locale = dateFnsFi;
          break;
        case 'fr':
          locale = dateFnsFr;
          break;
        case 'it':
          locale = dateFnsIt;
          break;
        case 'ja':
          locale = dateFnsJa;
          break;
        case 'nl':
          locale = dateFnsNl;
          break;
        case 'pl':
          locale = dateFnsPl;
          break;
        case 'ro':
          locale = dateFnsRo;
          break;
        case 'ru':
          locale = dateFnsRu;
          break;
        case 'si':
          locale = dateFnsEnUs;
          break;
        case 'tr':
          locale = dateFnsTr;
          break;
        case 'uk':
          locale = dateFnsUk;
          break;
        case 'zh':
          locale = dateFnsZhCn;
          break;
        default:
          locale = dateFnsEnUs;
      }

      // TODO: remove!!
      // locale = dateFnsArSa;

      return formatDistance(start, end, { locale });
    }

    __i18n(text, language) {
      let translationLanguage = language;
      let translationMessages;

      if (!translationLanguage) {
        const { currentLanguage, messages } = this.state;

        translationLanguage = currentLanguage;
        translationMessages = messages;
      }

      return __(text, translationLanguage, translationMessages);
    }

    render() {
      const { forwardedRef, ...props } = this.props;
      const { currentLanguage, fontFamilyBold, fontFamilyRegular, isRTL: isRTLState } = this.state;

      return (
        /* eslint-disable react/jsx-props-no-spreading */
        <WrappedComponent
          {...{ ...props, currentLanguage }}
          formatTimeDistance={this.formatTimeDistance}
          fontFamilyBold={fontFamilyBold}
          fontFamilyRegular={fontFamilyRegular}
          isRTL={isRTLState}
          ref={forwardedRef}
          __={this.__i18n}
        />
        /* eslint-enable react/jsx-props-no-spreading */
      );
    }
  }

  I18n.contextType = ReactReduxContext;

  return React.forwardRef((props, ref) => {
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    return <I18n {...props} forwardedRef={ref} />;
  });
};

export default withI18n;
