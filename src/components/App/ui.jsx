import UilBookOpen from '@iconscout/react-native-unicons/icons/uil-book-open';
import UilHeartMedical from '@iconscout/react-native-unicons/icons/uil-heart-medical';
import UilShareAlt from '@iconscout/react-native-unicons/icons/uil-share-alt';
import UilUserPlus from '@iconscout/react-native-unicons/icons/uil-user-plus';
import React from 'react';
import { Platform, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../../constants';
import withI18n from '../../i18n';
import withViewportUnits from '../../utils/withViewportUnits';
import screens from '../screens';

const onShare = async (message) => {
  try {
    const result = await Share.share({
      message,
      title: 'coronika',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    // error
  }
};

const Tab = createBottomTabNavigator();

class TabNavigationItemClass extends React.Component {
  constructor(props) {
    super(props);

    this.NavigationIconComponent = null;

    switch (this.props.routeName) {
      case 'Directory':
        this.NavigationIconComponent = UilUserPlus;
        break;
      case 'Dashboard':
        this.NavigationIconComponent = UilBookOpen;
        break;
      case 'Share':
        this.NavigationIconComponent = UilShareAlt;
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
    },
    navigationItemIcon: {
      color: '#000000',
    },
    navigationItemIconFocused: {
      color: '#ffffff',
    },
    navigationItemIconWrapper: {
      alignItems: 'center',
      backgroundColor: COLOR_SECONDARY,
      borderRadius: this.props.vw(2.3),
      height: this.props.vw(13),
      justifyContent: 'center',
      marginBottom: this.props.vw(1.5),
      width: this.props.vw(13),
    },
    navigationItemIconWrapperFocused: {
      backgroundColor: COLOR_PRIMARY,
    },
    navigationItemText: {
      fontFamily: this.props.getFontFamilyRegular(),
      fontSize: this.props.vw(2.8),
      textAlign: 'center',
      textTransform: 'lowercase',
    },
  });

  render() {
    const { isFocused, key, onPress, routeName, vw, __ } = this.props;

    let label;

    switch (routeName) {
      case 'Directory':
        label = __('navigation.directory.label');
        break;
      case 'Dashboard':
        label = __('navigation.dashboard.label');
        break;
      case 'Share':
        label = __('navigation.share.label');
        break;
      case 'Tips':
        label = __('navigation.tips.label');
        break;
      default:
        label = routeName;
    }

    const NavigationIcon = this.NavigationIconComponent;

    return (
      <TouchableOpacity key={key} onPress={onPress} style={this.styles.navigationItem}>
        <View
          style={{
            ...this.styles.navigationItemIconWrapper,
            ...(isFocused && this.styles.navigationItemIconWrapperFocused),
          }}>
          <NavigationIcon size={vw(8)} color={isFocused ? '#ffffff' : '#000000'} />
        </View>
        <Text numberOfLines={1} style={this.styles.navigationItemText}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const TabNavigationItem = withI18n(withViewportUnits(TabNavigationItemClass));

class AppNavigatorTabBarClass extends React.Component {
  constructor(props) {
    super(props);
  }

  styles = StyleSheet.create({
    navigationBar: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'row',
      height: this.props.vw(22),
      justifyContent: 'space-evenly',
    },
  });

  render() {
    const { state, navigation, __ } = this.props;

    return (
      <View style={this.styles.navigationBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { name: routeName } = route;

          const onPress = () => {
            if (routeName === 'Share') {
              // noinspection JSIgnoredPromiseFromCall
              onShare(__('app.share.message'));
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
              onPress={onPress}
              routeName={routeName}
            />
          );
        })}
      </View>
    );
  }
}

const AppNavigatorTabBar = withI18n(withViewportUnits(AppNavigatorTabBarClass));

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
    {Platform.OS !== 'ios' && <Tab.Screen component={screens.Tips} name={'Tips'} />}
    <Tab.Screen component={screens.Directory} name={'Directory'} />
    <Tab.Screen
      component={screens.Dashboard}
      name={'Dashboard'}
      // options={({ route }) => ({ tabBarVisible: isTabBarVisibleOnDashboard(route) })}
    />
    <Tab.Screen component={View} name={'Share'} />
  </Tab.Navigator>
);

const App = () => <AppNavigator />;

export default App;
