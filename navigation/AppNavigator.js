import React from 'react';
import { createSwitchNavigator ,createAppContainer} from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import SingleListScreen from '../screens/SingleListScreen';

import bottomNav1 from './AuthNavigator';
import bottomNav2 from './MainNavigator'; 
const nav = StackNavigator({
  SingleList: { screen: SingleListScreen }
});


export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: bottomNav1,
  App: bottomNav2,
  Nav: nav

},
{
	initialRouteName: 'Auth',

});

