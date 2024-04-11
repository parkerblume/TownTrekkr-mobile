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
import { useIsFocused } from "@react-navigation/native";



const StatisticsPage = ( {navigation, route} ) => {

  const isFocused = useIsFocused();


  const userId = route.params?.userId;
  const [guesses, setGuesses] = React.useState([]);
  const [allPosts, setAllPosts] = React.useState([]);

  
  const emptyArray = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
        <Text style={styles.emptyText}>No recent guesses!</Text>
      </View>
    );
  };

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
        // console.log("Guesses" + response);
        // console.log("Posts" + allPosts);
        
    } catch (error) {
        console.error('Error fetching guesses and posts:', error);
    }
};

  React.useEffect(() => {
    if (isFocused)
    {
      console.log("Page is focused and fetching guesses and posts...");
      fetchGuessesAndPosts();
    }
  }, [isFocused]);





  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

      
      <TownStatisticsComponent userId={userId} guesses={guesses} allPosts={allPosts} />

    
      {/* Recent Guesses Area */}

      <Text style={styles.recentGuessesTitle}>All Recent Guesses</Text>
      <Text style={styles.recentGuessesSubTitle}>Slide to see more</Text>


      <View style={styles.recentGuessesContainer}>
        <FlatList
          data={allPosts.reverse()}
          renderItem={({item, index}) => (              
              <GuessBox title={item.title} townName={item.town} distance={guesses[index].distanceAway} hasLiked={guesses[index].hasLiked} 
                        hasDisliked={guesses[index].hasDisLiked} date={item.createdAt} />
            )}
          horizontal={true}
          keyExtractor={(item, index) => (item._id + index).toString()}
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
      marginLeft: '5%',
      marginRight: '5%', 
      height: 100,
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
    emptyText: {
      fontSize: 18,
      fontFamily: 'Londrina-Solid-Light',
      marginTop: 30,
      marginBottom: 30,
      textAlign: 'center',
    },
  });