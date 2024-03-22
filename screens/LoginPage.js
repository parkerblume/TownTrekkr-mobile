import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard } from 'react-native';
import { colors } from '../styles/commonStyles';
import { login } from '../api/authAPI.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginPage = ( {navigation} ) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


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
      await AsyncStorage.setItem('userId', userId);
      navigation.navigate("GameScreen");
    }
  }

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor='#abc4ab' />

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
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />

      <Text style={styles.forgotPassword}>Forgot password?</Text>



      {/* TODO: Maybe add keyboard avoiding behavior */}
      
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

    </View>
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
    logo: {
      width: 200,
      height: 200,
      marginTop: 50,
      borderRadius: 100,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 15,
    },
    subTitle: {
      fontSize: 18,
      color: 'black',
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
      fontSize: 24,
    },
    newMember: {
      fontSize: 14,
      color: 'black',
      marginTop: 20,
    },
  });