import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhotoGuessingArea from './PhotoGuessingArea';
import {colors, commonStyles} from '../../styles/commonStyles';

const GameComponent = ({ currentTown }) =>
{
    const [photoUri, setPhotoUri] = useState(null);

    return (
        <SafeAreaView style={styles.gameScreenContainer} edges={['top', 'left', 'right']}>
            <View style={styles.townHeader}>
                <Text style={styles.headerText}>
                    {currentTown ? currentTown.name : "Couldn't get town name..."}
                </Text>
            </View>
            <View style={styles.gameContainer}>
                <PhotoGuessingArea
                    photoUrl={photoUri ? photoUri : null}
                    townId={currentTown ? currentTown.id : null}
                />
            </View>
      </SafeAreaView>
    );
}

export default GameComponent;

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
    gameContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    }
});