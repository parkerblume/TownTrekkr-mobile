import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity,
         KeyboardAvoidingView, Keyboard, FlatList, ActivityIndicator } from 'react-native';
import { colors } from '../styles/commonStyles';
import PicWithUsernameComponent from '../components/ProfileScreen/PicWithUsernameComponent';
import ProfileComponent from '../components/ProfileScreen/ProfileComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfilePostsComponent from '../components/ProfileScreen/ProfilePostsComponent';
import { getUserPosts } from '../api/postAPI.js';
import { useIsFocused } from "@react-navigation/native";

const ProfileScreen = ( {navigation, route} ) => {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = route.params?.userId;
  const username = route.params?.username;
  const email = route.params?.email;
  const handleLogout = route.params?.handleLogout;


  const isFocused = useIsFocused();
  
  React.useEffect(() => {
    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const response = await getUserPosts(userId);
            setPosts(response);      
            setIsLoading(false);  
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

        <SafeAreaView style={styles.postsContainer} edges={['bottom']}>
          <Text style={styles.title}>Your Posts</Text>
          {isLoading ? (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color={colors.dark_brown} />
                <Text style={styles.loadingText}> Currently loading photos... </Text>
            </View>
          ) : (
            <ProfilePostsComponent userId={userId} posts={posts}/>
          )}
        </SafeAreaView>

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
    postsContainer: {
      flex: 1,
      marginTop: '10%',
      width: '90%',
      backgroundColor: colors.tan,
      borderTopEndRadius: 50,
      borderTopStartRadius: 50,
      borderWidth: 1,
      alignItems: 'left',
      paddingBottom: '5%',
    },
    title: {
      marginTop: '2%',
      fontSize: 24,
      alignSelf: 'center',
      fontFamily: 'Londrina-Solid',
    },
    loadingText: {
      fontFamily: 'Londrina-Solid',
      color: colors.olive,
      fontSize: 20,
    },
    loadingContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    earth: {
      borderRadius: 100,
      width: 200,
      height: 200,
      marginTop: '0%',
    },
  });