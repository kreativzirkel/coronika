import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App/logic';
import screens from './components/screens';
import configureStore from './createStore';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator headerMode={'none'} initialRouteName={'App'}>
    <Stack.Screen component={App} name={'App'} />
    <Stack.Screen component={screens.AddEntry} name={'AddEntry'} />
    <Stack.Screen component={screens.Day} name={'Day'} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const InitialNavigator = () => (
  <Tab.Navigator backBehaviour={'none'} initialRouteName={'Splash'} tabBar={() => null}>
    <Tab.Screen component={AppNavigator} name={'App'} options={{ gestureEnabled: false }} />
    <Tab.Screen component={screens.Splash} name={'Splash'} />
    <Tab.Screen component={screens.Welcome} name={'Welcome'} />
  </Tab.Navigator>
);

const Navigator = () => (
  <NavigationContainer>
    <InitialNavigator />
  </NavigationContainer>
);

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
