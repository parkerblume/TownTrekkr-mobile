import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {commonStyles, colors} from '../styles/commonStyles';
import { postUpload } from '../api/postAPI';
import NoPlayingTownHandle from '../components/ImageHandle/NoPlayingTownHandle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageHandleScreen = ({ navigation, route }) => {
    const { imageResult, location, userId } = route.params;
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const [title, setTitle] = useState('');
    const [town, setTown] = useState(null); 
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // pull the currently saved town in storage (game they're currently playing)
    const fetchSavedTown = async () =>
    {
        const storedTown = await AsyncStorage.getItem('currentTown');
        console.log(storedTown);
        if (storedTown)
        {
            setTown(JSON.parse(storedTown));
        }
    }

    useEffect(() => {
        fetchSavedTown();
    }, []);

    // reset state on return (when navigation goes back)
    useEffect(() => {
        return () => {
          setTitle('');
          setTown(null);
          setSuccessMessage('');
          setErrorMessage('');
        };
      }, []);


    const handleTitleChange = (text) =>
    {
        setTitle(text);
    }

    const handleUpload = async () =>
    {
        const data = await postUpload(imageResult, location, title, town.id, userId);
        console.log(data);
        if (data)
        {
            setSuccessMessage('Photo has been posted!');
            setErrorMessage('');
            setTimeout(() => {
                navigation.goBack();
            }, 2000);
        }
        else
        {
            setErrorMessage('Sorry, something went wrong went posting. Try again later');
            setSuccessMessage('');
        }
    }

    const handleCancel = () =>
    {
        navigation.goBack();
    }

    if (!imageResult) { return null; }

    if (!town) { return null; }

    return (
        <SafeAreaView style={commonStyles.screenContainer}>
            <KeyboardAvoidingView style={[commonStyles.keyboardAvoidingContainer, styles.contentContainer]} behavior={Platform.OS === 'ios' ? 'padding': 'height'}>

                <ScrollView contentContainerStyle={styles.scrollViewContainer}
                            scrollEnabled={scrollEnabled}>
                    <View style={styles.contentContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.textField}> Currently posting in:&nbsp;</Text>
                            <Text style={styles.bigTextField}>{town.name}</Text>
                        </View>
                        <View style={styles.photoContainer}>
                            <Image source={{ uri: imageResult.uri }}
                                    style={{ width: '100%', height: '100%' }}
                                    />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Photo Title</Text>
                            <TextInput style={styles.inputField}
                                placeholder='Enter a defining title...'
                                value={title}
                                maxLength={32}
                                onChangeText={handleTitleChange}
                                onFocus={() => setScrollEnabled(!scrollEnabled)}
                                onBlur={() => setScrollEnabled(!scrollEnabled)}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} 
                                              onPress={handleUpload} 
                                              disabled={(successMessage != '' || errorMessage != '')}>
                                <Text style={styles.buttonText}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.messageContainer}>
                            {successMessage != '' && 
                                <Text style={[styles.bigTextField, styles.successMessage]}>
                                    {successMessage}
                                </Text>
                            }
                            {errorMessage != '' && 
                                <Text style={[styles.bigTextField, styles.errorMessage]}>
                                    {errorMessage}
                                </Text>
                            }
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: '20%',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    headerContainer: {
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        paddingVertical: '2%',
        backgroundColor: colors.olive,
        shadowColor: colors.dark_brown,
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }, 
        elevation: 10,
        width: 350
    },
    photoContainer: {
        width: 350,
        height: 350,
        borderColor: colors.olive,
        borderWidth: 3,
        shadowColor: colors.dark_brown,
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 10 }, 
        elevation: 5,
    },
    messageContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: '5%'
    },
    inputContainer: {
        margin:'5%',
        width: '100%',
    },
    label: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 16,
        color: colors.dark_brown,
        marginBottom: 5
    },
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor: colors.dark_brown,
        paddingVertical: 5,
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: colors.dark_brown,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelButton: {
        backgroundColor: colors.olive,
    },
    textField: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 16,
        color: 'black'
    },
    successMessage: {
        color: colors.olive,
    },
    errorMessage: {
        color: colors.dark_brown,
    },
    bigTextField: {
        fontFamily: 'Londrina-Solid',
        fontSize: 20,
        color: 'black'
    },
    buttonText: {
        color: colors.tan,
        fontFamily: 'Londrina-Solid',
        fontSize: 16,
    },
})

export default ImageHandleScreen;