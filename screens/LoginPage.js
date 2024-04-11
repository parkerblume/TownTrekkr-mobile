import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, Platform, SafeAreaView } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { login } from '../api/authAPI.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { sendResetPasswordEmail } from '../api/authAPI.js';


const LoginPage = ( {navigation, onLogin} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [onFocus, setOnFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);



  const loginHandler = async () => {
    if (email === '' && password === '')
    {
      setIsPasswordError(true);
      setIsEmailError(true);
      setErrorMessage('Must enter an email and password');
      return;
    }

    if (email === '')
    {
      setErrorMessage('Must enter an email');
      setIsEmailError(true);
      return;
    }
    if (password === '')
    {
      setErrorMessage('Must enter a password');
      setIsPasswordError(true);
      return;
    }

    let data = await login(email, password);
    if (data.error) 
    { 
      setErrorMessage(data.error); 
      setIsEmailError(true);
      setIsPasswordError(true);
      return; 
    }

    if (data)
    {
      setErrorMessage(''); 
      setIsEmailError(false);
      setIsPasswordError(false);
      const userId = data.id;
      const username = data.username;
      const email = data.email;
      // console.log("User ID: ", userId);
      // console.log("Username: ", username);
      // console.log("Email: ", email);
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('email', email);
      onLogin();
    }
  }

  const handleOnFocus = () => {
    setOnFocus(!onFocus);
  }

  const handleResetPassword = () => {
    if (email === '')
    {
      setErrorMessage('Enter an email to reset password');
      setIsEmailError(true);
      return;
    }
    //console.log("email being sent to: ", email);
    setErrorMessage("Password reset email sent!"); 
    setIsEmailError(false);
    sendResetPasswordEmail(email);
  }

  return (
    <KeyboardAvoidingView style={styles.container}  
        behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView style={commonStyles.scrollViewContainer} 
          contentContainerStyle={styles.scrollViewContent} enabled={onFocus}
        >

      {/* logo picture */}
      <Image style={styles.logo} source={require('../assets/earth.png')} fadeDuration={1000}/>


      {/* title text */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subTitle}>sign in to access your account</Text>



      {/* input fields */}
          <TextInput
            style={[styles.input, isEmailError && styles.fieldError]}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            onFocus={handleOnFocus}
            onBlur={handleOnFocus}
          />

      <View style={styles.passInputContainer}>
          <TextInput
            style={[styles.input, isPasswordError && styles.fieldError]}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={!showPassword}
            onFocus={handleOnFocus}
            onBlur={handleOnFocus}
          />      
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="grey"
            style={styles.hideIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
      </View>

      {errorMessage !== '' && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      )}

      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword}>Forgot password? &nbsp;</Text>
        <TouchableOpacity onPress={() => handleResetPassword()}>
          <Text style={styles.linkToReset}>Reset your password</Text>
        </TouchableOpacity>
      </View>

      
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
      fontFamily: 'Londrina-Solid',
      marginTop: 15,
    },
    subTitle: {
      fontFamily: 'Londrina-Solid-Light',
      fontSize: 20,
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
    forgotPasswordContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    forgotPassword: {
      fontSize: 12,
      color: 'grey',
      fontStyle: 'italic',
    },
    loginButton: {
      marginTop: '20%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6d4c3d',
      width: 220,
      height: 50,
      borderRadius: 15,
    },
    loginText: {
      color: 'white',
      fontSize: 30,
      fontFamily: 'Londrina-Solid',
    },
    newMember: {
      fontSize: 20,
      fontFamily: 'Londrina-Solid-Light',
      color: 'black',
      marginTop: 20,
    },
    hideIcon: {
      position: 'absolute',
      right: 22,
    },
    passInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    errorMessageContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '2%',
    },
    errorMessage: {
      fontFamily: 'Londrina-Solid-Light',
      fontSize: 20,
      color: 'red',
    },
    fieldError: {
      borderColor: 'red',
      borderWidth: 3,
    },
    linkToReset: {
      fontFamily: 'Londrina-Solid',
      textDecorationLine: 'underline',
    }
  });