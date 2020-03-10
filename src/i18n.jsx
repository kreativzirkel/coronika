import moment from 'moment';
import de from 'moment/locale/de';
import en from 'moment/locale/en-gb';
import React from 'react';
import { ReactReduxContext } from 'react-redux';
/* eslint-disable camelcase */
import de_DE from './assets/translations/de_DE';
import en_US from './assets/translations/en_US';
/* eslint-enable camelcase */
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './constants';

const getMessages = (language) => {
  const messages = {};

  if (SUPPORTED_LANGUAGES.includes(language)) {
    let messagesList;
    switch (language) {
      case 'de':
        messagesList = de_DE.locale_data.messages;
        break;
      case 'en':
        messagesList = en_US.locale_data.messages;
        break;
    }

    if (messagesList) {
      Object.keys(messagesList).forEach((key) => {
        if (key.length > 0) {
          messages[key] = messagesList[key].find((value) => value && value.length > 0);
        }
      });
    }
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
          case 'de':
            moment.updateLocale('de', de);
            break;
          default:
            moment.updateLocale('en', en);
        }

        return { ...state, currentLanguage: action.language, messages };
      }

      return state;
    }

    default:
      return state;
  }
};

const withI18n = (WrappedComponent) => {
  class I18n extends React.Component {
    unsubscribeStore;

    constructor(props) {
      super(props);

      this.state = {
        currentLanguage: DEFAULT_LANGUAGE,
      };
    }

    componentDidMount() {
      const {
        store: { dispatch, getState, subscribe },
      } = this.context;
      const {
        i18n: { currentLanguage },
      } = getState();

      this.unsubscribeStore = subscribe(() => {
        const { i18n } = getState();
        this.setState({ ...i18n });
      });

      dispatch({ type: 'CHANGE_LANGUAGE_I18N', language: currentLanguage });
    }

    componentWillUnmount() {
      if (this.unsubscribeStore) this.unsubscribeStore();
    }

    /* eslint-disable-next-line no-underscore-dangle */
    __(text) {
      const { currentLanguage, messages } = this.state;

      if (!SUPPORTED_LANGUAGES.includes(currentLanguage)) {
        return text;
      }

      return messages?.[text] || text;
    }

    render() {
      const { forwardedRef, ...props } = this.props;
      const { currentLanguage } = this.state;

      return (
        /* eslint-disable no-underscore-dangle,react/jsx-props-no-spreading */
        <WrappedComponent {...{ ...props, currentLanguage }} ref={forwardedRef} __={(text) => this.__(text)} />
        /* eslint-enable no-underscore-dangle,react/jsx-props-no-spreading */
      );
    }
  }

  I18n.contextType = ReactReduxContext;

  return React.forwardRef((props, ref) => {
    return <I18n {...props} forwardedRef={ref} />;
  });
};

export default withI18n;
