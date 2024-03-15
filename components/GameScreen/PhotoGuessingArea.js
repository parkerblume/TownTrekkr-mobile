import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { FontAwesome } from '@expo/vector-icons';

const PhotoGuessingArea = ({ photoUrl, townId }) => {
  const handleGuess = () => {
    // do stuff with guess.
    // switch to a map view, for leaflet, etc.
  };
  
  const testPress = () => {
    console.log("test");
  }

  return (
    <View style={styles.container}>
        <View style={styles.photoContainer}>
            <Image source={{ uri: 'https://i.imgur.com/H7jKl6r.jpg' }} 
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover" />
        </View>
        <View style={styles.interactiveContainer}>
            <View style={styles.ratingsContainer}>
                <FontAwesome
                    name="thumbs-o-up"
                    size={25}
                    color="green"
                    onPress={testPress}
                />
                <FontAwesome style={{marginHorizontal: 10}}
                    name="thumbs-o-down"
                    size={25}
                    color="red"
                    onPress={testPress}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.guessButton} onPress={handleGuess}>
                    <Text style={styles.textField}>Guess</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.footerContainer}>
            <Text style={[styles.textField, {fontSize: 15}]}> 
                Woah, is that a penis?&nbsp;
            </Text>
            <Text style={styles.linkText}>Report it</Text>
            
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'baseline',
    },
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
    interactiveContainer: {
        marginTop: 10,
        width: 350,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingsContainer: {
        paddingLeft:'5%',
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    guessButton: {
        backgroundColor: colors.olive,
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        height: 30,
        borderRadius: 10,
    },
    textField: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 20,
    },
    footerContainer: {
        marginTop: 10,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    linkText: {
        textDecorationLine: 'underline',
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 15,
    }
});

export default PhotoGuessingArea;