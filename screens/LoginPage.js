import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { colors } from '../styles/commonStyles';
import { login } from '../api/authAPI.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';



const LoginPage = ( {navigation, onLogin} ) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);



  const loginHandler = async () => {
    if (email === '')
    {
      alert('Please enter your email');
      return;
    }
    if (password === '')
    {
      alert('Please enter your password');
      return;
    }

    let data = await login(email, password);
    //console.log(data);
    if (data)
    {
      const userId = data.id;
      const username = data.username;
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('username', username);
      onLogin();
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >

      <StatusBar backgroundColor={colors.tan}/>
      {/* logo picture */}
      <Image style={styles.logo} source={require('../assets/earth.png')} fadeDuration={1000}/>


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

      {/* <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      /> */}

      <View style={styles.passInputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={!showPassword}
          />      
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="grey"
            style={styles.hideIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
      </View>

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
    forgotPassword: {
      fontSize: 12,
      color: 'grey',
      marginTop: -5,
      alignSelf: 'flex-start',
      marginLeft: 32,
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
      color: 'black',
      marginTop: 20,
      fontFamily: 'Londrina-Solid-Light',
    },
    hideIcon: {
      position: 'absolute',
      right: 22,
    },
    passInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });