import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../styles/commonStyles';
import { launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions, requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import * as Location from 'expo-location';
import * as ImageManipulator from 'expo-image-manipulator';

const CameraOptions = ({ isVisible, onClose, onImageConfirm }) => {
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => 
  {
    Animated.timing(scaleAnimation, 
    {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  async function manipulatePhoto(photo)
  {
    let result = await ImageManipulator.manipulateAsync(
        photo.assets[0].uri,
        [
            {
                resize: {
                    width: 350,
                    height: 350,
                },
            },
        ],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    
    return result;
  }

  const handleTakePhoto = async () => 
  {
    const { status: cameraStatus } = await requestCameraPermissionsAsync();
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

    if (cameraStatus === 'granted' && locationStatus === 'granted')
    {
        const result = await launchCameraAsync({
            mediaTypes: MediaTypeOptions.Images,
            exif: true,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
            width: 350,
            height: 350,
        });

        if (!result.canceled) 
        {
            setIsProcessing(true);
            let locationData = await Location.getCurrentPositionAsync({});
            const location = locationData ? {
                latitude: locationData.coords.latitude,
                longitude: locationData.coords.longitude,
            } : null;

            const editedResult = await manipulatePhoto(result);

            console.log(editedResult);
            setIsProcessing(false);
            onImageConfirm(editedResult, location);
        }
    }
  }

  const handleUploadFromGallery = async () =>
  {
    const { status: mediaLibraryStatus } = await requestMediaLibraryPermissionsAsync();
    // const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

    if (mediaLibraryStatus === 'granted')
    {
        const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            exif: true,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
            width: 350,
            height: 350
        });

        if (!result.canceled)
        {
            const { exif } = result.assets[0];
            const location = exif ? {
                latitude: exif.GPSLatitude,
                longitude: exif.GPSLongitude,
            } : null;
            console.log(result);


            const editedResult = await manipulatePhoto(result);

            onImageConfirm(editedResult, location);
        }
    }
  }

  return (
    <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <Animated.View
            style={[
            styles.container,
            {
                transform: [{ scale: scaleAnimation }],
            },
            ]}
        >
            <View style={styles.speechBubble}>
                <Text style={{fontFamily: 'Londrina-Solid', fontSize: 15}}>Choose an option</Text>
                <View style={styles.cameraOptionsContainer}>
                    <TouchableOpacity style={styles.optionsButton} onPress={handleTakePhoto}>
                        <MaterialIcons name="add-a-photo" size={24} color={colors.dark_brown} 
                                        style={{marginRight: 5}}
                        />
                        <Text style={styles.textStyle}>Take a photo to upload</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cameraOptionsContainer}>
                    <TouchableOpacity style={styles.optionsButton} onPress={handleUploadFromGallery}>
                        <MaterialIcons name="photo-library" size={24} color={colors.dark_brown}
                                        style={{marginRight: 5}}
                        />
                        <Text style={styles.textStyle}>Choose a photo from gallery</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.speechBubbleArrow} />
        </Animated.View>
        {isProcessing && (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color={colors.tan} />
                <Text style={styles.loadingText}> Currently processing your photo... </Text>
            </View>
        )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 80,
    },
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loadingText: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 20,
        color: colors.tan
    },
    speechBubble: {
        backgroundColor: colors.tan,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 10,
        flexDirection: 'column',
    },
    speechBubbleArrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: colors.tan,
        transform: [{ rotate: '180deg' }],
    },
    cameraOptionsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    optionsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 6,
    },
    textStyle: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 20,
    }
});

export default CameraOptions;