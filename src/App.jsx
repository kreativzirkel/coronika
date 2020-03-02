import UilBookOpen from '@iconscout/react-native-unicons/icons/uil-book-open';
import UilShareAlt from '@iconscout/react-native-unicons/icons/uil-share-alt';
import UilUserPlus from '@iconscout/react-native-unicons/icons/uil-user-plus';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import screens from './components/screens';

const styles = StyleSheet.create({
  navigationItemIcon: {
    color: '#000000',
  },
  navigationItemIconFocused: {
    color: '#ffffff',
  },
  navigationItemIconWrapper: {
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    marginBottom: 5,
    width: 60,
  },
  navigationItemIconWrapperFocused: {
    backgroundColor: '#17d9bd',
  },
  navigationItemText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 11,
    textAlign: 'center',
    textTransform: 'lowercase',
  },
});

/*
const ScannerNavigator = createSwitchNavigator(
  {
    Scanner: {
      screen: screens.Scanner,
    },
    RedemptionForm: {
      screen: screens.RedemptionForm,
    },
  },
  {
    initialRouteName: 'Scanner',
  }
);
 */

const AppNavigator = createBottomTabNavigator(
  {
    Contacts: {
      screen: screens.Contacts,
    },
    Home: {
      screen: screens.Home,
    },
    Share: {
      screen: screens.Share,
    }
  /*
    Scanner: {
      screen: ScannerNavigator,
    },*/,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName, key } = navigation.state;

        const onPress = () => {
          if (!focused) {
            navigation.navigate(routeName);
          }
        };

        const NavigationIcon = (props) => {
          switch (routeName) {
            case 'Contacts':
              return <UilUserPlus {...props} />;
            case 'Home':
              return <UilBookOpen {...props} />;
            case 'Share':
              return <UilShareAlt {...props} />;
            default:
              return null;
          }
        };

        return (
          <TouchableOpacity onPress={onPress}>
            <View
              style={{ ...styles.navigationItemIconWrapper, ...(focused && styles.navigationItemIconWrapperFocused) }}>
              <NavigationIcon size={35} color={focused ? '#ffffff' : '#000000'} />
            </View>
            <Text style={styles.navigationItemText}>{routeName}</Text>
          </TouchableOpacity>
        );
      },
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
        color: '#000000',
        height: 120,
      },
    },
  }
);

export default createAppContainer(AppNavigator);
