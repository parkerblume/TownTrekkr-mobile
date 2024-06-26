import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { useIsFocused } from "@react-navigation/native";
import { Tooltip } from 'react-native-elements';

const LifetimeStatisticsComponent = ({userId, guesses}) => {

    

    const [totalGuesses, setTotalGuesses] = React.useState(0);
    const [perfectGuesses, setPerfectGuesses] = React.useState(0);
    const [percentPerfect, setPercentPerfect] = React.useState(0);
    const [averageDistance, setAverageDistance] = React.useState(0);

    const isFocused = useIsFocused();

    React.useEffect(() => {
        //console.log("Is focused in lifetime");
        //console.log("guesses: " + guesses);
        setTotalGuesses(getTotalGuesses());
        setPerfectGuesses(getPerfectGuesses());
        setPercentPerfect(getPercentPerfect());
        setAverageDistance(getAverageDistance());
    }, [guesses, isFocused]);

    const getTotalGuesses = () => {
        if (guesses) {
            return guesses.length;
        }
        return 0;
    }

    const getPerfectGuesses = () => {
        if (!guesses || guesses.length === 0) return 0;

        let perfectGuesses = 0;
        for (let i = 0; i < guesses.length; i++)
        {
            if (guesses[i].distanceAway < 100)
            {
                perfectGuesses++;
            }
        }
        return perfectGuesses;
    }

    const getPercentPerfect = () => {
        if (!guesses || guesses.length === 0) return 0;

        const temp = (getPerfectGuesses() / getTotalGuesses()) * 100;

        return Math.round(temp * 100) / 100;
    }

    // Rounds to the nearest whole number
    const getAverageDistance = () => {
        if (!guesses || guesses.length === 0) return 0;

        let totalDistance = 0;
        for (let i = 0; i < guesses.length; i++)
        {
            totalDistance += (guesses[i].distanceAway ? guesses[i].distanceAway : 0);
        }

        const temp = (totalDistance / getTotalGuesses());

        return Math.round(temp);
    }

    return (
        <View style={styles.lifetimeStatContainer}>
            <View style={styles.statsContainer}>
                <View style={styles.statRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.lifetimeStatTitle}>Percent Perfect:</Text>
                        <Text style={styles.lifetimeStatValue}>{percentPerfect}%</Text>
                    </View>
                    <View style={styles.statItem}>
                        <View style={styles.tooltipContainer}>
                            <Text style={styles.lifetimeStatTitle}>Perfect Guesses:</Text>
                            <Tooltip
                                popover={<Text style={styles.infoText}>All guesses made within 100m</Text>}
                                width={250}
                                style={{borderWidth: 3}}
                                backgroundColor={colors.faded_tan}
                                overlayColor='transparent'
                                containerStyle={styles.tooltipContainerStyle}
                            >
                                <View style={styles.infoIcon}>
                                    <Text style={styles.infoIconText}>i</Text>
                                </View>
                            </Tooltip>
                        </View>
                        <Text style={styles.lifetimeStatValue}>{perfectGuesses}</Text>
                    </View>
                </View>

                <View style={styles.statRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.lifetimeStatTitle}>Average Distance Off:</Text>
                        <Text style={styles.lifetimeStatValue}>{averageDistance}m</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.lifetimeStatTitle}>Total Guesses:</Text>
                        <Text style={styles.lifetimeStatValue}>{totalGuesses}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.lifetimeTitle}>Lifetime Statistics</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    lifetimeStatContainer: {
        width: '100%',
        backgroundColor: colors.tan,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        marginTop: '12%',
        marginRight: '25%',
        paddingVertical: '5%',
        paddingLeft: '20%',
        borderWidth: 1,
        flex: 1,
      },
      statsContainer: {
        flexDirection: 'column',
        paddingRight: '20%',
        paddingBottom: Platform.OS === 'ios'? 0 : '5%',
      },
      statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '2%',
      },
      tooltipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      tooltipContainerStyle: {
        borderWidth: 1
      },
      infoIcon: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.faded_tan,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
      },
      infoText: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 17,
      },
      infoIconText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
      },
      lifetimeStatTitle: {
        fontSize: 16,
        fontFamily: 'Londrina-Solid'
      },
      lifetimeStatValue: {
        fontSize: 44,
        fontFamily: 'Londrina-Solid-Light'
      },
      textContainer: {
        flexGrow: 1,
        width: '100%',
      },
      lifetimeTitle: {
        fontSize: 38,
        fontFamily: 'Londrina-Solid',
      },
});

export default LifetimeStatisticsComponent;