import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, Pressable, Platform } from 'react-native';
import PasswordRequirements from '../components/PasswordRequirements';
import { colors } from '../styles/commonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signup } from '../api/authAPI.js';


const RegisterPage = ( {navigation} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [checkmark, setCheckmark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassReqs, setShowPassReqs] = useState(false);


  const isValidPassword = (password) => {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$/;
    return passRegex.test(password);
  }

  const isValidEmail = (email) => {
    let emailRegex = /^\S+@\S+$/
    return true;
  }

  const signupHandler = () => {
    console.log("sign up");
    if (username === '') {
      alert('Please enter your username');
      console.log("invalid user");
      return;
    }
    if (!isValidEmail()) {
      alert('Please enter your email');
      // turn email box red.
      console.log("invalid email");
      return;
    }
    // check for strong password requirements
    // regex string check.
    // if wrong, prompt a window or open a view to show what the password needs to be at the very least
    if (!isValidPassword(password)) {
      console.log("invalid password");
      alert('Please enter a password');
      // turn password box red.
      return;
    }
    if (!checkmark) {
      alert('Please agree to the terms and conditions');
      console.log("no checkmark");
      return;
    }
    
    let data = signup(email, password, username);
    console.log(data);
    navigation.navigate("Login");
  }

  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer} scrollEnabled={showPassReqs} >
        <StatusBar backgroundColor='#abc4ab' />

        
        {/* title text */}
        <Text style={[styles.title]}>Get Started</Text>
        <Text style={styles.subTitle}>by creating a free account</Text>
        


        {/* TODO: Add icon picture of people */}



        {/* input fields */}
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
        />

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />

        <View style={styles.passInputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setPassword(text);
              setShowPassReqs(text.length > 0);
            }}
            value={password}
            placeholder="Password"
            secureTextEntry={!showPassword}
          />      
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="grey"
            style={styles.hideIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        {showPassReqs && <PasswordRequirements password={password} />}

        {/* TODO: Add terms and conditions page? */}
        {/* a checkmark box that is required for the signup button to be pressable */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={styles.checkmarkBox} onPress={ () => setCheckmark(!checkmark)}>
            {checkmark && <Ionicons name="checkmark" size={24} color='green' style={styles.checkIcon} />}
          </TouchableOpacity>
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
        <TouchableOpacity style={styles.nextButton} onPress={signupHandler}>
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

      </ScrollView>

    </KeyboardAvoidingView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.tan,
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    logo: {
      width: 200,
      height: 200,
      marginTop: 50,
      borderRadius: 100,
    },
    title: {
      fontFamily: 'Londrina-Solid',
      fontSize: 50,
      color: 'black',
      marginTop: 100,
    },
    subTitle: {
      fontFamily: 'Londrina-Solid-Light',
      fontSize: 20,
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
    passInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconTouchable: {
      position: 'absolute',
      backgroundColor: colors.dark_brown,
      right: 22,
      padding: 0,
    },
    hideIcon: {
      position: 'absolute',
      right: 22,
    },
    checkIcon: {
      position: 'relative',
      top: -2,
      right: 2
    },
    termsAndConditionsText: {
      fontSize: 12,
      color: 'grey',
      marginTop: '1%',
      alignSelf: 'flex-start',
    },
    nextButton: {
      marginTop: 80,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6d4c3d',
      width: 220,
      height: 50,
      borderRadius: 15,
    },
    nextText: {
      fontFamily: 'Londrina-Solid',
      color: 'white',
      fontSize: 30,
    },
    alreadyMemberText: {
      fontFamily: 'Londrina-Solid-Light',
      fontSize: 20,
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