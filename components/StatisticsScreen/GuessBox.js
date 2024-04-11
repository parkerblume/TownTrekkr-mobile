import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { getTownById } from '../../api/authAPI.js';


const GuessBox = ({guessObject, key}) => {

    const [townId, setTownId] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [date, setDate] = React.useState('');
    const [hasLiked, setHasLiked] = React.useState(false);
    const [hasDisliked, setHasDisliked] = React.useState(false);
    const [distance, setDistance] = React.useState(0);

    
    const [townName, setTownName] = React.useState('');

    const formatDate = (dateString) => {
        // console.log("Date: " + dateString);
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        const today = new Date();
        if (day === today.getDate()) {
            return "today";
        }
        return month + "/" + day + "/" + year;
    }

    const truncateTitle = (str) => {
        return str.length > 19 ? str.substring(0, 19) + "..." : str;
    }

    const truncateTown = (str) => {
        return str.length > 9 ? str.substring(0, 9) + "..." : str;
    }

    const fetchTownName = async (id) => {


        try {
            const response = await getTownById(id);
            // console.log("townname: " + response.name);
            return response.name;
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    React.useEffect(() => {
        const {town, postTitle, date, hasLiked, hasDisliked, distanceAway} = guessObject;
        setTownId(town);
        setHasLiked(hasLiked);
        setHasDisliked(hasDisliked);

        setDistance(Math.round(distanceAway));
        setTitle(truncateTitle(postTitle));
        setDate(formatDate(date));

        let name = fetchTownName(town);
        name = truncateTown(name);
        setTownName(name);
        console.log("name: " + name);
    }, [guessObject]);

    return (        
        <View style={{width: 150, height: 100, backgroundColor: 'white', opacity: 0.5, borderRadius: 10, marginRight: 10, borderWidth: 1}} key={key}>
            <Text style={styles.title}>{title ? title : 'No post title'}</Text>
            <Text style={styles.item}><Text style={styles.title}>in town: </Text>{townName ? townName : 'No town name'}</Text>
            <Text style={styles.item}><Text style={styles.title}>posted: </Text>{date ? date : '-'}</Text>
            <Text style={hasLiked ? styles.title : styles.item}>{hasLiked ? "Liked!" : (hasDisliked ? "Disliked..." : 'No rating')}</Text>
            <Text style={styles.item}><Text style={styles.title}>Distance off: </Text>{distance ? distance : 0}m</Text>
        </View>        
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