import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useFonts, LondrinaSolid_400Regular, LondrinaSolid_900Black, LondrinaSolid_300Light } from '@expo-google-fonts/londrina-solid';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigation from './components/Navigation/AppNavigation.js';
import AuthNavigation from './components/Navigation/AuthNavigation.js';
import { navigationRef } from './components/Navigation/RootNavigation.js';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Londrina-Solid': LondrinaSolid_400Regular,
    'Londrina-Solid-Light': LondrinaSolid_300Light,
    'Londrina-Solid-Bold': LondrinaSolid_900Black,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log('saved login: ', storedUserId);
      if (storedUserId !== null)
      {
        setIsAuthenticated(true);
      }
      else
      {
        setIsAuthenticated(false);
      }
    } catch (error)
    {
      console.log("Error retrieving userId: ", error);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = () =>
  {
    setIsAuthenticated(false);
  }

  useEffect(() => {
    console.log("Testing, just in case");
    handleLogin();
  }, []);

  const savedLogin = async () =>
  {
    console.log('SAVED LOGIN');
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log('saved login: ', storedUserId);
      if (storedUserId !== null)
      {
        return true;
      }
      
      return false;
    } catch (error)
    {
      console.log("Error retrieving userId: ", error);
      return false;
    }
  }

  // TODO: When JWT is implemented, define useEffect to check if there is an active token
  // saved on the device to automatically log them in.

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      { isAuthenticated ? <AppNavigation handleLogout={handleLogout} /> : <AuthNavigation handleLogin={handleLogin} /> }
    </NavigationContainer>
  );
}


