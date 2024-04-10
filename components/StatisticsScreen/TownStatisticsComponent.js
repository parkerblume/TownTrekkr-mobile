import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { getTowns } from '../../api/authAPI.js';
import { getGuesses } from '../../api/postAPI.js';
import { getPostById } from '../../api/postAPI.js';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';




const TownStatisticsComponent = ({userId, guesses}) => {


    const [towns, setTowns] = React.useState([]);
    const [currentTown, setCurrentTown] = React.useState('');
    // const [guesses, setGuesses] = React.useState([]);
    const [townGuesses, setTownGuesses] = React.useState([]);

    const [value, setValue] = React.useState(null);


    React.useEffect(() => {

        const fetchTownGuesses = async () => {

            try {
                for (let i = 0; i < guesses.length; i++)
                {
                    const post = await getPostById(guesses[i].post);
                    //const post = await getPostById("65fdeee45b02344bf39c7715");
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
                
                if (towns.length > 0) {
                    console.log("First town: " + towns[0].name);
                    setCurrentTown(towns[0].name);
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

    const getTotalGuesses = () => {
        if (townGuesses) {
            return townGuesses.length;
        }
        return 0;
    }

    const getPerfectGuesses = () => {
        if (!townGuesses) return 0;

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
        if (!townGuesses) return 0;
        return (getPerfectGuesses() / getTotalGuesses()) * 100;
    }

    const getAverageScore = () => {
        if (!townGuesses) return 0;

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
                    data={towns}
                    maxHeight={300}
                    labelField="name"
                    valueField="_id"
                    placeholder={currentTown}
                    value={value}
                    onChange={item => {
                        setValue(item.label);
                    }}
                />
                <Text style={styles.statTitle}> Statistics</Text>



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
                        {/* <Text style={styles.statValue}>{getPercentPerfect()}</Text>
                        <Text style={styles.statValue}>{getGuesses()}</Text>
                        <Text style={styles.statValue}>{getTotalGuesses()}</Text>
                        <Text style={styles.statValue}>{getAverageScore()}</Text> */}
                        <Text style={styles.statValue}>-</Text>
                        <Text style={styles.statValue}>-</Text>
                        <Text style={styles.statValue}>-</Text>
                        <Text style={styles.statValue}>-</Text>

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
        marginTop: '15%',
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
        marginLeft: '2%',
        color: 'black',
    },
    statTitle: {
        fontSize: 36,
        fontFamily: 'Londrina-Solid',
        marginLeft: '10%',
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