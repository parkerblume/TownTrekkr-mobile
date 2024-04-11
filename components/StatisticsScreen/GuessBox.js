import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/commonStyles';


const GuessBox = ({title, townName, distance, hasLiked, hasDisliked, date}) => {
    
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

    const truncateTitle = (str) => {
        return str.length > 19 ? str.substring(0, 19) + "..." : str;
    }

    const truncateTown = (str) => {
        return str.length > 9 ? str.substring(0, 9) + "..." : str;
    }

    return (
        <>
            <View style={{width: 150, height: 100, backgroundColor: 'white', opacity: 0.5, borderRadius: 10, marginRight: 10, borderWidth: 1}}>
                <Text style={styles.title}>{title ? truncateTitle(title) : 'No post title'}</Text>
                <Text style={styles.item}><Text style={styles.title}>in town: </Text>{townName ? truncateTown(townName) : 'No town name'}</Text>
                <Text style={styles.item}><Text style={styles.title}>posted: </Text>{date ? formatDate(date) : '-'}</Text>
                <Text style={hasLiked ? styles.title : styles.item}>{hasLiked ? "Liked!" : (hasDisliked ? "Disliked..." : 'No rating')}</Text>
                <Text style={styles.item}><Text style={styles.title}>Distance off: </Text>{distance ? Math.round(distance) : 0}m</Text>
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
    title: {
        fontSize: 18,
        fontFamily: 'Londrina-Solid',
        marginTop: '0%',
        marginLeft: '5%',
    }
});

export default GuessBox;