import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, FlatList} from 'react-native';
import { colors } from '../styles/commonStyles';


const RecentGuessesPage = ( {navigation} ) => {

  const entrySeparator = () => {
    return <View style={{ height: 1, backgroundColor: "grey", marginHorizontal: 10}} />;
    };
  
  const emptyArray = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No recent guesses!</Text>
      </View>
    );
  };

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


      <FlatList 
        data={arr}


        renderItem={({item, index}) => {
          return <Text>{item}</Text>
        }}
        
        keyExtractor={(index) => index.toString()}
        ItemSeparatorComponent={entrySeparator}
        ListEmptyComponent={emptyArray}
      />


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
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });