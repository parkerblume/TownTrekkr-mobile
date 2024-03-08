import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, Pressable } from 'react-native';
import { colors } from '../styles/commonStyles';


const RegisterPage = ( {navigation} ) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [checkmark, setCheckmark] = React.useState(false);



  const signupHandler = () => {
    if (name === '') {
      alert('Please enter your name');
      return;
    }
    if (email === '') {
      alert('Please enter your email');
      return;
    }
    // check for strong password requirements
    // regex string check.
    // if wrong, prompt a window or open a view to show what the password needs to be at the very least
    if (password === '') {
      alert('Please enter a password');
      return;
    }
    if (!checkmark) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor='#abc4ab' />

      
      {/* title text */}
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


      {/* TODO: Add terms and conditions page? */}
      {/* a checkmark box that is required for the signup button to be pressable */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={styles.checkmarkBox} onPress={ () => setCheckmark(true)}></TouchableOpacity>
        <Text style={styles.termsAndConditionsText}>
          <Text>
            I agree to the&nbsp;
          </Text>
          <Text style={{fontWeight: 'bold'}}>
            Terms and Conditions
          </Text>
        </Text>
      </View>


      {/* TODO: Maybe add keyboard avoiding behavior */}


      {/* signup button */}      
      <TouchableOpacity style={styles.nextButton} onPress={ () => signupHandler}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>


      {/* Text under login button */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.alreadyMemberText}>
          <Text>
            Already a member?&nbsp;
          </Text>
            <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
              Log in
            </Text>
        </Text>
      </TouchableOpacity>



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
      backgroundColor: colors.background,
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
    termsAndConditionsText: {
      fontSize: 12,
      color: 'grey',
      marginTop: 1,
      alignSelf: 'flex-start',
    },
    nextButton: {
      marginTop: 120,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6d4c3d',
      width: 250,
      height: 50,
      borderRadius: 15,
    },
    nextText: {
      color: 'white',
      fontSize: 24,
    },
    alreadyMemberText: {
      fontSize: 14,
      color: 'black',
      marginTop: 20,
    },
    checkmarkBox: {
      width: 20,
      height: 20,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
      marginRight: 10,
    },
  });