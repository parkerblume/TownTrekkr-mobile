import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { getGuesses } from '../../api/postAPI.js';

const LifetimeStatisticsComponent = ({userId}) => {
    const [guesses, setGuesses] = React.useState([]);


    React.useEffect(() => {
        const fetchGuesses = async () => {
            try {
                const response = await getGuesses(userId);
                setGuesses(response); 
            } catch (error) {
                console.error('Error fetching guesses:', error);
            }
        };

        fetchGuesses();
    }, []);

    const getTotalGuesses = () => {
        if (guesses) {
            return guesses.length;
        }
        return 0;
    }

    const getPerfectGuesses = () => {
        if (!guesses) return 0;

        let perfectGuesses = 0;
        for (let i = 0; i < guesses.length; i++)
        {
            if (guesses[i].score > 1000)
            {
                perfectGuesses++;
            }
        }
        return perfectGuesses;
    }

    const getPercentPerfect = () => {
        if (!guesses) return 0;
        return (getPerfectGuesses() / getTotalGuesses()) * 100;
    }

    const getAverageScore = () => {
        if (!guesses) return 0;

        let totalScore = 0;
        for (let i = 0; i < guesses.length; i++)
        {
            totalScore += guesses[i].score;
        }
        return totalScore / getTotalGuesses();
    }

    return (
        <>
            {/* Lifetime Statistics Area */}
            <View style={styles.lifetimeStatContainer}>

                {/* Row 1 */}
                <View style={styles.lifetimeRow1Container}>
                {/* Col 1 */}
                <View style={{marginRight: 40}}>
                    <Text style={styles.lifetimeStatValue}>{getPercentPerfect()}%</Text>
                    <Text style={styles.lifetimeStatTitle}>Percent Perfect</Text>
                </View>
                {/* Col 2 */}
                <View>
                <Text style={styles.lifetimeStatValue}>{getPerfectGuesses()}</Text>
                    <Text style={styles.lifetimeStatTitle}>Perfect Guesses</Text>
                </View>
                </View>


                {/* Row 2 */}
                <View style={styles.lifetimeRow2Container}>
                {/* Col 1 */}
                <View style={{marginRight: 40}}>
                    <Text style={styles.lifetimeStatValue}>{getAverageScore()}</Text>
                    <Text style={styles.lifetimeStatTitle}>Average Score</Text>
                </View>
                {/* Col 2 */}
                <View>
                    <Text style={styles.lifetimeStatValue}>{getTotalGuesses()}</Text>
                    <Text style={styles.lifetimeStatTitle}>Total Guesses</Text>
                </View>
                </View>

                <Text style={styles.lifetimeTitle}>Lifetime Statistics</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    lifetimeStatContainer: {
        width: 350,
        height: 350,
        backgroundColor: colors.tan,
        borderRadius: 50,
        marginTop: '15%',
        marginRight: '25%',
        borderWidth: 1,
      },
      lifetimeRow1Container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: '10%',
      },
      lifetimeRow2Container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 30,
      },
      lifetimeStatTitle: {
        fontSize: 16,
        fontFamily: 'Londrina-Solid'
      },
      lifetimeStatValue: {
        fontSize: 44,
        fontFamily: 'Londrina-Solid-Light'
      },
      lifetimeTitle: {
        fontSize: 38,
        fontFamily: 'Londrina-Solid',
        marginLeft: '20%',
        marginTop: '10%',
      },
});

export default LifetimeStatisticsComponent;