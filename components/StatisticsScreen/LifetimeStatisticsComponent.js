import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/commonStyles';

const LifetimeStatisticsComponent = ({userId}) => {



    const getTotalGuesses = () => {
        return 0;
    }


    return (
        <>
            {/* Lifetime Statistics Area */}
            <View style={styles.lifetimeStatContainer}>

                {/* Row 1 */}
                <View style={styles.lifetimeRow1Container}>
                {/* Col 1 */}
                <View style={{marginRight: 40}}>
                    <Text style={styles.lifetimeStatValue}>-1</Text>
                    <Text style={styles.lifetimeStatTitle}>Percent Perfect</Text>
                </View>
                {/* Col 2 */}
                <View>
                <Text style={styles.lifetimeStatValue}>-1</Text>
                    <Text style={styles.lifetimeStatTitle}>Perfect Guesses</Text>
                </View>
                </View>


                {/* Row 2 */}
                <View style={styles.lifetimeRow2Container}>
                {/* Col 1 */}
                <View style={{marginRight: 40}}>
                    <Text style={styles.lifetimeStatValue}>-1</Text>
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