import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/commonStyles';


const GuessBox = ({title, distance, hasLiked, hasDisliked, date}) => {
    
    const formatDate = (dateString) => {
        // console.log("Date: " + dateString);
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        const today = new Date();
        if (day === today.getDate()) {
            return "Today";
        }
        return month + "/" + day + "/" + year;
    }

    return (
        <>
            <View style={{width: 150, height: 100, backgroundColor: 'white', opacity: 0.5, borderRadius: 10, marginRight: 10, borderWidth: 1}}>
                <Text style={hasLiked ? styles.likedItem : styles.item}>{title ? title : 'No post title'}</Text>
                <Text style={hasLiked ? styles.likedItem : styles.item}>Distance: {distance ? Math.round(distance) : 0}m</Text>
                <Text style={hasLiked ? styles.likedItem : styles.item}>{hasLiked ? "Liked!" : (hasDisliked ? "Disliked..." : '')}</Text>
                <Text style={hasLiked ? styles.likedItem : styles.item}>Posted: {formatDate(date)}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        fontSize: 18,
        fontFamily: 'Londrina-Solid-Light',
        marginTop: '0%',
        marginLeft: '5%',
    },    
    likedItem: {
        fontSize: 18,
        fontFamily: 'Londrina-Solid',
        marginTop: '0%',
        marginLeft: '5%',
    }
});

export default GuessBox;