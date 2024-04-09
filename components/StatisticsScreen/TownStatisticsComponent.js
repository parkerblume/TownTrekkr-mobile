import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { getTowns } from '../../api/authAPI.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGuesses } from '../../api/postAPI.js';
import { getPostById } from '../../api/postAPI.js';



const TownStatisticsComponent = ({userId}) => {

    // const test = async () => {
    //     let data = await getTowns(userId);
    //     data.map(data => <Text>{JSON.stringify(data.name)}</Text>);
    // }
    // const towns = getTowns(userId);

    const [towns, setTowns] = React.useState([]);
    const [currentTown, setCurrentTown] = React.useState('');
    const [guesses, setGuesses] = React.useState([]);
    const [townGuesses, setTownGuesses] = React.useState([]);


    React.useEffect(() => {

        const fetchTownGuesses = async () => {

            try {
                const response = await getGuesses(userId);
                setGuesses(response);
                //console.log("number of guesses: " + guesses.length);
                //console.log(guesses);

                for (let i = 0; i < guesses.length; i++)
                {
                    //console.log("post id: " + guesses[i].post);
                    const post = await getPostById(guesses[i].post);
                    //const post = await getPostById("65fdeee45b02344bf39c7715");

                    //console.log("post town name: " + post.town);
                    //console.log("town: " + post.town);
                    if (post.town === currentTown)
                    {
                        setTownGuesses([...townGuesses, guesses[i]]);
                    }
                }
            } catch (error) {
                console.error('Error fetching town guesses:', error);
            }
        };

        fetchTownGuesses();
    }, [currentTown]);


    React.useEffect(() => {
        const fetchTowns = async () => {
            try {
                const response = await getTowns(userId);
                setTowns(response); 
            } catch (error) {
                console.error('Error fetching towns:', error);
            }
        };

        fetchTowns();
    }, []);

    const getTownName = () => {
        if (towns.length > 0) {
            setCurrentTown(towns[0].name);
        } 
        else {
            setCurrentTown('No Towns Found');
        }
    }



    return (
        <>


            {/* <Text style={{marginTop: 40}}>UserID: {userId}</Text>
            {towns.map((town, index) => (
                <View key={index}>
                    <Text>{town.name}</Text>
                </View>
            ))} */}
            {/* Town Statistics Area */}
            <SafeAreaView style={styles.townStatContainer}>
                    
                    {/* TODO: ADD DROP DOWN SELECTOR */}
                    <View style={styles.townStatTitleContainer}>
                        <Text style={styles.townStatDropdownTitle}>{currentTown}</Text>
                        <Text style={styles.townStatStatisticsTitle}> Statistics</Text>
                    </View>

                    {/* Town Statistics */}
                    <View style={styles.townStatRowContainer}>
                        {/* Col 1 */}
                        <View style={{marginRight: 40}}>
                            <Text style={styles.townStatStatName}>Percent Perfect:</Text>
                            <Text style={styles.townStatStatName}>Perfect Guesses:</Text>
                            <Text style={styles.townStatStatName}>Total Guesses:</Text>
                            <Text style={styles.townStatStatName}>Average Score:</Text>
                        </View>
                        {/* Col 2 */}
                        <View>
                            <Text style={styles.townStatStatValue}>-</Text>
                            <Text style={styles.townStatStatValue}>-</Text>
                            <Text style={styles.townStatStatValue}>-</Text>
                            <Text style={styles.townStatStatValue}>-</Text>
                        </View>
                    </View>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    townStatContainer: {
      width: '100%',
      height: 'auto',
      backgroundColor: colors.tan,
      borderRadius: 50,
      marginLeft: '30%',
      borderWidth: 1,
      paddingBottom: '5%',
    },
    townStatTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginRight: '15%',
      marginTop: '6%',
    },
    townStatDropdownTitle: {
      fontSize: 36,
      fontFamily: 'Londrina-Solid',
    },
    townStatStatisticsTitle: {
      fontSize: 36,
      fontFamily: 'Londrina-Solid',
    },
    townStatRowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: '3%',
      marginRight: '16%',
    },
    townStatStatName: {
      fontSize: 24,
      fontFamily: 'Londrina-Solid',
    },
    townStatStatValue: {
      fontSize: 24,
      textAlign: 'right',
      fontFamily: 'Londrina-Solid-Light',
    },
});

export default TownStatisticsComponent;