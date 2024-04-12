import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { getTowns } from '../../api/authAPI.js';
import { getGuesses } from '../../api/postAPI.js';
import { getPostById } from '../../api/postAPI.js';
import { Dropdown } from 'react-native-element-dropdown';
import { useIsFocused } from "@react-navigation/native";
import { getTownById } from '../../api/authAPI.js';



const TownStatisticsComponent = ({userId, guesses, allPosts}) => {


    const [towns, setTowns] = React.useState([]);
    const [currentTown, setCurrentTown] = React.useState('');
    const [townGuesses, setTownGuesses] = React.useState([]);

    const [totalGuesses, setTotalGuesses] = React.useState(0);
    const [perfectGuesses, setPerfectGuesses] = React.useState(0);
    const [percentPerfect, setPercentPerfect] = React.useState(0);
    const [averageDistance, setAverageDistance] = React.useState(0);

    const isFocused = useIsFocused();

    //const [townName, setTownName] = React.useState('');


    const fetchTownName = async (townId) => {
        try {
            const response = await getTownById(townId);
            return response.name;
            //console.log(response.name);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };



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

    }, [isFocused]);

    React.useEffect(() => {
        const fetchTownGuesses = async () => {          
            //console.log('allPosts' + allPosts);  
            let newTownGuesses = [];
            for (let i = 0; i < guesses.length; i++)
            {
                // fetch town name
                const iteratedTownName = await fetchTownName(allPosts[i].town);
                //console.log("Checking town: " + iteratedTownName + " against " + currentTown);
                
                if (iteratedTownName === currentTown)
                {
                    //console.log("Added a guess to this town");
                    newTownGuesses = [...newTownGuesses, guesses[i]];
                }
            }

            setTownGuesses(newTownGuesses);

        };

        fetchTownGuesses();
    }, [currentTown, isFocused]);


    React.useEffect(() => {
        setTotalGuesses(getTotalGuesses());
        setPerfectGuesses(getPerfectGuesses());
        setPercentPerfect(getPercentPerfect());
        setAverageDistance(getAverageDistance());
    }, [townGuesses]);



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
            if (townGuesses[i].distanceAway < 100)
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

    const getAverageDistance = () => {
        if (!townGuesses || townGuesses.length === 0) return 0;

        let totalDistance = 0;
        for (let i = 0; i < townGuesses.length; i++)
        {
            totalDistance += (townGuesses[i].distanceAway ? townGuesses[i].distanceAway : 0);
        }

        const temp = (totalDistance / getTotalGuesses());

        return Math.round(temp);    }


    return (
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
                        setTownGuesses([]);
                        setCurrentTown(item.name);
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
                        <Text style={styles.statName}>Average Distance Off:</Text>
                    </View>
                    {/* Col 2 */}
                    <View style={{marginLeft: '5%'}}>
                        <Text style={styles.statValue}>{percentPerfect}%</Text>
                        <Text style={styles.statValue}>{perfectGuesses}</Text>
                        <Text style={styles.statValue}>{totalGuesses}</Text>
                        <Text style={styles.statValue}>{averageDistance}m</Text>
                    </View>
                </View>

            </SafeAreaView>
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