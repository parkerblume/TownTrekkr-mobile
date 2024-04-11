import React, { useState } from 'react';
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
  const [guesses, setGuesses] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [listContainerHeight, setListContainerHeight] = useState(0);

  
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
        //console.log("userid: " + userId);
        //console.log("Guesses" + response);
        //console.log("Posts: " + posts);
        
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





  const renderGuessItem = ({item, index}) => {

    if (index >= guesses.length || item.town.length < 5) { return null; }

    let guessObject = {
      postTitle: item.title,
      town: item.town,
      distanceAway: guesses[index].distanceAway,
      hasLiked: guesses[index].hasLiked,
      hasDisLiked: guesses[index].hasDisLiked,
      date: item.createdAt,
    };

    return (
      <View key={`guess-${index}`}>
        <GuessBox guessObject={guessObject} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

      
      <TownStatisticsComponent userId={userId} guesses={guesses} allPosts={allPosts} />

    
      {/* Recent Guesses Area */}

      <Text style={styles.recentGuessesTitle}>All Recent Guesses</Text>
      <Text style={styles.recentGuessesSubTitle}>Slide to see more</Text>


      <View style={styles.recentGuessesContainer}>
        <FlatList
          data={allPosts.reverse()}
          renderItem={renderGuessItem}
          contentContainerStyle={styles.listContainer}
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
    listContainer: {
      paddingLeft: '2%',
    },
    recentGuessesContainer: {
      marginTop: '5%',
      marginLeft: '5%',
      marginRight: '5%', 
      width: '100%',
      height: '15%',
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