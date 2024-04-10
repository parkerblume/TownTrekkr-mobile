import React from 'react';
import GameScreen from '../../screens/GameScreen.js';
import ImageHandleScreen from '../../screens/ImageHandleScreen.js';
import TownsScreen from '../../screens/TownsScreen.js';
import StatisticsPage from '../../screens/StatisticsPage.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavbar from '../../components/Navigation/BottomNavbar.js';
import ProfileScreen from '../../screens/ProfileScreen.js';

const Tab = createBottomTabNavigator();

const AppNavigation = ({ handleLogout }) => (
  <Tab.Navigator
    tabBar={(props) => <BottomNavbar {...props} handleLogout={handleLogout}  />}     
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName='GameScreen'
  >
    <Tab.Screen name="GameScreen" component={GameScreen} />
    <Tab.Screen name="StatsScreen" component={StatisticsPage} />
    <Tab.Screen name="ImageHandle" component={ImageHandleScreen} />
    <Tab.Screen name="TownsScreen" component={TownsScreen} />
    <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
  </Tab.Navigator>
);

export default AppNavigation;