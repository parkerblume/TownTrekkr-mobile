import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../../styles/commonStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import ShowProfileComponent from './ShowProfileComponent';
import EditPasswordComponent from './EditPasswordComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SinglePost from './SinglePost';



const ProfilePostsComponent = ({userId, posts}) => {

    const entrySeparator = () => {
        return <View style={{ height: 1, backgroundColor: "grey" }} />;
    };
      
    const emptyArray = () => {
        return (
            <View style={{ alignItems: "center" }}>
            <Text style={styles.item}>No posts!</Text>
            </View>
        );
    };


    return (        
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Your Posts</Text>
            <View style={styles.postsContainer}>

                <FlatList
                    data={posts}
                    renderItem={({item, index}) => (
                        <SinglePost title={"Title"} likes={item.likes} dislikes={item.dislikes} />
                        )}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={entrySeparator}
                    ListEmptyComponent={emptyArray}
                />

            </View>
            

        </SafeAreaView>        
    );
};


export default ProfilePostsComponent;

const styles = StyleSheet.create({
    container: {
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
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: 'Londrina-Solid',
    },
    postsContainer: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: '5%',
    },
});