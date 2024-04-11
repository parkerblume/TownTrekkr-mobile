import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../../styles/commonStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import ShowProfileComponent from './ShowProfileComponent';
import EditPasswordComponent from './EditPasswordComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SinglePost from './SinglePost';
import { getTownById } from '../../api/authAPI';



const ProfilePostsComponent = ({userId, posts}) => {


    const entrySeparator = () => {
        return <View style={{ height: 0, backgroundColor: "grey" }} />;
    };
      
    const emptyArray = () => {
        return (
            <View style={{ alignItems: "center" }}>
            <Text style={styles.item}>No posts!</Text>
            </View>
        );
    };




    return (        
        <SafeAreaView style={styles.container} edges={['bottom']}>

            <Text style={styles.title}>Your Posts</Text>
            <View style={styles.postsContainer}>

                <FlatList
                    data={posts}
                    renderItem={({item, index}) => (
                        <SinglePost title={item.title ? item.title : "No post title..."} likes={item.likes} 
                                            post={item} dislikes={item.dislikes} image={item.fileId} date={item.createdAt} />
                        )}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={entrySeparator}
                    ListEmptyComponent={emptyArray}
                    contentContainerStyle={styles.listContainer}
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
        fontSize: 24,
        alignSelf: 'center',
        fontFamily: 'Londrina-Solid',
    },
    postsContainer: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    listContainer: {
        paddingBottom: '2%',
        width: '100%',
    },
});