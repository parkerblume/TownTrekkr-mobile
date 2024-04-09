import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/commonStyles';


const GuessBox = ({title, likes, dislikes, image}) => {


    return (
        <>
        <View style={styles.container}>
            <View style={styles.item}>
                <Text>{title}</Text>
                <Text>Likes: {likes}</Text>
                <Text>Dislikes: {dislikes}</Text>
            </View>
            {image ? <Image style={{width: 50, height: 50}} source={image} /> : 
            <Text style={styles.noImage}>No image found</Text>}
            
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    item: {
        flex: 1,
        width: 'auto', 
        height: 'auto', 
        backgroundColor: 'white', 
        opacity: 0.5, 
        borderRadius: 10, 
        borderWidth: 1,
        paddingLeft: '2%',
        paddingTop: '1%',
        paddingBottom: '1%',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
    },
    noImage: {
        marginRight: '5%',
    }
});

export default GuessBox;