import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {colors, commonStyles} from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const NoPlayingTownHandle = ({navigation, userId}) =>
{
    return (
        <View style={commonStyles.screenContainer}>
            <SafeAreaView style={styles.townHeader} edges={['top']}>
            <View style={styles.infoContainer}>
            <Text style={styles.headerText}>
                Hold on!
            </Text>
            <MaterialIcons name="nordic-walking" size={100} color={colors.dark_brown} />
            <View style={styles.textContainer}>
                <Text style={styles.textField}>
                You have to be trekk'n a town to post a photo!
                </Text>
                <TouchableOpacity style={styles.townButton} onPress={() => navigation.navigate("TownsScreen", { userId })}>
                <Text style={styles.buttonText}>Tap here to go find a town!</Text>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
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
        elevation: 10,
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

export default NoPlayingTownHandle;