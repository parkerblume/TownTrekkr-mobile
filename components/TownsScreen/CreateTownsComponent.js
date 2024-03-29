import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import {colors, commonStyles} from '../../styles/commonStyles';
import { Ionicons } from '@expo/vector-icons';
import MapComponent from './MapComponent';
import { createTown, addUserToTown } from '../../api/authAPI';

const CreateTownsComponent = ({ userId, onClose }) => {
    const [townName, setTownName] = useState('');
    const [townDescription, setTownDescription] = useState('');
    const [mapCoordinates, setMapCoordinates] = useState(null);
    const [createButtonDisabled, setCreateButtonDisabled] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleTownNameChange = (name) => 
    {
        setTownName(name);
    };

    const handleTownDescriptionChange = (description) => 
    {
        setTownDescription(description);
    };

    const handleCoordinateChange = (topLeftCoord, bottomRightCoord) =>
    {
        if (topLeftCoord && bottomRightCoord)
        {
            setMapCoordinates({ topLeftCoord, bottomRightCoord });
            setCreateButtonDisabled(false);
        }
        else
        {
            setMapCoordinates(null);
            setCreateButtonDisabled(true);
        }
    };

    const handleCreateTown = async () => 
    {
        setErrorMessage('');
        try{
            let townData = await createTown(townName, townDescription, 
                mapCoordinates.topLeftCoord, mapCoordinates.bottomRightCoord, userId);
        
            if (!townData)
            {
                setErrorMessage('Failed to create your town... Try again!');
                return;
            }

            setCreateButtonDisabled(true);
            setSuccessMessage('Your town has been created!');
        } catch (error) {
            setErrorMessage('An error occured. Please try again later.');
        }
    };

    return(
        <View style={commonStyles.screenContainer}>
            <SafeAreaView style={styles.headerContainer} edges={['top']}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.textField}>Create Your Town!</Text>
                </View>
                <View style={styles.headerButtonContainer}>    
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close-sharp" size={30} color={colors.olive} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <KeyboardAvoidingView style={styles.keyboardAvoidingContainer} behavior={Platform.OS === 'ios' ? 'padding': 'height'}>
                <ScrollView style={styles.contentContainer} scrollEnabled={true}>
                    <View style={styles.mapContainer}>
                        <MapComponent onCoordinateChange={handleCoordinateChange}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputField}>
                            <Text style={[styles.label]}>Town Name</Text>
                            <TextInput 
                                style={styles.input}
                                onChangeText={handleTownNameChange}
                                value={townName}
                            />
                        </View>

                        <View style={styles.inputField}>
                            <Text style={[styles.label]}>Town Description</Text>
                            <TextInput 
                                style={styles.input}
                                onChangeText={handleTownDescriptionChange}
                                maxLength={64}
                                value={townDescription}
                                placeholder={'Just a quick little description of you town\'s area'}
                            />
                        </View>
                    </View>
                    <View style={styles.footerButtonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>
                                {successMessage !== '' ? 'Leave Screen' : 'Cancel'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                                style={[styles.button, 
                                    (createButtonDisabled || !mapCoordinates || townName === '' || townDescription === '') && styles.disabledButton]} 
                                disabled={(createButtonDisabled || !mapCoordinates || townName === '' || townDescription === '')} 
                                onPress={handleCreateTown}
                        >
                            <Text style={styles.buttonText}>Create Town</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.messageContainer}>
                        {successMessage !== '' && (
                            <Text style={[styles.textField, styles.successMessage]}>{successMessage}</Text>
                        )}
                        {errorMessage !== '' && (
                            <Text style={[styles.textField, styles.errorMessage]}>{errorMessage}</Text>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );

}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        backgroundColor: colors.dark_brown,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: colors.olive,
        borderBottomWidth: 5,
        paddingVertical: 10,
        paddingLeft:"2%",
        paddingRight:'2%'
    },
    headerTextContainer: {
        width: '75%',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
    },
    headerButtonContainer: {
        width: '25%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    contentContainer: {
        flex: 1,
        width: '100%'
    },
    keyboardAvoidingContainer: {
        flex: 1,
        width: '100%'
    },
    mapContainer: {
        width: '100%',
        height: 300,
        marginBottom:'2%',
        marginTop: '2%',
        borderColor: colors.olive,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        shadowColor: colors.dark_brown,
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }, 
        backgroundColor: colors.olive,
    },
    messageContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: '5%'
    },
    successMessage: {
        color: colors.olive,
    },
    errorMessage: {
        color: colors.dark_brown,
    },
    textField: {
        fontFamily: 'Londrina-Solid',
        fontSize: 20
    },
    inputContainer: {
        paddingHorizontal: '10%',
        paddingVertical: '5%',
    },
    inputField: {
        marginBottom: '5%',
    },
    label: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 16,
        color: colors.dark_brown,
        marginBottom: 5
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.dark_brown,
        paddingVertical: 5,
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 16
    },
    footerButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: colors.dark_brown,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelButton: {
        backgroundColor: colors.olive,
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: colors.tan,
        fontFamily: 'Londrina-Solid',
        fontSize: 16,
    },
})

export default CreateTownsComponent;