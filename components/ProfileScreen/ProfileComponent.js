import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/commonStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import ShowProfileComponent from './ShowProfileComponent';
import EditPasswordComponent from './EditPasswordComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileComponent = ({userId, email, username, navigation}) => {

    // const [email, setEmail] = React.useState(FetchedEmail);
    // const [showProfile, setShowProfile] = React.useState(true);


    const handleLogout = async () =>
    {
        try {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('username');
            console.log("Logged out successfully.");
            console.log("userId: ", userId);
            console.log("email: ", email);
            console.log("username: ", username);
            navigation.navigate('StatsScreen');

        } catch (error)
        {
            console.log("Error logging out: ", error);
        }
    }

    return (        
        <SafeAreaView style={styles.container}>

        
            {/* This is here in case we ever want to allow for email / password switching */}
            {/* {showProfile ? 
            <ShowProfileComponent FetchedEmail={FetchedEmail} username={username} toggleComponent={() => setShowProfile(false)} /> :
            <EditPasswordComponent FetchedEmail={FetchedEmail} toggleComponent={() => setShowProfile(true)} />
            } */}
            

            <Text style={styles.profile}>{username}'s Profile</Text>


            {/* Email */}
            <Text style={styles.entryContainer}>
                <Text style={styles.emailTitle}>Email: </Text>
                <Text style={styles.emailText}>{email}</Text>
            </Text>

            <Text style={styles.entryContainer}>
                <Text style={styles.emailTitle}>Number of posts: </Text>
                <Text style={styles.emailText}>-</Text>
            </Text>

            <Text style={styles.entryContainer}>
                <Text style={styles.emailTitle}>Total likes: </Text>
                <Text style={styles.emailText}>-</Text>
            </Text>

            <Text style={styles.entryContainer}>
                <Text style={styles.emailTitle}>Total dislikes: </Text>
                <Text style={styles.emailText}>-</Text>
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
        fontSize: 40,
        fontFamily: 'Londrina-Solid',
        marginBottom: '10%',
    },
    entryContainer: {
        marginLeft: '10%', 
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