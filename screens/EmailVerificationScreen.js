import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { colors } from '../styles/commonStyles';
import { login } from '../api/authAPI.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EmailVerificationScreen = ( {navigation} ) => {


  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >

      <StatusBar backgroundColor={colors.tan}/>


      {/* title text */}
      <Text style={styles.title}>Email Verification</Text>
      <Text style={styles.subTitle}>You are one step closer to joining</Text>
      <Text style={styles.subTitle}>the TownTrekkr community!</Text>





      
      {/* confirm button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>


      {/* Text under confirm button */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>
                Don't see the code?
            </Text>
            <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
              Register here
            </Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
};

export default EmailVerificationScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.tan,
    },
    title: {
      fontSize: 50,
      fontFamily: 'Londrina-Solid',
      marginTop: '35%',
    },
    subTitle: {
      fontFamily: 'Londrina-Solid-Light',
      fontSize: 20,
    },
    confirmButton: {
      marginTop: '20%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6d4c3d',
      width: 220,
      height: 50,
      borderRadius: 15,
    },
    confirmText: {
      color: 'white',
      fontSize: 30,
      fontFamily: 'Londrina-Solid',
    },
  });