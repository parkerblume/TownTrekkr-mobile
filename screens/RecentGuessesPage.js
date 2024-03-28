import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, FlatList} from 'react-native';
import { colors } from '../styles/commonStyles';


const RecentGuessesPage = ( {navigation} ) => {

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
  //const arr = [];
  
  return (
    <View style={styles.container}>

      <StatusBar backgroundColor={colors.tan} />


      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Statistics")}>
        <Text style={styles.backButtonText}>&lt;</Text>
      </TouchableOpacity>

      
      <Text style={styles.titleText}>
        Recent Guesses
      </Text>



      {/* Set arr to fetched array of JSON? objects from database */}

      <View style={styles.listContainer} >

      <FlatList 
          data={arr}


          renderItem={({item, index}) => {
            return <Text style={styles.item}>{item}</Text>
          }}
          
          keyExtractor={(index) => index.toString()}
          ItemSeparatorComponent={entrySeparator}
          ListEmptyComponent={emptyArray}

          
        />
      </View>


    </View>
  );
};

export default RecentGuessesPage;

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
    titleText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 15,
    }, 
    listContainer: {
      flex: 1,
      width: "90%",
      marginTop: 20,
    },
    item: {
      paddingLeft: 20,
      paddingTop: 10,
      fontSize: 18,
      height: 100,
    },
  });