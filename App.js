import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import LandingScreen from './screens/LandingScreen';
import LoginPage from './screens/LoginPage.js';
import RegisterPage from './screens/RegisterPage.js';
<<<<<<< HEAD
=======
import LandingPage from './screens/LandingPage.js';
import StatisticsPage from './screens/StatisticsPage.js';
import RecentGuessesPage from './screens/RecentGuessesPage.js';
>>>>>>> mobile-david

const Stack = createStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // load the proper fonts before continuing.
  useEffect(() => {

    async function loadFonts() {
      await Font.loadAsync({
        'Londrina-Solid': require('./assets/fonts/Londrina_Solid/LondrinaSolid-Regular.ttf'),
        'Londrina-Solid-Bold': require('./assets/fonts/Londrina_Solid/LondrinaSolid-Black.ttf'),
        'Londrina-Solid-Reg': require('./assets/fonts/Londrina_Solid/LondrinaSolid-Regular.ttf'),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Statistics" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginPage}/>
        <Stack.Screen name="Register" component={RegisterPage}/>
        <Stack.Screen name="Landing" component={LandingPage}/>
        <Stack.Screen name="Statistics" component={StatisticsPage}/>
        <Stack.Screen name="RecentGuesses" component={RecentGuessesPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


