import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PhotoGuessingArea from '../components/GameScreen/PhotoGuessingArea';
import {colors, commonStyles} from '../styles/commonStyles';
import BottomNavbar from '../components/BottomNavbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TownSelector from '../components/GameScreen/TownSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [currentTown, setCurrentTown] = useState(null); // set the town through route.params when Community screen is implemented.
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () =>
  {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId !== null)
      {
        setUserId(storedUserId);
        console.log(storedUserId);
      }
    } catch (error)
    {
      console.log("Error retrieving userId: ", error);
    }
  }

  return (
    <View style={commonStyles.screenContainer}>
        <SafeAreaView style={styles.gameScreenContainer}>
            <View style={styles.townHeader}>
                <Text style={styles.headerText}>
                    Town Name
                </Text>
                <TouchableOpacity style={styles.townButton}>
                    {/* <Text>Switch Towns?</Text> */}
                </TouchableOpacity>
            </View>
            <View style={styles.gameContainer}>
            <PhotoGuessingArea
                photoUrl={photoUri ? photoUri : null}
                townId={currentTown ? currentTown.id : null}
            />
            </View>
      {/* ) : (
        <Text>Loading...</Text>
      )} */}
      {/* {!currentTown && (
        <TouchableOpacity onPress={() => navigation.navigate('TownsScreen')}>
          <Text style={styles.link}>Go find some towns</Text>
        </TouchableOpacity>
      )} */}
      </SafeAreaView>
      <BottomNavbar navigation={navigation} userId={userId} />
    </View>
  );
};

const styles = StyleSheet.create({
    gameScreenContainer: {
        flex: 1,
    },
    townHeader: {
        marginTop:10,
        paddingTop: '10%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: 350,
        marginBottom: 10,
        flexDirection: 'row',
    },
    headerText: {
        fontFamily: 'Londrina-Solid',
        fontSize: 30,
    },
    townButton: {
        backgroundColor: colors.olive,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius: 10,
    },
    gameContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});

export default GameScreen;