import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard } from 'react-native';
import { colors } from '../styles/commonStyles';


const RecentGuessesPage = ( {navigation} ) => {


  return (
    <View style={styles.container}>

      <StatusBar backgroundColor={colors.tan} />


      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Statistics")}>
        <Text style={styles.backButtonText}>&lt;</Text>
      </TouchableOpacity>

      
  

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
  });