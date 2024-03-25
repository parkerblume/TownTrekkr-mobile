import React from 'react';
import GameScreen from './screens/GameScreen.js';
import ImageHandleScreen from './screens/ImageHandleScreen.js';
import TownsScreen from './screens/TownsScreen.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavbar from './components/BottomNavbar.js';

const Tab = createBottomTabNavigator();

const AuthNavigation = () => (
  <Tab.Navigator
    tabBar={(props) => <BottomNavbar {...props} />}     
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName='GameScreen'
  >
    <Tab.Screen name="GameScreen" component={GameScreen} />
    <Tab.Screen name="ImageHandle" component={ImageHandleScreen} />
    <Tab.Screen name="TownsScreen" component={TownsScreen} />
  </Tab.Navigator>
);

export default AuthNavigation;