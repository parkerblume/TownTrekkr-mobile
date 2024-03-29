import React from 'react';
import GameScreen from '../../screens/GameScreen.js';
import ImageHandleScreen from '../../screens/ImageHandleScreen.js';
import TownsScreen from '../../screens/TownsScreen.js';
import StatisticsPage from '../../screens/StatisticsPage.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavbar from '../../components/Navigation/BottomNavbar.js';

const Tab = createBottomTabNavigator();

const AppNavigation = () => (
  <Tab.Navigator
    tabBar={(props) => <BottomNavbar {...props} />}     
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName='GameScreen'
  >
    <Tab.Screen name="GameScreen" component={GameScreen} />
    <Tab.Screen name="StatsScreen" component={StatisticsPage} />
    <Tab.Screen name="ImageHandle" component={ImageHandleScreen} />
    <Tab.Screen name="TownsScreen" component={TownsScreen} />
  </Tab.Navigator>
);

export default AppNavigation;