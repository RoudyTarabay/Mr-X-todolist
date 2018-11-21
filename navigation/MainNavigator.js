import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';

import ListsScreen from '../screens/ListsScreen';
import SingleListScreen from '../screens/SingleListScreen';




const ProfileStack = createStackNavigator({
  ProfileStack: ProfileScreen
});



ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-key'
      }
    />
  ),
};

const ListsStack = createStackNavigator({
  ListsStack: ListsScreen,
});

ListsStack.navigationOptions = {
  tabBarLabel: 'Lists',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-log-in'}
    />
  ),
};

const bottomNav2=createBottomTabNavigator({
  ProfileStack,
  ListsStack,
});


export default bottomNav2;