import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { colors } from '../../styles/commonStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import ShowProfileComponent from './ShowProfileComponent';
import EditPasswordComponent from './EditPasswordComponent';


const ProfileComponent = ({userId, FetchedEmail}) => {

    const [email, setEmail] = React.useState(FetchedEmail);

    const [showProfile, setShowProfile] = React.useState(true);



    return (
        <>
            <View style={styles.container}>

                
                {showProfile ? 
                <ShowProfileComponent FetchedEmail={FetchedEmail} toggleComponent={() => setShowProfile(false)} /> :
                <EditPasswordComponent FetchedEmail={FetchedEmail} toggleComponent={() => setShowProfile(true)} />
                }
                    

            </View>


        </>
    );
};


export default ProfileComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
      },
});