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
import GameScreen from './screens/GameScreen.js';
import ImageHandleScreen from './screens/ImageHandleScreen.js';
import TownsScreen from './screens/TownsScreen.js';

const Stack = createStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // load the proper fonts before continuing.
  useEffect(() => {

    async function loadFonts() {
      await Font.loadAsync({
        'Londrina-Solid': require('./assets/fonts/Londrina_Solid/LondrinaSolid-Regular.ttf'),
        'Londrina-Solid-Bold': require('./assets/fonts/Londrina_Solid/LondrinaSolid-Black.ttf'),
        'Londrina-Solid-Light': require('./assets/fonts/Londrina_Solid/LondrinaSolid-Light.ttf'),
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
      <Stack.Navigator
        initialRouteName='Landing' 
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}>
        <Stack.Group>
          <Stack.Screen name="Landing" component={LandingScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{'presentation': 'modal'}}>
          <Stack.Screen name="Login" component={LoginPage}/>
          <Stack.Screen name="Register" component={RegisterPage}/>
        </Stack.Group>
        {/* move to an authenticated stack file when authentication is implemented */}
        <Stack.Group>
          <Stack.Screen name="GameScreen" component={GameScreen} />
          <Stack.Screen name="ImageHandle" component={ImageHandleScreen} />
          <Stack.Screen name="TownsScreen" component={TownsScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


