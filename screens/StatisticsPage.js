import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard } from 'react-native';
import { colors } from '../styles/commonStyles';


const StatisticsPage = ( {navigation} ) => {


  return (
    <View style={styles.container}>


      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.backButtonText}>&lt;</Text>
      </TouchableOpacity>

      
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

    
      {/* Recent Guesses Area */}
      <View style={styles.recentGuessesContainer}>

        {/* Temporary button to navigate to recent guesses page for testing */}
        {/* Look at how i did TownsScreen CreateTownComponent for the Modal, to open up recent guesses :) */}
        <TouchableOpacity >
          <Text style={styles.recentGuessesTitle}>Recent Guesses</Text>
        </TouchableOpacity>

        {/* 4 squares that hold recent guesses */}
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 10 }}>
          <View style={{width: 75, height: 75, backgroundColor: 'white', opacity: 0.5, borderRadius: 10, marginRight: 10, borderWidth: 1}}></View>
          <View style={{width: 75, height: 75, backgroundColor: 'white', opacity: 0.5, borderRadius: 10, marginRight: 10, borderWidth: 1}}></View>
          <View style={{width: 75, height: 75, backgroundColor: 'white', opacity: 0.5, borderRadius: 10, marginRight: 10, borderWidth: 1}}></View>
          <View style={{width: 75, height: 75, backgroundColor: 'white', opacity: 0.5, borderRadius: 10, borderWidth: 1}}></View>
        </View>

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
            <Text style={styles.lifetimeStatValue}>28</Text>
            <Text style={styles.lifetimeStatTitle}>Average Score</Text>
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
      marginRight: 45,
      marginTop: 15,
    },
    townStatDropdownTitle: {
      fontSize: 36,
      fontWeight: 'semibold',
      fontStyle: 'italic',
    },
    townStatStatisticsTitle: {
      fontSize: 36,
      fontWeight: 'semibold',
      fontStyle: 'italic',
    },
    townStatRowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: 10,
      marginRight: 45,
    },
    townStatStatName: {
      fontSize: 24,
      fontWeight: 'semibold',
    },
    townStatStatValue: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    recentGuessesContainer: {
      marginTop: 40,
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
      marginTop: 60,
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