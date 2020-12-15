import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';
import { Appearance, Dimensions, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import * as RNLocalize from 'react-native-localize';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { setColorScheme as setColorSchemeApp, setScreenDimensions } from './components/App/actions';
import App from './components/App/logic';
import screens from './components/screens';
import { COLOR_PRIMARY, SUPPORTED_LANGUAGES } from './constants';
import configureStore from './createStore';
import { changeLanguage, __ } from './i18n';
import withColorScheme from './utils/withColorScheme';

enableScreens();

const styles = StyleSheet.create({
  appNavigatorWrapper: {
    flex: 1,
  },
  appNavigatorWrapperInner: {
    bottom: 0,
    height: '50%',
    left: 0,
    right: 0,
    position: 'absolute',
    width: '100%',
    zIndex: -1,
  },
  loading: {
    backgroundColor: COLOR_PRIMARY,
    height: '100%',
    width: '100%',
  },
});

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    headerMode={'none'}
    initialRouteName={'App'}
    mode={'card'}
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    }}>
    <Stack.Screen component={App} name={'App'} />
    <Stack.Screen component={screens.About} name={'About'} />
    {Platform.OS === 'ios' && (
      <Stack.Screen component={screens.BjoernSteigerFoundation} name={'BjoernSteigerFoundation'} />
    )}
    <Stack.Screen component={screens.Day} name={'Day'} />
    <Stack.Screen component={screens.Encounter} name={'Encounter'} />
    <Stack.Screen component={screens.Export} name={'Export'} />
    <Stack.Screen component={screens.Legal} name={'Legal'} />
    <Stack.Screen component={screens.Menu} name={'Menu'} />
    <Stack.Screen component={screens.Settings} name={'Settings'} />
    <Stack.Screen component={screens.TipAmIInfected} name={'TipAmIInfected'} />
    <Stack.Screen component={screens.TipAvoidCrowdsOfPeople} name={'TipAvoidCrowdsOfPeople'} />
    <Stack.Screen component={screens.TipCoronaWarnApp} name={'TipCoronaWarnApp'} />
    <Stack.Screen component={screens.TipCoughingSneezing} name={'TipCoughingSneezing'} />
    <Stack.Screen component={screens.TipDistanceAndMouthguard} name={'TipDistanceAndMouthguard'} />
    <Stack.Screen component={screens.TipMouthguard} name={'TipMouthguard'} />
    <Stack.Screen component={screens.TipNotFeelingWell} name={'TipNotFeelingWell'} />
    <Stack.Screen component={screens.TipReliableSources} name={'TipReliableSources'} />
    <Stack.Screen component={screens.TipWashingHands} name={'TipWashingHands'} />
  </Stack.Navigator>
);

const AppNavigatorWrapper = withColorScheme(({ colors }) => (
  <SafeAreaView style={{ ...styles.appNavigatorWrapper, backgroundColor: colors.SECONDARY }}>
    <View style={{ ...styles.appNavigatorWrapperInner, backgroundColor: colors.BACKGROUND }} />

    <AppNavigator />
  </SafeAreaView>
));

const Tab = createBottomTabNavigator();

const InitialNavigator = () => (
  <Tab.Navigator backBehaviour={'none'} initialRouteName={'Splash'} tabBar={() => null}>
    <Tab.Screen component={AppNavigatorWrapper} name={'App'} options={{ gestureEnabled: false }} />
    <Tab.Screen component={screens.Splash} name={'Splash'} />
    <Tab.Screen component={screens.Welcome} name={'Welcome'} />
  </Tab.Navigator>
);

const Loading = () => <View style={styles.loading} />;

class AppContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    const { persistor, store } = configureStore();
    this.persistor = persistor;
    this.store = store;

    const { dispatch } = store;

    /* determine language */
    const bestAvailableLanguage = RNLocalize.findBestAvailableLanguage(SUPPORTED_LANGUAGES);

    if (bestAvailableLanguage) {
      dispatch(changeLanguage(bestAvailableLanguage.languageTag.substring(0, 2)));
    }

    /* determine color scheme */
    const scheme = Appearance.getColorScheme() || 'light';

    dispatch(setColorSchemeApp(scheme));

    /* determine screen dimensions */
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    dispatch(setScreenDimensions(screenHeight, screenWidth));

    this.appearanceListener = this.appearanceListener.bind(this);

    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(false);
      KeyboardManager.setKeyboardDistanceFromTextField(0);
      KeyboardManager.setPreventShowingBottomBlankSpace(false);
      KeyboardManager.setEnableAutoToolbar(true);
      KeyboardManager.setToolbarDoneBarButtonItemText(__('Done'));
      KeyboardManager.setToolbarManageBehaviour(0);
      KeyboardManager.setToolbarPreviousNextButtonEnable(false);
      KeyboardManager.setShouldToolbarUsesTextFieldTintColor(true);
      KeyboardManager.setShouldShowToolbarPlaceholder(false);
      KeyboardManager.setOverrideKeyboardAppearance(false);
      KeyboardManager.setShouldResignOnTouchOutside(true);
    }
  }

  componentDidMount() {
    Appearance.addChangeListener(this.appearanceListener);

    Dimensions.addEventListener('change', (newDimensions) => {
      const { dispatch } = this.store;

      const screenHeight = newDimensions.window.height;
      const screenWidth = newDimensions.window.width;

      dispatch(setScreenDimensions(screenHeight, screenWidth));
    });
  }

  componentWillUnmount() {
    Appearance.removeChangeListener(this.appearanceListener);

    Dimensions.removeEventListener('change', () => {});
  }

  appearanceListener() {
    const { dispatch, getState } = this.store;

    const {
      app: { colorScheme: appColorScheme },
    } = getState();

    const scheme = Appearance.getColorScheme() || appColorScheme || 'light';

    dispatch(setColorSchemeApp(scheme));
  }

  render() {
    return (
      <PersistGate loading={<Loading />} persistor={this.persistor}>
        <Provider store={this.store}>
          <NavigationContainer>
            <InitialNavigator />
          </NavigationContainer>
        </Provider>
      </PersistGate>
    );
  }
}

export default AppContainer;
