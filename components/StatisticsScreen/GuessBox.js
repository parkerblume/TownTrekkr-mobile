import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/commonStyles';


const GuessBox = ({title, score, hasLiked, hasDisliked, date}) => {

    const formatDate = (dateString) => {
        // console.log("Date: " + dateString);
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        return month + "/" + day + "/" + year;
    }

    return (
        <>
            <View style={{width: 100, height: 100, backgroundColor: 'white', opacity: 0.5, borderRadius: 10, marginRight: 10, borderWidth: 1}}>
                <Text style={hasLiked ? styles.likedItem : styles.item}>{title}</Text>
                <Text style={hasLiked ? styles.likedItem : styles.item}>Score: {score ? Math.round(score) : 0}</Text>
                <Text style={hasLiked ? styles.likedItem : styles.item}>{hasLiked ? "Liked!" : (hasDisliked ? "Disliked..." : '')}</Text>
                <Text style={hasLiked ? styles.likedItem : styles.item}>Post created:{formatDate(date)}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        fontSize: 18,
        fontFamily: 'Londrina-Solid-Light',
        marginTop: '0%',
        marginLeft: '10%',
    },    
    likedItem: {
        fontSize: 18,
        fontFamily: 'Londrina-Solid',
        marginTop: '0%',
        marginLeft: '10%',
    }
});

export default GuessBox;