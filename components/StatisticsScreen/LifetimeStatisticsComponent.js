import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/commonStyles';

const LifetimeStatisticsComponent = ({userId, guesses}) => {
    //const [guesses, setGuesses] = React.useState([]);
    const [totalGuesses, setTotalGuesses] = React.useState(0);
    const [perfectGuesses, setPerfectGuesses] = React.useState(0);
    const [percentPerfect, setPercentPerfect] = React.useState(0);
    const [averageDistance, setAverageDistance] = React.useState(0);

    React.useEffect(() => {
        setTotalGuesses(getTotalGuesses());
        setPerfectGuesses(getPerfectGuesses());
        setPercentPerfect(getPercentPerfect());
        setAverageDistance(getAverageDistance());
    }, [guesses]);

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
            if (guesses[i].distance < 100)
            {
                perfectGuesses++;
            }
        }
        return perfectGuesses;
    }

    const getPercentPerfect = () => {
        if (!guesses) return 0;

        const temp = (getPerfectGuesses() / getTotalGuesses()) * 100;

        return Math.round(temp * 100) / 100;
    }

    // Rounds to the nearest whole number
    const getAverageDistance = () => {
        if (!guesses || guesses.length === 0) return 0;

        let totalDistance = 0;
        for (let i = 0; i < guesses.length; i++)
        {
            totalDistance += (guesses[i].distance ? guesses[i].distance : 0);
        }
        //console.log("Total Score: " + totalScore + " Total Guesses: " + getTotalGuesses());

        const temp = (totalDistance / getTotalGuesses());

        return Math.round(temp);
    }

    return (
        <>
            {/* Lifetime Statistics Area */}
            <View style={styles.lifetimeStatContainer}>

                {/* Row 1 */}
                <View style={styles.lifetimeRow1Container}>
                    {/* Col 1 */}
                    <View>
                        <Text style={styles.lifetimeStatValue}>{percentPerfect}%</Text>
                        <Text style={styles.lifetimeStatTitle}>Percent Perfect</Text>
                    </View>
                    {/* Col 2 */}
                    <View style={{marginLeft: '16%'}}>
                        <Text style={styles.lifetimeStatValue}>{perfectGuesses}</Text>
                        <Text style={styles.lifetimeStatTitle}>Perfect Guesses</Text>
                    </View>
                </View>


                {/* Row 2 */}
                <View style={styles.lifetimeRow2Container}>
                    {/* Col 1 */}
                    <View>
                        <Text style={styles.lifetimeStatValue}>{averageDistance}m</Text>
                        <Text style={styles.lifetimeStatTitle}>Average Distance Off</Text>
                    </View>
                    {/* Col 2 */}
                    <View style={{marginLeft: '8%'}}>
                        <Text style={styles.lifetimeStatValue}>{totalGuesses}</Text>
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
        width: '100%',
        height: '50%',
        backgroundColor: colors.tan,
        borderRadius: 50,
        marginTop: '12%',
        marginRight: '25%',
        borderWidth: 1,
      },
      lifetimeRow1Container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: '8%',
        marginLeft: '4%',
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
        marginTop: '8%',
      },
});

export default LifetimeStatisticsComponent;