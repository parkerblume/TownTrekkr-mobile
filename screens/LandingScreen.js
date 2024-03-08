import React, { useCallback, useRef } from 'react';
import { View, Text, Button, SafeAreaView, Pressable } from 'react-native';
//import SpinningEarth from './SpinningEarth';
import { useNavigation } from '@react-navigation/native';
import { colors, commonStyles } from '../styles/commonStyles';
import { pageStyles } from '../styles/landingPageStyles';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
//import SpinningEarth from '../components/SpinningEarth';
import SpinningEarth from '../components/SpinningEarth';



const LandingScreen = () => {
  const navigation = useNavigation();

  const navigateToRegister = () => {
    navigation.navigate('Register');
  }

  const navigateToLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={commonStyles.screenContainer}>
      <View style={pageStyles.earthContainer}>
        <View style={pageStyles.glView}>
          <SpinningEarth />
        </View>
      </View>
      <View style={pageStyles.boxContainer}>
        <View style={pageStyles.headerContainer}>
          <Text style={{ fontSize: 70, color: colors.dark_brown, fontFamily: 'Londrina-Solid' }}>Town </Text>
          <Text style={{ fontSize: 70, color: colors.dark_green, fontFamily: 'Londrina-Solid' }}>Trekkr</Text>
        </View>
        <View style={pageStyles.cardContainer}>
          <View style={pageStyles.cardTitle}>
            <Text style={{fontSize: 45, color: colors.dark_brown, fontFamily: 'Londrina-Solid' }}>
              Welcome Adventurer,
            </Text>
            <Text style={{fontSize: 25, color: colors.dark_green, fontFamily: 'Londrina-Solid'}}>
              Build or join a community to guess local spots around your area.
            </Text>
          </View>
          <View style={pageStyles.cardFooter}>
            <View style={pageStyles.cardButtons}>
              <Pressable style={[pageStyles.button]} onPress={navigateToRegister}>
                <Text style={{fontSize: 20, color: colors.tan, fontFamily: 'Londrina-Solid'}}>
                  Start trekking!
                </Text>
              </Pressable>
              <Pressable style={[pageStyles.button]} onPress={navigateToLogin}>
                <Text style={{fontSize: 20, color: colors.tan, fontFamily: 'Londrina-Solid'}}>
                  Log In!
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LandingScreen;
