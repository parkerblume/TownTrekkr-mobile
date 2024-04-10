import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/commonStyles';


const GuessBox = ({title, score, hasLiked}) => {


    return (
        <>
            <View style={{width: 100, height: 80, backgroundColor: 'white', opacity: 0.5, borderRadius: 10, marginRight: 10, borderWidth: 1}}>
                <Text style={hasLiked ? styles.likedItem : styles.item}>{title}</Text>
                <Text style={hasLiked ? styles.likedItem : styles.item}>Score: {score ? Math.round(score) : 0}</Text>
                <Text style={hasLiked ? styles.likedItem : styles.item}>{hasLiked ? "Liked!" : ''}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        fontSize: 18,
        fontFamily: 'Londrina-Solid-Light',
        marginTop: '10%',
        marginLeft: '8%',
    },    
    likedItem: {
        fontSize: 18,
        fontFamily: 'Londrina-Solid',
        marginTop: '5%',
        marginLeft: '10%',
    }
});

export default GuessBox;