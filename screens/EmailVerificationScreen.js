import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { colors } from '../styles/commonStyles';
import { login } from '../api/authAPI.js';
import { sendEmail } from '../api/authAPI.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EmailVerificationScreen = ( {navigation} ) => {

  const [inputs, setInputs] = React.useState(Array(4).fill(''));

  const sendCodeToEmail = () => {
    sendEmail("da162852@ucf.edu");
    console.log("Code sent to email");
  };

  React.useEffect(() => {
    sendCodeToEmail();
  });

  const handleInputChange = (text, index) => {

    // Update input array
    const newInputs = [...inputs];
    newInputs[index] = text;

    // Move focus to the next input box
    if (index < 3 && text.length === 1)
    {
      inputRefs[index + 1].current.focus();
    }
    else if (text === '' && index > 0)
    {
      inputRefs[index - 1].current.focus();
    }

    setInputs(newInputs);
    
  };

  const getCode = () => {
    return inputs.join('');
  };

  // Array to hold refs for each TextInput
  const inputRefs = Array(4).fill().map((_, i) => React.useRef(null));


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




      {/* input field for verification code */}
      <View style={{flexDirection: 'row', marginTop: '20%'}}>
      {inputs.map((value, index) => (
        <TextInput
          key={index}
          ref={inputRefs[index]}
          style={styles.inputBox}
          maxLength={1}
          keyboardType="numeric"
          value={value}
          onChangeText={(text) => handleInputChange(text, index)}
        />
      ))}
      </View>

      <Text>Code inputed: {getCode()}</Text>

      
      {/* confirm button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>


      {/* Text under confirm button */}
      <View style={{alignItems: 'center'}}>
            <Text style={styles.dontSeeCodeText}>
                Don't see the code?
            </Text>
            <Text style={styles.sendAgainText}>

              <TouchableOpacity onPress={() => sendCodeToEmail()}>
                <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
                  Send again
                </Text>
              </TouchableOpacity>

              <Text>&nbsp;or&nbsp;</Text>

              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
                  register with new email
                </Text>
              </TouchableOpacity>

            </Text>
      </View>

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
    inputBox: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: 'gray',
      textAlign: 'center',
      fontSize: 20,
      fontFamily: 'Londrina-Solid-Light',
      marginHorizontal: 5,
      borderRadius: 10,
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
    dontSeeCodeText: {
      fontFamily: 'Londrina-Solid-Light',
      fontSize: 20,
      color: 'black',
      marginTop: 20,
    },
    sendAgainText: {
      fontFamily: 'Londrina-Solid-Light',
      fontSize: 20,
      color: 'black',
    },
  });