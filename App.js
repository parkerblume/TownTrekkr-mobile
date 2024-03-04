import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import LoginPage from './screens/LoginPage.js';

// const Stack = createStackNavigator();

export default function App() {
  return (
    <LoginPage />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

    // <NavigationContainer>
    //   <Stack.Navigator>          
    //     <Stack.Screen
    //       name="Login" 
    //       component={LoginPage} 
    //       options = {{title: 'Login'}}/>

        
    //   </Stack.Navigator>
    // </NavigationContainer>