import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, FlatList } from 'react-native';
import { colors } from '../styles/commonStyles';
import GuessBox from '../components/StatisticsScreen/GuessBox';
import TownStatisticsComponent from '../components/StatisticsScreen/TownStatisticsComponent';
import LifetimeStatisticsComponent from '../components/StatisticsScreen/LifetimeStatisticsComponent';


const StatisticsPage = ( {navigation, route} ) => {

  const userId = route.params?.userId;

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

      
      <TownStatisticsComponent userId={userId}/>

    
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


      <LifetimeStatisticsComponent userId={userId}/>



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
  });