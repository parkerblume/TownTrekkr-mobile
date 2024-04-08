import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../styles/commonStyles';


const PicWithUsernameComponent = ({username}) => {


    const getUsername = () => {
        if (username)
            return username;
        return '-';
    }


    return (
        <>
            <View style={styles.container}>
                <Image style={styles.profilePic} source={require('../../assets/silhouette.png')} />

                <Text style={styles.username}>{getUsername()}</Text>
            </View>


        </>
    );
};


export default PicWithUsernameComponent;

const styles = StyleSheet.create({
    container: {
        width: '70%',
        height: '35%',
        backgroundColor: colors.tan,
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
        marginTop: '0%'
      },
    profilePic: {
        width: '50%',
        height: '50%',
        marginTop: '20%',
        borderRadius: 100,
      },
    username: {
        marginTop: '8%',
        fontSize: 40,
        fontFamily: 'Londrina-Solid',
    },
});