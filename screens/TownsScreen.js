import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import {colors, commonStyles} from '../styles/commonStyles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllTownsComponent from '../components/TownsScreen/AllTownsComponent';
import MyTownsComponent from '../components/TownsScreen/MyTownsComponent';
import CreateTownsComponent from '../components/TownsScreen/CreateTownsComponent';

const Tab = createBottomTabNavigator();

const TownsScreen = ({ navigation, route }) => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [userCreatedTown, setUserCreatedTown] = useState(false);
    const userId = route.params.userId;
    const username = route.params.username;

    const toggleCreateModal = () => {
        setIsCreateModalVisible(!isCreateModalVisible);
    };

    return (
        <View style={commonStyles.screenContainer}>
            <SafeAreaView style={styles.headerContainer} edges={['top', 'left', 'right']}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.textField}>View your towns!</Text>
                </View>
                <View style={styles.headerButtonContainer}>
                    <TouchableOpacity style= {styles.createButton} onPress={toggleCreateModal}>
                        <Text style={styles.textField}>Create</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <NavigationContainer independent={true}>
                <View style={styles.tabContainer}>
                    <Tab.Navigator independent={true} screenOptions={{ 
                                        headerShown: false,
                                        tabBarStyle: {
                                            "backgroundColor": colors.olive,
                                            borderTopWidth: 0,
                                            elevation: 0,
                                            height: 70,
                                        },
                                        tabBarLabelStyle: {
                                            "fontFamily": 'Londrina-Solid-Light',
                                            "fontSize": 20
                                        },
                                        tabBarActiveTintColor: colors.tan,
                                        tabBarInactiveTintColor: colors.dark_brown,
                                        tabBarIndicatorStyle: {
                                            backgroundColor: colors.dark_brown,
                                        }
                                    }} 
                    >
                        <Tab.Screen name="All Towns" component={AllTownsComponent} initialParams={{ userId: userId }} />
                        <Tab.Screen name="My Towns" 
                            component={MyTownsComponent}
                            initialParams={{ userId: userId, username: username }}
                        />
                    </Tab.Navigator>
                </View>
            </NavigationContainer>
                                    
            <Modal
                animationType="slide"
                transparent={false}
                visible={isCreateModalVisible}
                onRequestClose={toggleCreateModal}
            >
                <CreateTownsComponent userId={userId} username={username} onClose={toggleCreateModal} />
            </Modal>

        </View>
    );
}

export default TownsScreen;

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        backgroundColor: colors.dark_brown,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '12%',
    },
    headerTextContainer: {
        width: '75%',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
        paddingLeft: '2%',
    },
    headerButtonContainer: {
        width: '25%',
        paddingRight: '2%'
    },
    createButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.olive,
        width: '100%', 
        height: '60%',
        borderRadius: 5,
    },
    tabContainer: {
        width: '100%',
        backgroundColor: colors.olive,
        flex: 1
    },
    textField: {
        fontFamily: 'Londrina-Solid',
        fontSize: 20
    }
})