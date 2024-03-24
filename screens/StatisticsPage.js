import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard } from 'react-native';
import { colors } from '../styles/commonStyles';


const StatisticsPage = ( {navigation} ) => {


  return (
    <View style={styles.container}>

      <StatusBar backgroundColor={colors.tan} />


      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.backButtonText}>&lt;</Text>
      </TouchableOpacity>

      
      {/* Town Statistics Area */}
      <View style={styles.townStatContainer}>
        {/* TODO: ADD DROP DOWN SELECTOR */}
        <View style={styles.townStatTitleContainer}>
          <Text>TestTown</Text>
          <Text> Statistics</Text>
        </View>
      </View>

    
      {/* Recent Guesses Area */}
      <View style={styles.recentGuessesContainer}>
        <Text style={styles.recentGuessesTitle}>Recent Guesses</Text>


      </View>



      {/* Lifetime Statistics Area */}
      <View style={styles.lifetimeStatContainer}>

        {/* Row 1 */}
        <View style={styles.lifetimeRow1Container}>
          {/* Col 1 */}
          <View style={{marginRight: 40}}>
            <Text style={styles.lifetimeStatValue}>1.73%</Text>
            <Text style={styles.lifetimeStatTitle}>Percent Perfect</Text>
          </View>
          {/* Col 2 */}
          <View>
          <Text style={styles.lifetimeStatValue}>15</Text>
            <Text style={styles.lifetimeStatTitle}>Perfect Guesses</Text>
          </View>
        </View>


        {/* Row 2 */}
        <View style={styles.lifetimeRow2Container}>
          {/* Col 1 */}
          <View style={{marginRight: 40}}>
            <Text style={styles.lifetimeStatValue}>28m</Text>
            <Text style={styles.lifetimeStatTitle}>Average Distance</Text>
          </View>
          {/* Col 2 */}
          <View>
            <Text style={styles.lifetimeStatValue}>867</Text>
            <Text style={styles.lifetimeStatTitle}>Total Guesses</Text>
          </View>
        </View>

        <Text style={styles.lifetimeTitle}>Lifetime Statistics</Text>
      </View>


    </View>
  );
};

export default StatisticsPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.tan,
    },
    backButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignContent: 'flex-start'
    },
    backButton: {
      marginTop: 50,
      alignSelf: 'flex-start',
      marginLeft: 32,
    },
    backButtonText:
    {
      color: colors.buttonPrimary,
      fontSize: 40,
      fontWeight: 'bold',
    },
    townStatContainer: {
      width: 375,
      height: 200,
      backgroundColor: colors.background,
      borderRadius: 50,
      marginTop: 10,
      marginLeft: 105,
      borderWidth: 1,
    },
    townStatTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    recentGuessesContainer: {
      marginTop: 30,
    },
    recentGuessesTitle: {
      fontSize: 20,
      fontWeight: 'semibold',
      textAlign: 'center',
    },
    lifetimeStatContainer: {
      width: 350,
      height: 350,
      backgroundColor: colors.background,
      borderRadius: 50,
      marginTop: 150,
      marginRight: 80,
      borderWidth: 1,
    },
    lifetimeRow1Container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: 30,
    },
    lifetimeRow2Container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: 30,
    },
    lifetimeStatTitle: {
      fontSize: 14,
      fontWeight: 'semibold',
    },
    lifetimeStatValue: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    lifetimeTitle: {
      fontSize: 38,
      fontWeight: 'semibold',
      fontStyle: 'italic',
      marginLeft: 55,
      marginTop: 25,
    },
  });