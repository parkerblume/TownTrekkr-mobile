import React, { useEffect } from 'react';
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
        // a bunch of null checks because things keep breaking!!!
        if (dateString)
        {
            const dateObj = new Date(dateString);
            if (!isNaN(dateObj.getTime()))
            {
                const day = dateObj.getDate();
                const month = dateObj.getMonth() + 1;
                const year = dateObj.getFullYear();
                const today = new Date();
                if (day === today.getDate())
                {
                    return "today";
                }

                return month + "/" + day + "/" + year;
            }
        }

        return 'date N/A';
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
            return response.name;
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    // postTitle: item.title,
    //   town: item.town,
    //   distanceAway: guesses[index].distanceAway,
    //   hasLiked: guesses[index].hasLiked,
    //   hasDisLiked: guesses[index].hasDisLiked,
    //   date: item.createdAt,

    useEffect(() => {
        if (guessObject)
        {
            const {postTitle, town, distanceAway, hasLiked, hasDisliked, date} = guessObject;
            setTownId(town || '');
            setHasLiked(hasLiked || false);
            setHasDisliked(hasDisliked || false);
            setDistance(Math.round(distanceAway) || 0);
            setTitle(postTitle ? truncateTitle(postTitle) : '');
            setDate(formatDate(date));
        }
    }, [guessObject]);

    useEffect(() => {
        if (townId)
        {
            fetchTownName(townId || '').then((name) => {
                setTownName(name ? truncateTown(name) : '');
            });
        }
    }, [townId])

    return (        
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{title || 'No post title'}</Text>
            <View style={styles.titleContainer}>
                <Text style={styles.boldText}>in town: </Text>
                <Text style={styles.itemText}>{townName || 'No town name'}</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.boldText}>posted: </Text>
                <Text style={styles.itemText}>
                    {date}
                </Text>
            </View>
            <Text style={hasLiked ? styles.boldText : styles.itemText}>
                {hasLiked ? "Liked!" : hasDisliked ? "Disliked..." : "No rating"}
            </Text>
            <View style={styles.titleContainer}>
                <Text style={styles.boldText}>Distance off: </Text>
                <Text style={styles.itemText}>{distance || 0}m</Text>
            </View>
        </View>        
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 150,
        height: 110,
        backgroundColor: 'white',
        opacity: 0.5,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 1,
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 18,
        fontFamily: 'Londrina-Solid',
    },
    titleContainer: {
        flexDirection: 'row',
    },
    boldText: {
        fontFamily: 'Londrina-Solid',
        fontSize: 18,
    },
    itemText: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 18,
    },
    item: {
        fontSize: 18,
        fontFamily: 'Londrina-Solid-Light',
        marginTop: '0%',
        marginLeft: '5%',
    },    
});

export default GuessBox;