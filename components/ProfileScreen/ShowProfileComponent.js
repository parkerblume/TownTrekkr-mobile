import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { colors } from '../../styles/commonStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';


const ShowProfileComponent = ({FetchedEmail, toggleComponent, username}) => {

    const [email, setEmail] = React.useState(FetchedEmail);

    const [editable, setEditable] = React.useState(false); 

    // const [showProfile, setShowProfile] = React.useState(FetchedShowProfile);


    const toggleEditable = () => {
        console.log("toggle editable");
        setEditable(!editable); 
    };


    return (
        <>
            <SafeAreaView style={styles.container}>

                <Text style={styles.profile}>{username}'s Profile</Text>


                {/* Email */}
                <Text style={styles.emailTitle}>Email:</Text>


                <SafeAreaView style={styles.passInputContainer}>
                    <TextInput
                        style={styles.emailText}
                        onChangeText={setEmail}
                        value={email}
                        editable={editable}
                        placeholder='Email'
                    />
                    <Ionicons
                        name={'create-outline'}
                        size={20}
                        color="grey"
                        onPress={() => toggleEditable()}
                    />
                </SafeAreaView>    
                

                {/* Password */}
                <Text style={styles.passwordTitle}>Password:</Text>


                <View style={styles.passInputContainer}>
                    <Text>****** </Text>
                    <Ionicons
                        name={'create-outline'}
                        size={20}
                        color="grey"
                        onPress={toggleComponent}
                    />
                </View>                

            </SafeAreaView>


        </>
    );
};


export default ShowProfileComponent;

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
    },
    emailTitle: {
        marginTop: '8%',
        marginLeft: '10%',
        fontSize: 20,
        fontFamily: 'Londrina-Solid',
    },
    emailText: {
        fontSize: 14,
        fontFamily: 'Londrina-Solid-Light',
        color: 'black',
    },
    passwordTitle: {
        marginTop: '8%',
        marginLeft: '10%',
        fontSize: 20,
        fontFamily: 'Londrina-Solid',
    },
    passInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10%',
    },
});