import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, FlatList, SafeAreaView } from 'react-native';
import { colors } from '../styles/commonStyles';
import GuessBox from '../components/StatisticsScreen/GuessBox';
import TownStatisticsComponent from '../components/StatisticsScreen/TownStatisticsComponent';
import LifetimeStatisticsComponent from '../components/StatisticsScreen/LifetimeStatisticsComponent';
import { getGuesses } from '../api/postAPI.js';
import { getPostById } from '../api/postAPI.js';


const StatisticsPage = ( {navigation, route} ) => {

  const userId = route.params?.userId;
  const [guesses, setGuesses] = React.useState([]);
  const [allPosts, setAllPosts] = React.useState([]);
  
  const emptyArray = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No recent guesses!</Text>
      </View>
    );
  };

  React.useEffect(() => {
    const fetchGuessesAndPosts = async () => {
        try {
            const response = await getGuesses(userId);
            setGuesses(response); 

            const postsPromises = response.map(async guess => {
              const post = await getPostById(guess.post);
              return post;
            });
    
            const posts = await Promise.all(postsPromises);
            setAllPosts(posts);

            
        } catch (error) {
            console.error('Error fetching guesses:', error);
        }
    };

    fetchGuessesAndPosts();
}, []);





  return (
    <SafeAreaView style={styles.container}>

      
      <TownStatisticsComponent userId={userId} guesses={guesses} allPosts={allPosts} />

    
      {/* Recent Guesses Area */}

      <Text style={styles.recentGuessesTitle}>All Recent Guesses</Text>
      <Text style={styles.recentGuessesSubTitle}>Slide to see more</Text>


      <View style={styles.recentGuessesContainer}>
        <FlatList
          data={allPosts}
          renderItem={({item, index}) => (              
              <GuessBox title={item.title} score={guesses[index].score} hasLiked={guesses[index].hasLiked} 
                        hasDisliked={guesses[index].hasDisLiked} date={item.createdAt} />
            )}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
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