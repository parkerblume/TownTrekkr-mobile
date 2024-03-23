import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {colors, commonStyles} from '../styles/commonStyles';
import BottomNavbar from '../components/BottomNavbar';
import AllTownsComponent from '../components/TownsScreen/AllTownsComponent';
import MyTownsComponent from '../components/TownsScreen/MyTownsComponent';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const TownsScreen = ({ navigation, route }) => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const userId = route.params;

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
                    <Tab.Navigator screenOptions={{ 
                                        headerShown: false,
                                        tabBarStyle: {
                                            "backgroundColor": colors.olive,
                                        },
                                        tabBarLabelStyle: {
                                            "fontFamily": 'Londrina-Solid-Light',
                                            "fontSize": 20
                                        },
                                        tabBarActiveTintColor: colors.dark_brown,
                                        tabBarInactiveTintColor: colors.tan,
                                        tabBarIndicatorStyle: {
                                            backgroundColor: colors.dark_brown,
                                        }
                                    }} 
                                    tabBarPosition='top'
                    >
                        <Tab.Screen name="All Towns" component={AllTownsComponent} />
                        <Tab.Screen name="My Towns" component={MyTownsComponent} />
                    </Tab.Navigator>
                </View>
            </NavigationContainer>
            {/* I'll be a modal here for creating a new town at some point */}
            <BottomNavbar navigation={navigation} userId={userId} /> 
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
        borderBottomColor: colors.olive,
        borderBottomWidth: 5,
    },
    headerTextContainer: {
        width: '75%',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
        paddingLeft: '5%',
    },
    headerButtonContainer: {
        width: '25%',
        paddingRight: '5%'
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