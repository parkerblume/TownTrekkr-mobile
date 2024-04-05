import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, FlatList } from 'react-native';
import { colors } from '../styles/commonStyles';
import GuessBox from '../components/StatisticsScreen/GuessBox';


const StatisticsPage = ( {navigation} ) => {

  const entrySeparator = () => {
    return <View style={{ height: 1, backgroundColor: "grey" }} />;
    };
  
  const emptyArray = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No recent guesses!</Text>
      </View>
    );
  };

  // Dummy array for testing purposes
  const arr = ["Guess 1", "Guess 2", "Guess 3", "Guess 4", "Guess 5", "Guess 6", "Guess 7", "Guess 8", "Guess 9", "Guess 10"];


  return (
    <View style={styles.container}>

      <StatusBar backgroundColor={colors.background} />

      
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

      <Text style={styles.recentGuessesTitle}>Recent Guesses</Text>
      <Text style={styles.recentGuessesSubTitle}>Slide to see more</Text>


      <View style={styles.recentGuessesContainer}>

        <FlatList
          data={arr}
          renderItem={({item, index}) => (
              <GuessBox />
            )}
          horizontal={true}
          keyExtractor={(index) => index.toString()}
          ItemSeparatorComponent={entrySeparator}
          ListEmptyComponent={emptyArray}
        />

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
      backgroundColor: colors.background,
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
    backButtonText: {
      color: colors.buttonPrimary,
      fontSize: 40,
      fontWeight: 'bold',
    },
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
    recentGuessesContainer: {
      marginTop: '5%',
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center', 
      alignContent: 'center',
      marginLeft: '5%',
      marginRight: '5%', 
    },
    recentGuessesTitle: {
      fontSize: 22,
      fontFamily: 'Londrina-Solid',
      textAlign: 'center',
      marginTop: '5%',
    },
    recentGuessesSubTitle: {
      fontSize: 16,
      fontFamily: 'Londrina-Solid-Light',
      textAlign: 'center',
    },
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