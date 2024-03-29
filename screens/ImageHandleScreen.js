import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, SafeAreaView, TextInput } from 'react-native';
import {commonStyles, colors} from '../styles/commonStyles';
import CameraOptions from '../components/ImageHandle/CameraOptions';
import { postUpload } from '../api/postAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageHandleScreen = ({ navigation, route }) => {
    const { imageResult, location } = route.params;
    const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState('');
    const [towns, setTowns] = useState(null); // eventually populate towns

    useEffect(() => {
        const getUserId = async () =>
        {
          try {
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserId !== null)
            {
              setUserId(storedUserId);
              console.log(storedUserId);
            }
          } catch (error)
          {
            console.log("Error retrieving userId: ", error);
          }
        }
    
        getUserId();
    }, []);


    const handleTitleChange = (text) =>
    {
        setTitle(text);
    }

    const handleUpload = async () =>
    {
        console.log(userId);
        const data = await postUpload(imageResult, location, 'someTown', userId);
        console.log(data);
        //navigation.goBack();
    }

    const handleCancel = () =>
    {
        navigation.goBack();
    }

    if (!imageResult) { return null; }

    return (
        <View style={commonStyles.screenContainer}>
            <SafeAreaView style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text> Currently posting in: </Text>
                </View>
                <View style={styles.fieldContainer}>
                    <View style={styles.photoContainer}>
                        <Image source={{ uri: imageResult.uri }}
                                style={{ width: '100%', height: '100%' }}
                                />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputField}
                            placeholder='Enter a defining title...'
                            value={title}
                            onChangeText={handleTitleChange}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleUpload}>
                            <Text style={styles.buttonText}>Upload</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    headerContainer: {
        marginTop: '10%',
        marginBottom: '5%',
        justifyContent:'center',
        alignItems: 'baseline'
    },
    fieldContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    photoContainer: {
        width: 350,
        height: 350,
        borderColor: colors.olive,
        borderWidth: 3,
        shadowColor: colors.dark_brown,
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }, 
        elevation: 10,
    },
    inputContainer: {
        width: 345,
        height: 40,
        marginBottom: 20,
        marginTop: 20,
    },
    inputField: {
        height: 40,
        borderColor: colors.dark_brown,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: 350,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: colors.olive,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        width: '46%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelButton: {
        backgroundColor: colors.dark_brown,
    },
    buttonText: {
        color: colors.tan,
        fontFamily: 'Londrina-Solid',
        fontSize: 16,
    },
})

export default ImageHandleScreen;