import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/commonStyles';


const RegisterPage = ( {navigation} ) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor='#abc4ab' />

      

      <Text style={styles.title}>Get Started</Text>
      <Text style={styles.subTitle}>by creating a free account</Text>
      
      {/* TODO: Add icon picture of people */}

      {/* input fields */}

      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Full name"
      />

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
        placeholder="Strong password"
      />



      <Text style={styles.forgotPassword}>Forgot password?</Text>

      {/* TODO: Maybe add keyboard avoiding behavior */}
      {/* signup button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Next</Text>
      </TouchableOpacity>

      {/* Text under login button */}
      <Text>
        <Text style={styles.newMember}>Already a member?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.registerNowLink}>Log in</Text>
        </TouchableOpacity>
      </Text>

    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#abc4ab',
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
      marginTop: 100,
    },
    subTitle: {
      fontSize: 18,
      color: 'black',
      marginBottom: 120,
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
      fontSize: 12,
      color: 'black',
      marginTop: 20,
    },
    registerNowLink: {
      fontSize: 12,
      color: 'black',
      marginTop: 20,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });