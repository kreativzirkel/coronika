import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import screens from './components/screens';
import configureStore from './createStore';

const InitialNavigator = createSwitchNavigator(
  {
    Splash: screens.Splash,
    App: App,
  },
  {
    initialRouteName: 'Splash',
  }
);

const Navigator = createAppContainer(InitialNavigator);

export default () => {
  const { persistor, store } = configureStore();

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </PersistGate>
  );
};
