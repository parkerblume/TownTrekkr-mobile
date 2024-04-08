import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, FlatList } from 'react-native';
import { colors } from '../styles/commonStyles';
import PicWithUsernameComponent from '../components/ProfileScreen/PicWithUsernameComponent';
import ProfileComponent from '../components/ProfileScreen/ProfileComponent';

const ProfileScreen = ( {navigation, route} ) => {

  const userId = route.params?.userId;
  const username = route.params?.username;
  const email = route.params?.email;



  return (
    <View style={styles.container}>

      <StatusBar backgroundColor={colors.background} />

      
        <PicWithUsernameComponent username={username} />


        <Image style={styles.earth} source={require('../assets/earth.png')} />


        <ProfileComponent userId={userId} FetchedEmail={email}/>

    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.background,
    },   
    earth: {
      borderRadius: 100,
      width: 200,
      height: 200,
      marginTop: '0%',
    },

  });