import UilBookOpen from '@iconscout/react-native-unicons/icons/uil-book-open';
import UilHeartMedical from '@iconscout/react-native-unicons/icons/uil-heart-medical';
import UilShareAlt from '@iconscout/react-native-unicons/icons/uil-share-alt';
import UilUserPlus from '@iconscout/react-native-unicons/icons/uil-user-plus';
import React from 'react';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const TabNavigationItem = withI18n(
  withViewportUnits(({ isFocused, key, onPress, routeName, vw, __ }) => {
    // noinspection JSUnresolvedFunction
    const styles = StyleSheet.create({
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
        borderRadius: vw(2.3),
        height: vw(13),
        justifyContent: 'center',
        marginBottom: vw(1.5),
        width: vw(13),
      },
      navigationItemIconWrapperFocused: {
        backgroundColor: COLOR_PRIMARY,
      },
      navigationItemText: {
        fontFamily: 'JetBrainsMono-Regular',
        fontSize: vw(2.8),
        textAlign: 'center',
        textTransform: 'lowercase',
      },
    });

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

    const NavigationIcon = (props) => {
      /* eslint-disable react/jsx-props-no-spreading */
      switch (routeName) {
        case 'Directory':
          return <UilUserPlus {...props} />;
        case 'Dashboard':
          return <UilBookOpen {...props} />;
        case 'Share':
          return <UilShareAlt {...props} />;
        case 'Tips':
          return <UilHeartMedical {...props} />;
        default:
          return null;
      }
      /* eslint-enable react/jsx-props-no-spreading */
    };

    return (
      <TouchableOpacity key={key} onPress={onPress} style={styles.navigationItem}>
        <View
          style={{ ...styles.navigationItemIconWrapper, ...(isFocused && styles.navigationItemIconWrapperFocused) }}>
          <NavigationIcon size={vw(8)} color={isFocused ? '#ffffff' : '#000000'} />
        </View>
        <Text numberOfLines={1} style={styles.navigationItemText}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  })
);

const AppNavigatorTabBar = withI18n(
  withViewportUnits(({ state, descriptors, navigation, vw, __ }) => {
    // noinspection JSUnresolvedFunction
    const styles = StyleSheet.create({
      navigationBar: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        height: vw(22),
        justifyContent: 'space-evenly',
      },
    });

    return (
      <View style={styles.navigationBar}>
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
  })
);

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
    <Tab.Screen component={screens.Tips} name={'Tips'} />
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
