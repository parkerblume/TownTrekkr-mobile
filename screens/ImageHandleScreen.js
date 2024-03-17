import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import {commonStyles, colors} from '../styles/commonStyles';
import CameraOptions from '../components/ImageHandle/CameraOptions';
import { TextInput } from 'react-native-gesture-handler';

const ImageHandleScreen = ({ navigation, route }) => {
    const { imageResult, location } = route.params;
    const [title, setTitle] = useState('');

    const handleTitleChange = (text) =>
    {
        setTitle(text);
    }

    const handleUpload = () =>
    {
        console.log("This is where we would upload picture to wherever");
        console.log(location);
        console.log(title);

        navigation.goBack();
    }

    const handleCancel = () =>
    {
        navigation.goBack();
    }

    return (
        <View style={commonStyles.screenContainer}>
            <View style={styles.photoContainer}>
                <Image source={{ uri: imageResult.uri }}
                        style={{ width: '100%', height: '100%' }}
                         />
            </View>
            <TextInput
                style={styles.inputContainer}
                placeholder='Enter a defining title...'
                value={title}
                onChangeText={handleTitleChange}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleUpload}>
                    <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        width: '100%',
        height: 40,
        borderColor: colors.dark_brown,
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: colors.olive,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10,
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