import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { getTowns } from '../../api/authAPI.js';
import { getGuesses } from '../../api/postAPI.js';
import { getPostById } from '../../api/postAPI.js';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';




const TownStatisticsComponent = ({userId}) => {


    const [towns, setTowns] = React.useState([]);
    const [currentTown, setCurrentTown] = React.useState('');
    const [guesses, setGuesses] = React.useState([]);
    const [townGuesses, setTownGuesses] = React.useState([]);

    const [value, setValue] = React.useState(null);


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

                if (towns.length > 0) {
                    setCurrentTown(towns[0].name);
                }
                else {
                    setCurrentTown('-');
                }
            } catch (error) {
                console.error('Error fetching towns:', error);
            }
        };

        fetchTowns();
        

    }, []);


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
                    placeholder={value ? value : currentTown}
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
                    <View style={{marginLeft: '15%'}}>
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
        width: '60%',
        height: 50,
        flex: 2,
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