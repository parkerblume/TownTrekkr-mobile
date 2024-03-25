import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated, TextInput, ScrollView } from 'react-native';
import {colors, commonStyles} from '../../styles/commonStyles';
import { Ionicons } from '@expo/vector-icons';

const CreateTownsComponent = ({ userId, onClose }) => {
    const [townName, setTownName] = useState('');
    const [townDescription, setTownDescription] = useState('');

    const handleTownNameChange = (name) => 
    {
        setTownName(name);
    }

    const handleTownDescriptionChange = (description) => 
    {
        setTownDescription(description);
    }

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
            <ScrollView style={styles.contentContainer} scrollEnabled={true}>
                <View style={styles.mapContainer}>

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
                            value={townDescription}
                            placeholder={'Just a quick little description of you town\'s area'}
                        />
                    </View>
                </View>
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} >
                        <Text style={styles.buttonText}>Create Town</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        paddingHorizontal: '2%'
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
        backgroundColor: colors.olive,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        width: '40%',
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

export default CreateTownsComponent;