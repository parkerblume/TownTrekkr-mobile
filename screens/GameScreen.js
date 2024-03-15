import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PhotoGuessingArea from '../components/PhotoGuessingArea';
import {colors, commonStyles} from '../styles/commonStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

const GameScreen = ({ userId, navigation }) => {
  const [currentTown, setCurrentTown] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    // How we would possible fetch a user's town based on their id, and then grab the photos.
    // fetchUserTown(userId)
    //   .then((town) => {
    //     setCurrentTown(town);
    //     fetchPhoto(town ? town.id : null)
    //       .then((photoUrl) => setPhotoUrl(photoUrl))
    //       .catch((error) => console.error(error));
    //   })
    //   .catch((error) => console.error(error));
  }, [userId]);

  const handleTownChange = (newTown) => {
    // setCurrentTown(newTown);
    // fetchPhoto(newTown.id)
    //   .then((photoUrl) => setPhotoUrl(photoUrl))
    //   .catch((error) => console.error(error));
  };

  return (
    <View style={commonStyles.screenContainer}>
      <View style={styles.townHeader}>
        <Text style={styles.headerText}>
            {currentTown ? `Current Town: ${currentTown.name}` : 'No towns you\'re trekkn\' in yet... '}
        </Text>
      </View>
      <View style={styles.gameContainer}>
        <PhotoGuessingArea
          photoUrl={photoUrl ? photoUrl : null}
          townId={currentTown ? currentTown.id : null}
        />
      </View>
      {/* ) : (
        <Text>Loading...</Text>
      )} */}
      {/* {!currentTown && (
        <TouchableOpacity onPress={() => navigation.navigate('TownsScreen')}>
          <Text style={styles.link}>Go find some towns</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  townHeader: {
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    width: '100%',
    height: '10%',
    backgroundColor: colors.dark_brown,
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  headerText: {
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: 'Londrina-Solid-Light',
    fontSize: 20
  },
  gameContainer: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default GameScreen;