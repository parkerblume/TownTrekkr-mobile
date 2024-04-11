import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, FlatList } from 'react-native';
import { colors } from '../styles/commonStyles';
import PicWithUsernameComponent from '../components/ProfileScreen/PicWithUsernameComponent';
import ProfileComponent from '../components/ProfileScreen/ProfileComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfilePostsComponent from '../components/ProfileScreen/ProfilePostsComponent';
import { getUserPosts } from '../api/postAPI.js';
import { useIsFocused } from "@react-navigation/native";

const ProfileScreen = ( {navigation, route} ) => {
  const [posts, setPosts] = React.useState([]);

  const userId = route.params?.userId;
  const username = route.params?.username;
  const email = route.params?.email;
  const handleLogout = route.params?.handleLogout;


  const isFocused = useIsFocused();
  
  React.useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await getUserPosts(userId);
            setPosts(response);        
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    //console.log("user: " + username);
    //console.log("posts: " + posts);
    fetchPosts();
}, [isFocused]);


  return (
    <SafeAreaView style={styles.container} edges={['top']}>

        <ProfileComponent userId={userId} email={email} username={username} navigation={navigation} posts={posts} handleLogout={handleLogout} />

        <ProfilePostsComponent userId={userId} posts={posts} />

        {/* <Image style={styles.earth} source={require('../assets/earth.png')} />


        <PicWithUsernameComponent username={username} /> */}


    </SafeAreaView>
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