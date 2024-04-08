import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../styles/commonStyles';
import Ionicons from '@expo/vector-icons/Ionicons';


const ProfileComponent = ({userId, email}) => {

    

    const handlePasswordChange = () => {
        console.log("change password");
    }

    return (
        <>
            <View style={styles.container}>

                <Text style={styles.profile}>Profile</Text>


                {/* Email */}
                <Text style={styles.emailTitle}>Email:</Text>


                <View style={styles.passInputContainer}>
                    <Text>{email}</Text>
                    <Ionicons
                        name={'create-outline'}
                        size={20}
                        color="grey"
                    />
                </View>    
                

                {/* Password */}
                <Text style={styles.passwordTitle}>Password:</Text>


                <View style={styles.passInputContainer}>
                    <Text>****** </Text>
                    <Ionicons
                        name={'create-outline'}
                        size={20}
                        color="grey"
                        onPress={() => handlePasswordChange()}
                    />
                </View>                

            </View>


        </>
    );
};


export default ProfileComponent;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '55%',
        backgroundColor: colors.tan,
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'left',
        marginTop: '0%'
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