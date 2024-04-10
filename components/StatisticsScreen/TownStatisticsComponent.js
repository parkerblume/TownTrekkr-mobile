import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { getTowns } from '../../api/authAPI.js';
import { getGuesses } from '../../api/postAPI.js';
import { getPostById } from '../../api/postAPI.js';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';




const TownStatisticsComponent = ({userId, guesses, allPosts}) => {


    const [towns, setTowns] = React.useState([]);
    const [currentTown, setCurrentTown] = React.useState('');
    // const [guesses, setGuesses] = React.useState([]);
    const [townGuesses, setTownGuesses] = React.useState([]);



    React.useEffect(() => {
        const fetchTowns = async () => {
            try {
                const response = await getTowns(userId);

                setTowns(response); 

                if (response.length > 0) {
                    console.log("First town: " + response[0].name);
                    setCurrentTown(response[0].name);
                }
                else {
                    setCurrentTown('Choose a town');
                }
            } catch (error) {
                console.error('Error fetching towns:', error);
            }
        };

        fetchTowns();        

    }, []);

    React.useEffect(() => {
        console.log("Updating town guesses for town: " + currentTown.name);
        console.log("ID for town: " + currentTown._id);


        const fetchTownGuesses = async () => {            
            for (let i = 0; i < guesses.length; i++)
            {
                console.log("Checking town: " + allPosts[i].town);
                if (allPosts[i].town === currentTown.name)
                {
                    setTownGuesses([...townGuesses, guesses[i]]);
                }
            }

        };

        fetchTownGuesses();
    }, [currentTown]);



    const getTotalGuesses = () => {
        if (townGuesses) {
            return townGuesses.length;
        }
        return 0;
    }

    const getPerfectGuesses = () => {
        if (!townGuesses || townGuesses.length === 0) return 0;

        let perfectGuesses = 0;
        for (let i = 0; i < townGuesses.length; i++)
        {
            if (townGuesses[i].score > 1000)
            {
                perfectGuesses++;
            }
        }
        return perfectGuesses;
    }

    const getPercentPerfect = () => {
        if (!townGuesses || townGuesses.length === 0) return 0;

        const temp = (getPerfectGuesses() / getTotalGuesses()) * 100;

        return Math.round(temp * 100) / 100;
    }

    const getAverageScore = () => {
        if (!townGuesses || townGuesses.length === 0) return 0;

        let totalScore = 0;
        for (let i = 0; i < townGuesses.length; i++)
        {
            totalScore += townGuesses[i].score;
        }
        return totalScore / getTotalGuesses();
    }


    return (
        <>

            <SafeAreaView style={styles.container}>

                <Dropdown
                    style={styles.dropdownBox}
                    placeholderStyle={styles.boxTitle}
                    selectedTextStyle={styles.boxTitle}
                    containerStyle={{backgroundColor: colors.tan, borderColor: 'black', borderWidth: 1, borderRadius: 15}}
                    itemTextStyle={{fontFamily: 'Londrina-Solid', color: 'black', fontSize: 28}}
                    activeColor={colors.tan}
                    data={towns}
                    maxHeight={300}
                    labelField="name"
                    valueField="_id"
                    placeholder={currentTown}
                    value={currentTown}
                    onChange={item => {
                        setCurrentTown(item);
                    }}
                />
                <Text style={styles.statTitle}>Statistics</Text>



                {/* Town Statistics */}
                <View style={styles.statRowContainer}>
                    {/* Col 1 */}
                    <View >
                        <Text style={styles.statName}>Percent Perfect:</Text>
                        <Text style={styles.statName}>Perfect Guesses:</Text>
                        <Text style={styles.statName}>Total Guesses:</Text>
                        <Text style={styles.statName}>Average Score:</Text>
                    </View>
                    {/* Col 2 */}
                    <View style={{marginLeft: '20%'}}>
                        <Text style={styles.statValue}>{getPercentPerfect()}</Text>
                        <Text style={styles.statValue}>{getPerfectGuesses()}</Text>
                        <Text style={styles.statValue}>{getTotalGuesses()}</Text>
                        <Text style={styles.statValue}>{getAverageScore()}</Text>
                    </View>
                </View>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '30%',
        backgroundColor: colors.tan,
        borderRadius: 50,
        marginLeft: '30%',
        borderWidth: 1,
        paddingBottom: '5%',
        marginTop: '11%',
    },
    dropdownBox: {
        width: '70%',
        height: 50,
        flex: 1,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: '10%',
        marginTop: '5%',
    },
    boxTitle: {
        fontSize: 36,
        fontFamily: 'Londrina-Solid',
        marginLeft: '3%',
        color: 'black',
    },
    statTitle: {
        fontSize: 36,
        fontFamily: 'Londrina-Solid',
        marginLeft: '12%',
    },
    statRowContainer: {
        flexDirection: 'row',
        marginTop: '3%',
        marginLeft: '12%',
        width: '100%',
    },
    statName: {
        fontSize: 24,
        fontFamily: 'Londrina-Solid',
    },
    statValue: {
        fontSize: 24,
        textAlign: 'right',
        fontFamily: 'Londrina-Solid-Light',
    },
});

export default TownStatisticsComponent;