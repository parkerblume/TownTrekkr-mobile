import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/commonStyles';


const TownStatisticsComponent = () => {


    return (
        <>
            {/* Town Statistics Area */}
            <View style={styles.townStatContainer}>

                    {/* TODO: ADD DROP DOWN SELECTOR */}
                    <View style={styles.townStatTitleContainer}>
                        <Text style={styles.townStatDropdownTitle}>TestTown</Text>
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
                            <Text style={styles.townStatStatValue}>8.00%</Text>
                            <Text style={styles.townStatStatValue}>4</Text>
                            <Text style={styles.townStatStatValue}>50</Text>
                            <Text style={styles.townStatStatValue}>500</Text>
                        </View>
                    </View>

                </View>
        </>
    )
}

const styles = StyleSheet.create({
    townStatContainer: {
      width: 375,
      height: 200,
      backgroundColor: colors.tan,
      borderRadius: 50,
      marginTop: '15%',
      marginLeft: '30%',
      borderWidth: 1,
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