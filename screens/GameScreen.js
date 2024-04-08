import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {colors, commonStyles} from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import GameComponent from '../components/GameScreen/GameComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameScreen = ({ navigation, route }) => {
  const userId = route.params?.userId;
  const [currentTown, setCurrentTown] = useState(null);
  
  useEffect(() => {
    const fetchCurrentTown = async () => {
      try {
        // if routed here save that town, otherwise pull from local storage
        const storedTown = await AsyncStorage.getItem('currentTown');
        if (route.params?.currentTown) 
        {
          // has id, name, topLeftCoord, botRightCoord properties
          const { townObject } = route.params.currentTown;
          console.log(townObject);
          setCurrentTown(townObject);
          await AsyncStorage.setItem('currentTown', JSON.stringify(townObject));
        }
        else if (storedTown)
        {
          setCurrentTown(JSON.parse(storedTown));
        }
      } catch (error) {
        console.log('Error retrieving current town from AsyncStorage: ', error);
      }
    }

    fetchCurrentTown();
  }, [route.params?.currentTown]);



  return (
    <View style={commonStyles.screenContainer}>
      {currentTown ? 
        (<GameComponent currentTown={currentTown} />)
        : 
        (
          <SafeAreaView style={styles.townHeader} edges={['top']}>
            <View style={styles.infoContainer}>
              <Text style={styles.headerText}>
                Hold on!
              </Text>
              <MaterialIcons name="nordic-walking" size={100} color={colors.dark_brown} />
              <View style={styles.textContainer}>
                <Text style={styles.textField}>
                  You're currently not trekk'n in a town...
                </Text>
                <TouchableOpacity style={styles.townButton} onPress={() => navigation.navigate("TownsScreen", { userId })}>
                  <Text style={styles.buttonText}>Tap here to go find a town!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
    gameScreenContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    townHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'column',
    },
    headerText: {
      fontFamily: 'Londrina-Solid-Bold',
      fontSize: 30,
      color: colors.dark_brown
    },
    infoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20%',
      padding: '10%',
      borderColor: colors.olive,
      borderTopWidth: 3,
      borderBottomWidth: 3,
      shadowColor: colors.dark_brown,
      shadowOpacity: 0.8,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 0 }, 
      backgroundColor: colors.olive,
    },
    textField: {
      fontFamily: 'Londrina-Solid',
      fontSize: 18,
    },
    townButton: {
      backgroundColor: colors.olive,
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      borderRadius: 10,
    },
    buttonText: {
      fontFamily: 'Londrina-Solid-Light',
      fontSize: 15
    }
});

export default GameScreen;