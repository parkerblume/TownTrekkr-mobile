import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/commonStyles';


const GuessBox = ({title, likes, dislikes}) => {


    return (
        <>
            <View style={{width: 75, height: 75, backgroundColor: 'white', opacity: 0.5, borderRadius: 10, marginRight: 10, borderWidth: 1}}>
                <Text>{title}</Text>
                <Text>Likes: {likes}</Text>
                <Text>Dislikes: {dislikes}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    
});

export default GuessBox;