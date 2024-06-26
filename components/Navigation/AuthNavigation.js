import React from 'react';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import LandingScreen from '../../screens/LandingScreen';
import LoginPage from '../../screens/LoginPage.js';
import RegisterPage from '../../screens/RegisterPage.js';
import EmailVerificationScreen from '../../screens/EmailVerificationScreen.js';

const Stack = createStackNavigator();

const AuthNavigation = ({ handleLogin }) => (
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
        <Stack.Screen name="Login" options={{ gestureResponseDistance: 500 }}>
          {(props) => <LoginPage {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={RegisterPage}/>
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen}/>
      </Stack.Group>
    </Stack.Navigator>
  );

export default AuthNavigation;