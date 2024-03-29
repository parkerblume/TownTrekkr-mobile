import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PhotoGuessingArea from '../components/GameScreen/PhotoGuessingArea';
import {colors, commonStyles} from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const GameScreen = ({ navigation }) => {
  const [currentTown, setCurrentTown] = useState(null); // set the town through route.params when Community screen is implemented.
  const [photoUri, setPhotoUri] = useState(null);

  return (
    <View style={commonStyles.screenContainer}>
        <SafeAreaView style={styles.gameScreenContainer} edges={['top']}>
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
      {/* <BottomNavbar navigation={navigation} userId={userId} /> */}
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