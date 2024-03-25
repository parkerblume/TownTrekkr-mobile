import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CameraOptions from '../ImageHandle/CameraOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomNavbar = ({ state, descriptors, navigation }) => {
    const [userId, setUserId] = useState(null);
    const [isCameraOptionsVisible, setIsCameraOptionsVisible] = useState(false);
    // const currentRoute = state.routes[state.index].name;
    // const isActiveScreen = (screen) => currentRoute.name === screen;

    useEffect(() => {
        console.log("Testing, just in case");
        getUserId();
      }, []);
    
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

    const toggleCameraOptions = () => {
        setIsCameraOptionsVisible(!isCameraOptionsVisible);
    };
    
    const handleImageConfirm = (imageResult, location) => {
        console.log(imageResult);
        navigation.navigate('ImageHandle', { imageResult, location });
        setIsCameraOptionsVisible(false);
    };

    return (
        <>
            <SafeAreaView style={styles.navContainer} edges={['bottom']}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, { userId });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };
                    
                    // set up the proper icons regarding each screen
                    let iconName;   
                    let IconComponent;

                    if (route.name === 'GameScreen')
                    {
                        iconName = 'map-marked-alt';
                        IconComponent = FontAwesome5;
                    }
                    else if (route.name === 'StatsScreen')
                    {
                        iconName = 'stats-chart-outline';
                        IconComponent = Ionicons;
                    }
                    else if (route.name === 'TownsScreen')
                    {
                        iconName = 'home-group';
                        IconComponent = MaterialCommunityIcons;
                    }
                    else if (route.name === 'ProfileScreen')
                    {
                        iconName = 'nordic-walking';
                        IconComponent = MaterialIcons;
                    }

                    if (route.name === 'ImageHandle')
                    {
                        return (
                            <View key={index} style={styles.cameraContainer}>
                                <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraOptions}>
                                    <FontAwesome5 name="camera-retro" size={30} color={colors.tan} />
                                </TouchableOpacity>
                            </View>
                        );
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={[styles.navButton, isFocused && styles.activeButton]}
                        >
                            <IconComponent name={iconName} size={24} color={isFocused ? colors.olive : colors.tan} />
                        </TouchableOpacity>
                    );
                })}
                {/* <TouchableOpacity
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
                        style={styles.cameraButton}
                        onPress={toggleCameraOptions} 
                    >
                        <FontAwesome5 name="camera-retro" size={30} color={colors.tan} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.navButton, isActiveScreen('TownsScreen') && styles.activeButton]}
                    onPress={() => handleNavigation('TownsScreen')} 
                >
                    <MaterialCommunityIcons name="home-group" size={24} color={colors.tan} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.navButton, isActiveScreen('ProfileScreen') && styles.activeButton]}
                //onPress={() => handleNavigation('ProfileScreen')} 
                >
                    <MaterialIcons name="nordic-walking" size={24} color={colors.tan} />
                </TouchableOpacity> */}

            </SafeAreaView>

            { isCameraOptionsVisible && <CameraOptions isVisible={isCameraOptionsVisible} onClose={toggleCameraOptions} onImageConfirm={handleImageConfirm} /> }
        </>
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
        padding: 12,
    },
    activeButton: {
        borderTopColor: colors.olive,
        borderTopWidth: 3,
        shadowColor: colors.background,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
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