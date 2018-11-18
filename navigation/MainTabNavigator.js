import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RegistrationScreen from '../screens/RegistrationScreen';

import LoginScreen from '../screens/LoginScreen';




const RegistrationStack = createStackNavigator({
  RegistrationStack: RegistrationScreen,
});

RegistrationStack.navigationOptions = {
  tabBarLabel: 'Register',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LoginStack = createStackNavigator({
  Links: LoginScreen,
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};



export default createBottomTabNavigator({
  RegistrationStack,
  LoginStack,
});
