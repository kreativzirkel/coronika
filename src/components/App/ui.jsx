import UilBookOpen from '@iconscout/react-native-unicons/icons/uil-book-open';
import UilFileExport from '@iconscout/react-native-unicons/icons/uil-file-export';
import UilHeartMedical from '@iconscout/react-native-unicons/icons/uil-heart-medical';
import UilPlus from '@iconscout/react-native-unicons/icons/uil-plus';
import UilUserSquare from '@iconscout/react-native-unicons/icons/uil-user-square';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactReduxContext from 'react-redux/lib/components/Context';
import { COLOR_PRIMARY } from '../../constants';
import withI18n from '../../i18n';
import withColorScheme from '../../utils/withColorScheme';
import withViewportUnits from '../../utils/withViewportUnits';
import screens from '../screens';
import { setTimestamp as setTimestampDay } from '../screens/Day/actions';

const Tab = createBottomTabNavigator();

class TabNavigationItemClass extends React.Component {
  constructor(props) {
    super(props);

    this.NavigationIconComponent = null;

    switch (this.props.routeName) {
      case 'NavigationAddEntry':
        this.NavigationIconComponent = UilPlus;
        break;
      case 'Directory':
        this.NavigationIconComponent = UilUserSquare;
        break;
      case 'Dashboard':
        this.NavigationIconComponent = UilBookOpen;
        break;
      case 'Overview':
        this.NavigationIconComponent = UilFileExport;
        break;
      case 'Tips':
        this.NavigationIconComponent = UilHeartMedical;
        break;
    }
  }

  styles = StyleSheet.create({
    navigationItem: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: this.props.vw(0.5),
      width: this.props.vw(95 / this.props.numberOfItems),
    },
    navigationItemIconWrapper: {
      alignItems: 'center',
      height: this.props.vw(9.5),
      justifyContent: 'center',
      marginBottom: this.props.vw(0.5),
      width: this.props.vw(9.5),
    },
    navigationItemIconWrapperCircle: {
      backgroundColor: COLOR_PRIMARY,
      borderRadius: this.props.vw(5),
    },
    navigationItemText: {
      fontFamily: this.props.fontFamilyRegular,
      fontSize: this.props.vw(2.75),
      textAlign: 'center',
      textTransform: 'lowercase',
    },
  });

  render() {
    const { colors, colorScheme, isFocused, key, onPress, routeName, vw, __ } = this.props;

    let label;

    switch (routeName) {
      case 'NavigationAddEntry':
        label = __('navigation.add-entry.label');
        break;
      case 'Directory':
        label = __('navigation.directory.label');
        break;
      case 'Dashboard':
        label = __('navigation.dashboard.label');
        break;
      case 'Overview':
        label = __('navigation.overview.label');
        break;
      case 'Tips':
        label = __('navigation.tips.label');
        break;
      default:
        label = routeName;
    }

    const NavigationIcon = this.NavigationIconComponent;

    const iconColor = isFocused ? colors.TEXT : colorScheme === 'dark' ? colors.GRAY_2 : colors.GRAY_4;

    const isItemNavigationAddEntry = routeName === 'NavigationAddEntry';

    return (
      <TouchableOpacity key={key} onPress={onPress} style={this.styles.navigationItem}>
        <View
          style={{
            ...this.styles.navigationItemIconWrapper,
            ...(isItemNavigationAddEntry && this.styles.navigationItemIconWrapperCircle),
          }}>
          <NavigationIcon size={vw(9)} color={isItemNavigationAddEntry ? colors.TEXT_ALT : iconColor} />
        </View>
        <Text
          // numberOfLines={1}
          style={{
            ...this.styles.navigationItemText,
            color: colorScheme === 'dark' ? colors.GRAY_2 : colors.GRAY_4,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const TabNavigationItem = withColorScheme(withI18n(withViewportUnits(TabNavigationItemClass)));

class AppNavigatorTabBarClass extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onPressNavigationAddEntry = this.onPressNavigationAddEntry.bind(this);
  }

  onPressNavigationAddEntry() {
    const today = moment().hours(0).minutes(0).seconds(0).milliseconds(0).valueOf();

    const {
      store: { dispatch },
    } = this.context;

    dispatch(setTimestampDay(today));

    this.props.navigation.navigate('Dashboard');
    this.props.navigation.navigate('AddEntry');
  }

  styles = StyleSheet.create({
    navigationBar: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'row',
      height: this.props.vw(20),
      justifyContent: 'space-evenly',
      paddingTop: this.props.vw(2),
    },
  });

  render() {
    const { colors, state, navigation } = this.props;

    return (
      <View style={{ ...this.styles.navigationBar, backgroundColor: colors.BACKGROUND }}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { name: routeName } = route;

          const onPress = () => {
            if (routeName === 'NavigationAddEntry') {
              this.onPressNavigationAddEntry();
            } else if (routeName === 'Dashboard' && isFocused) {
              const subNavigationRouteName = route.state
                ? route.state.routes[route.state.index].name
                : route.params?.screen || 'Dashboard';

              if (subNavigationRouteName !== 'Dashboard') {
                //console.log(descriptors);

                // TODO: reset to dashboard screen if other screen is visible
                navigation.navigate(routeName);
              }
            } else if (!isFocused) {
              navigation.navigate(routeName);
            }
          };

          return (
            <TabNavigationItem
              isFocused={isFocused}
              key={`main-navigation-item-${index}`}
              numberOfItems={state.routes.length}
              onPress={onPress}
              routeName={routeName}
            />
          );
        })}
      </View>
    );
  }
}

AppNavigatorTabBarClass.contextType = ReactReduxContext;

const AppNavigatorTabBar = withColorScheme(withI18n(withViewportUnits(AppNavigatorTabBarClass)));

/*
const isTabBarVisibleOnDashboard = (route) => {
  const routeName = route.state ? route.state.routes[route.state.index].name : route.params?.screen || 'Dashboard';

  return true; // routeName === 'Dashboard';
};
 */

const AppNavigator = () => (
  <Tab.Navigator
    backBehaviour={'none'}
    initialRouteName={'Dashboard'}
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    tabBar={(props) => <AppNavigatorTabBar {...props} />}>
    <Tab.Screen component={screens.Directory} name={'Directory'} />
    <Tab.Screen
      component={screens.Dashboard}
      name={'Dashboard'}
      // options={({ route }) => ({ tabBarVisible: isTabBarVisibleOnDashboard(route) })}
    />
    <Tab.Screen component={View} name={'NavigationAddEntry'} />
    <Tab.Screen component={screens.Overview} name={'Overview'} />
    <Tab.Screen component={screens.Tips} name={'Tips'} />
  </Tab.Navigator>
);

const App = () => <AppNavigator />;

export default App;
