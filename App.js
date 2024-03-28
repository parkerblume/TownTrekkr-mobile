import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import LoginPage from './screens/LoginPage.js';
import RegisterPage from './screens/RegisterPage.js';
import LandingPage from './screens/LandingPage.js';
import StatisticsPage from './screens/StatisticsPage.js';
import RecentGuessesPage from './screens/RecentGuessesPage.js';

const Stack = createStackNavigator();

export default function App() {
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


