import AsyncStorage from '@react-native-community/async-storage';
import applyMiddleware from 'redux/src/applyMiddleware';
import compose from 'redux/src/compose';
import createStore from 'redux/src/createStore';
import persistStore from 'redux-persist/es/persistStore';
import purgeStoredState from 'redux-persist/es/purgeStoredState';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { reducers } from './redux';

const storeConfig = {
  blacklist: ['app', 'day', 'export', 'i18n'],
  key: 'coronika',
  stateReconciler: autoMergeLevel2,
  storage: AsyncStorage,
  timeout: 0,
  whitelist: ['dashboard', 'directory', 'settings', 'welcome'],
};

const purgeStore = async () => {
  await purgeStoredState(storeConfig);
};

export const configureStore = (initialState = {}) => {
  const reducer = persistCombineReducers(storeConfig, { ...reducers });
  // noinspection JSUnresolvedVariable
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // noinspection JSCheckFunctionSignatures
  const enhancer = composeEnhancers(applyMiddleware(thunk));

  // noinspection JSCheckFunctionSignatures
  const store = createStore(reducer, initialState, enhancer);

  const persistor = persistStore(store, null, () => {
    store.getState();
  });

  window.purgeStore = async () => {
    await purgeStore();
  };

  return { persistor, store };
};

export default configureStore;
