import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getPhotoImage } from '../../api/postAPI';
import {colors} from '../../styles/commonStyles';
import Swiper from 'react-native-swiper';

const PhotoGuessingArea = ({ photo }) => 
{
    const [photoUri, setPhotoUri] = useState(null);
    const [error, setError] = useState(null);

    const fetchImage = async () =>
    {
        try {
            const photoData = await getPhotoImage(photo);
            if (!photoData)
            {
                setError("We were not able to download this photo, sorry.");
            }

            setPhotoUri(photoData);
        } catch (error) {
            setError("Something went wrong in getting this photo, sorry.");
        }
    }

    useEffect(() => {
        fetchImage();
    }, [photo]);

    const handleGuess = () => {
    // do stuff with guess.
    // switch to a map view, for leaflet, etc.
    };

    return (
    <View style={styles.container}>
        <View style={styles.photoContainer}>
        {photoUri ? (
            <Image source={{ uri: photoUri }} 
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover" />
        ) : (
            <Text style={styles.loadingText}>Loading...</Text>
        )}
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    photoContainer: {
        width: 355,
        height: 355,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.olive,
        borderWidth: 3,
        shadowColor: colors.dark_brown,
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }, 
        elevation: 10,
    },
    loadingText: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 20,
        color: colors.dark_brown,
    }
});

export default PhotoGuessingArea;