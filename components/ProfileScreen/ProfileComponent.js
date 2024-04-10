import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/commonStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import ShowProfileComponent from './ShowProfileComponent';
import EditPasswordComponent from './EditPasswordComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileComponent = ({userId, email, username, navigation, posts}) => {

    // const [email, setEmail] = React.useState(FetchedEmail);
    // const [showProfile, setShowProfile] = React.useState(true);


    const handleLogout = async () =>
    {
        try {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('username');
            console.log("Logging out");

            // THIS DON"T WORK
            //navigation.navigate('LoginScreen');

        } catch (error)
        {
            console.log("Error logging out: ", error);
        }
    }

    const getLikes = () => {
        let likes = 0;
        for (let i = 0; i < posts.length; i++)
        {
            likes += posts[i].likes;
        }
        return likes;
    }

    const getDislikes = () => {
        let dislikes = 0;
        for (let i = 0; i < posts.length; i++)
        {
            dislikes += posts[i].dislikes;
        }
        return dislikes;
    }

    return (        
        <SafeAreaView style={styles.container}>

        
            {/* This is here in case we ever want to allow for email / password switching */}
            {/* {showProfile ? 
            <ShowProfileComponent FetchedEmail={FetchedEmail} username={username} toggleComponent={() => setShowProfile(false)} /> :
            <EditPasswordComponent FetchedEmail={FetchedEmail} toggleComponent={() => setShowProfile(true)} />
            } */}
            

            <Text style={styles.profile}>{username}'s Profile</Text>


            <Text style={styles.entryContainer}>
                <Text style={styles.emailTitle}>Email: </Text>
                <Text style={styles.emailText}>{email}</Text>
            </Text>

            <Text style={styles.entryContainer}>
                <Text style={styles.emailTitle}>Number of posts: </Text>
                <Text style={styles.emailText}>{posts.length}</Text>
            </Text>

            <Text style={styles.entryContainer}>
                <Text style={styles.emailTitle}>Total likes: </Text>
                <Text style={styles.emailText}>{getLikes()}</Text>
            </Text>

            <Text style={styles.entryContainer}>
                <Text style={styles.emailTitle}>Total dislikes: </Text>
                <Text style={styles.emailText}>{getDislikes()}</Text>
            </Text>

            {/* Log out button */}
            {<TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
                <Text style={styles.logOutText}>Log Out</Text>
            </TouchableOpacity>}
            

        </SafeAreaView>        
    );
};


export default ProfileComponent;

const styles = StyleSheet.create({
      container: {
        width: '90%',
        backgroundColor: colors.tan,
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'left',
        paddingBottom: '5%',
      },
    profile: {
        marginTop: '5%',
        marginLeft: '10%',
        fontSize: 36,
        fontFamily: 'Londrina-Solid',
        marginBottom: '5%',
    },
    entryContainer: {
        marginLeft: '10%',
        marginTop: '1%', 
    },
    emailTitle: {
        fontSize: 20,
        fontFamily: 'Londrina-Solid',
    },
    emailText: {
        fontSize: 14,
        fontFamily: 'Londrina-Solid-Light',
        color: 'black',
    },
    logOutButton: {
        backgroundColor: colors.dark_brown,
        width: '80%',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '10%',
    },
    logOutText: {
        fontSize: 24,
        fontFamily: 'Londrina-Solid',
        color: 'white',
    },
});