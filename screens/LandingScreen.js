import React, { useCallback, useRef, useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, Pressable } from 'react-native';
//import SpinningEarth from './SpinningEarth';
import { useNavigation } from '@react-navigation/native';
import { colors, commonStyles } from '../styles/commonStyles';
import { pageStyles } from '../styles/landingPageStyles';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
//import SpinningEarth from '../components/SpinningEarth';
import SpinningEarth from '../components/SpinningEarth';
import { Animated, Easing, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';


const LandingScreen = () => {
  const navigation = useNavigation();
  const [isUserOnPage, setIsUserOnPage] = useState(true);
  const heightContainer = useSharedValue(0);

  // shows 3d model on focus
  useEffect(() => {
    const onFocus = navigation.addListener('focus', () => {
      setIsUserOnPage(true);
    });

    return onFocus;
  }, [navigation]);

  // hides 3d model on blur
  useEffect(() => {
    const onBlur = navigation.addListener('blur', () => {
      setIsUserOnPage(false);
    });

    return onBlur;
  }, [navigation]);

  const config = {
    duration: 500,
    easing: Easing.ease(1)
  }

  const setCardHeight = (height) => {
    heightContainer.value = height;
    console.log(heightContainer.value);
  }

  const animate = useAnimatedStyle

  const navigateToRegister = () => {
    setIsUserOnPage(false);
    // Animated.timing(animation, {
    //   toValue: 1,
    //   duration: 500, // in ms
    //   useNativeDriver: true,
    // }).start(() => {
    //   navigation.navigate('Register');
    // });
    navigation.navigate('Register');
  }

  const navigateToLogin = () => {
    setIsUserOnPage(false);
    // Animated.timing(animation, {
    //   toValue: 1,
    //   duration: 500, // in ms
    //   easing: Easing.ease,
    //   useNativeDriver: false,
    // }).start(() => {
    //   navigation.navigate('Login');
    // });

    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={commonStyles.screenContainer}>
      <View style={pageStyles.earthContainer}>
        <View style={pageStyles.glView}>
          {isUserOnPage ? <SpinningEarth /> : ""}
        </View>
      </View>
      <View style={pageStyles.boxContainer}>
        <View style={pageStyles.headerContainer}>
          <Text style={{ fontSize: 70, color: colors.dark_brown, fontFamily: 'Londrina-Solid' }}>Town </Text>
          <Text style={{ fontSize: 70, color: colors.dark_green, fontFamily: 'Londrina-Solid' }}>Trekkr</Text>
        </View>
        <View style={pageStyles.cardContainer} onLayout={(event) => {
                                     setCardHeight(event.nativeEvent.layout.height);
                                      }}>
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
    </SafeAreaView>
  );
};

export default LandingScreen;
