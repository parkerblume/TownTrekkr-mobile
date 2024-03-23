import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {colors, commonStyles} from '../../styles/commonStyles';

const MyTownsComponent = ({ navigation, userId }) => {
    // go look for the user's communities through a useEffect probably

    const handlePlayCommunity = (townId) => {
        console.log("This is where we would transfer to the game screen");
        //navigation.navigate('GameScreen', { townId });
    };
  
    return (
        <View>
            {/* TODO: Map a view that will be a town, with a view and play button */}
            <Text> Eventually map their town across</Text>
            <TouchableOpacity onPress={() => handlePlayCommunity()}>
                <Text>Play</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MyTownsComponent;