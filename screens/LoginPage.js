import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, Platform, SafeAreaView } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { login } from '../api/authAPI.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';


const LoginPage = ( {navigation, onLogin} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [onFocus, setOnFocus] = useState(false);


  const loginHandler = async () => {
    if (email === '') {
      alert('Please enter your email');
      return;
    }
    if (password === '') {
      alert('Please enter your password');
      return;
    }

    let data = await login(email, password);
    console.log(data);
    if (data)
    {
      const userId = data.id;
      const username = data.username;
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('username', username);
      onLogin();
    }
  }

  const handleOnFocus = () => {
    setOnFocus(!onFocus);
  }

  return (
    <KeyboardAvoidingView style={styles.container}  
        behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView style={commonStyles.scrollViewContainer} 
          contentContainerStyle={styles.scrollViewContent} enabled={onFocus}
        >

      <StatusBar backgroundColor={colors.tan}/>
      {/* logo picture */}
      <Image style={styles.logo} source={require('../assets/earth.png')} fadeDuration={2000}/>


      {/* title text */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subTitle}>sign in to access your account</Text>



      {/* input fields */}
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            onFocus={handleOnFocus}
            onBlur={handleOnFocus}
          />

          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            onFocus={handleOnFocus}
            onBlur={handleOnFocus}
          />

          <Text style={styles.forgotPassword}>Forgot password?</Text>
          
          {/* login button */}
          <TouchableOpacity style={styles.loginButton} onPress={loginHandler}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

      {/* Text under login button */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.newMember}>
          <Text>
            New member?&nbsp;
          </Text>
            <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
              Register here
            </Text>
        </Text>
      </TouchableOpacity>

      </ScrollView>

    </KeyboardAvoidingView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.tan,
    },
    keyboardAvoidingView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    scrollViewContent: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    logo: {
      width: 200,
      height: 200,
      marginTop: 50,
      borderRadius: 100,
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold',
      fontFamily: 'Londrina-Solid',
      color: 'black',
      marginTop: 15,
    },
    subTitle: {
      fontSize: 20,
      color: 'black',
      fontFamily: 'Londrina-Solid-Light',
      marginBottom: 40,
    },
    input: {
      height: 40,
      width: 300,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white',
    },
    forgotPassword: {
      fontSize: 12,
      color: 'grey',
      marginTop: -5,
      alignSelf: 'flex-start',
      marginLeft: 32,
      fontStyle: 'italic',
    },
    loginButton: {
      marginTop: 120,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6d4c3d',
      width: 250,
      height: 50,
      borderRadius: 15,
    },
    loginText: {
      color: 'white',
      fontSize: 30,
      fontFamily: 'Londrina-Solid'
    },
    newMember: {
      fontFamily: 'Londrina-Solid-Light',
      fontSize: 20,
      color: 'black',
      marginTop: 20,

    },
  });