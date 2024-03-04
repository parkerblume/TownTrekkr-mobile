import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/commonStyles';

const LandingPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor='#abc4ab' />

      <Image style={styles.logo} source={require('./assets/earth.png')} fadeDuration={2000}/>

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subTitle}>sign in to access your account</Text>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={Text}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={Text}
        placeholder="Password"
      />

      <Text style={styles.forgotPassword}>Forgot password?</Text>

      {/* login button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Text under login button */}
      <Text>
        <Text style={styles.newMember}>New member? </Text>
        <TouchableOpacity>
          <Text style={styles.registerNowLink}>Register now</Text>
        </TouchableOpacity>
      </Text>


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
      backgroundColor: '#abc4ab',
    },
    logo: {
      width: 200,
      height: 200,
      marginTop: 80,
      borderRadius: 100,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 30,
    },
    subTitle: {
      fontSize: 18,
      color: 'black',
      marginBottom: 80,
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
      marginTop: 80,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6d4c3d',
      width: 200,
      height: 40,
      borderRadius: 15,
    },
    loginText: {
      color: 'white',
      fontSize: 18,
    },
    newMember: {
      fontSize: 12,
      color: 'black',
      marginTop: 20,
    },
    registerNowLink: {
      fontSize: 12,
      color: 'black',
      marginTop: 5,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });