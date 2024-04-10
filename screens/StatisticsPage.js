import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, FlatList, SafeAreaView } from 'react-native';
import { colors } from '../styles/commonStyles';
import GuessBox from '../components/StatisticsScreen/GuessBox';
import TownStatisticsComponent from '../components/StatisticsScreen/TownStatisticsComponent';
import LifetimeStatisticsComponent from '../components/StatisticsScreen/LifetimeStatisticsComponent';
import { getGuesses } from '../api/postAPI.js';


const StatisticsPage = ( {navigation, route} ) => {

  const userId = route.params?.userId;
  const [guesses, setGuesses] = React.useState([]);
  
  const emptyArray = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No recent guesses!</Text>
      </View>
    );
  };

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

  // Dummy array for testing purposes
  const arr = ["Guess 1", "Guess 2", "Guess 3", "Guess 4", "Guess 5", "Guess 6", "Guess 7", "Guess 8", "Guess 9", "Guess 10"];


  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor={colors.background} />

      
      <TownStatisticsComponent userId={userId} guesses={guesses} />

    
      {/* Recent Guesses Area */}

      <Text style={styles.recentGuessesTitle}>Recent Guesses</Text>
      <Text style={styles.recentGuessesSubTitle}>Slide to see more</Text>


      <View style={styles.recentGuessesContainer}>
        <FlatList
          data={guesses}
          renderItem={({item, index}) => (              
              <GuessBox guess={item} />
            )}
          horizontal={true}
          keyExtractor={item => item._id}
          ListEmptyComponent={emptyArray}
        />

      </View>


      <LifetimeStatisticsComponent userId={userId} guesses={guesses} />



    </SafeAreaView>
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