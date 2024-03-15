import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const BottomNavbar = ({ navigation }) => {
    const route = useRoute();
    const isActiveScreen = (screen) => route.name === screen;

    const handleNavigation = (screen) => {
        navigation.navigate(screen);
    }

    return (
        <SafeAreaView style={styles.navContainer} edges={['bottom']}>
            <TouchableOpacity
                style={[styles.navButton, isActiveScreen('GameScreen') && styles.activeButton]}
                onPress={() => handleNavigation('GameScreen')} 
            >
                <FontAwesome5 name="map-marked-alt" size={24} color={colors.tan} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.navButton, isActiveScreen('StatsScreen') && styles.activeButton]}
                // onPress={() => handleNavigation('StatsScreen')} 
            >
                <Ionicons name="stats-chart-outline" size={24} color={colors.tan} />
            </TouchableOpacity>
            <View style={styles.cameraContainer}>
                <TouchableOpacity
                    style={[styles.cameraButton, isActiveScreen('CameraScreen') && styles.activeButton]}
                    //onPress={() => handleNavigation('CameraScreen')} 
                >
                    <FontAwesome5 name="camera-retro" size={30} color={colors.tan} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.navButton, isActiveScreen('TownsScreen') && styles.activeButton]}
                //onPress={() => handleNavigation('TownsScreen')} 
            >
                <MaterialCommunityIcons name="home-group" size={24} color={colors.tan} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.navButton, isActiveScreen('ProfileScreen') && styles.activeButton]}
               //onPress={() => handleNavigation('ProfileScreen')} 
            >
                <MaterialIcons name="nordic-walking" size={24} color={colors.tan} />
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.dark_brown,
        borderTopColor: colors.olive,
        borderTopWidth: 2,
    },
    navButton: {
        padding: 10,
    },
    activeButton: {
        backgroundColor: colors.olive,
        borderRadius: 80,
        height: 'auto',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cameraContainer: {
        position: 'relative',
        bottom: 8
    },
    cameraButton: {
        backgroundColor: colors.olive,
        padding: 10,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
});

export default BottomNavbar;