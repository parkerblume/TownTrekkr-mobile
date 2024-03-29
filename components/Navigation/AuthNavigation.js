import React from 'react';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import LandingScreen from '../../screens/LandingScreen';
import LoginPage from '../../screens/LoginPage.js';
import RegisterPage from '../../screens/RegisterPage.js';

const Stack = createStackNavigator();

const AuthNavigation = ({ onLogin }) => (
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
          {(props) => <LoginPage {...props} onLogin={onLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={RegisterPage}/>
      </Stack.Group>
    </Stack.Navigator>
  );

export default AuthNavigation;