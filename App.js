import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import LandingScreen from './screens/LandingScreen';
import LoginPage from './screens/LoginPage.js';
import RegisterPage from './screens/RegisterPage.js';
import GameScreen from './screens/GameScreen.js';
import ImageHandleScreen from './screens/ImageHandleScreen.js';
import TownsScreen from './screens/TownsScreen.js';
import { useFonts, LondrinaSolid_400Regular, LondrinaSolid_900Black, LondrinaSolid_300Light } from '@expo-google-fonts/londrina-solid';
import * as SplashScreen from 'expo-splash-screen';
import BottomNavbar from './components/BottomNavbar.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
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

export default function App() {
  const [fontsLoaded] = useFonts({
    'Londrina-Solid': LondrinaSolid_400Regular,
    'Londrina-Solid-Light': LondrinaSolid_300Light,
    'Londrina-Solid-Bold': LondrinaSolid_900Black,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    console.log("Testing, just in case");
    if (savedLogin) { handleLogin() }
  }, []);

  // filler for now so I don't have to keep logging in.
  const savedLogin = async () =>
  {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId !== null)
      {
        return true;
      }
      
      return false;
    } catch (error)
    {
      console.log("Error retrieving userId: ", error);
    }
  }

  // TODO: When JWT is implemented, define useEffect to check if there is an active token
  // saved on the device to automatically log them in.

  const AppStack = () => (
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
        <Stack.Screen name="Login">
          {(props) => <LoginPage {...props} onLogin= {handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={RegisterPage}/>
      </Stack.Group>
    </Stack.Navigator>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      { isAuthenticated ? <AuthStack /> : <AppStack /> }
    </NavigationContainer>
  );
}


