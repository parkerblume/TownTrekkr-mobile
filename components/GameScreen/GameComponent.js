import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhotoGuessingArea from './PhotoGuessingArea';
import GuessMapComponent from './GuessMapComponent';
import {colors, commonStyles} from '../../styles/commonStyles';
import { getPostsByTown } from '../../api/postAPI';
import { FontAwesome } from '@expo/vector-icons';
import { postUserGuess } from '../../api/postAPI';

const GameComponent = ({ currentTown, userId, onRefresh }) =>
{
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGuessing, setIsGuessing] = useState(false);
  const [userGuessed, setUserGuessed] = useState(false);

  const fetchPhotos = async () =>
  {
    try {
      const allPhotos = await getPostsByTown(currentTown.id);

      if (allPhotos.error !== undefined || allPhotos.length < 1)
      {
        setError("No photos have been posted in this town!");
        return;
      }

      // create an object for the 3 fields we need
      const photosData = allPhotos.map(photo => ({
        postId: photo._id,
        fileId: photo.fileId,
        coordinateX: photo.coordinateX,
        coordinateY: photo.coordinateY
      }));
  
      setPhotos(photosData);
      setError(null);
      setLoading(false);
    } catch (error) {
      setError("Something went wrong trying to fetch photos of the town. Try again later.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, [currentTown, onRefresh]);

  const handleRating = (rating) => {
    console.log(rating);
  }

  const handleGuessButton = () =>
  {
    setIsGuessing(true);
  };

  const handleViewButton = () =>
  {
    setIsGuessing(false);
  };

  const handleUserGuessed = async (score = 0, distanceAway) =>
  {
    const post = await postUserGuess(userId, currentPhoto.postId, score, distanceAway);
    setUserGuessed(true);
  }

  const handleGetNextPhoto = () =>
  {
    setLoading(true);
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    setIsGuessing(false);
    setUserGuessed(false);
    setLoading(false);
  }

  if (error)
  {
    return (
      <SafeAreaView style={commonStyles.contentContainer}>
        <View style={styles.townHeader}>
              <Text style={styles.headerText}>
                  {currentTown ? currentTown.name : "Couldn't get town name..."}
              </Text>
          </View>
        <Text style={[styles.loadingText, styles.errorText]}>{error}</Text>
        <Text style={[styles.loadingText, styles.errorText]}>
          Hit the camera icon to start posting
        </Text>
      </SafeAreaView>
    );
  };

  const currentPhoto = photos[currentPhotoIndex];

  return (
      <SafeAreaView style={[commonStyles.contentContainer, {width: '100%'}]} edges={['top']}>
        <View style={styles.townHeader}>
            <Text style={styles.headerText}>
                {currentTown ? currentTown.name : "Couldn't get town name..."}
            </Text>
        </View>
        <View style={styles.gameContainer}>
            {loading ? (
                <>
                  <ActivityIndicator size='large' color={colors.dark_brown} />
                  <Text style={styles.loadingText}> Currently loading photos... </Text>
                </>
            ) : (
              isGuessing? (
                <View style={styles.mapHolder}>
                  <GuessMapComponent
                    photo={currentPhoto}
                    townCoordinates={currentTown.coordinates}
                    handleGuess={handleUserGuessed}
                  />
                </View>
              ) : (
                currentPhoto && (
                  <PhotoGuessingArea
                      photo={currentPhoto.fileId}
                  />
                )
              )
            )}
          <View style={styles.interactiveContainer}>
            <View style={styles.ratingsContainer}>
                <FontAwesome
                    name="thumbs-o-up"
                    size={25}
                    color="green"
                    onPress={() => handleRating("good")}
                />
                <FontAwesome style={{marginHorizontal: 10}}
                    name="thumbs-o-down"
                    size={25}
                    color="red"
                    onPress={() => handleRating("bad")}
                />
            </View>
            <View style={styles.buttonContainer}>
              {userGuessed ? (
                <TouchableOpacity style={styles.guessButton} onPress={handleGetNextPhoto}>
                      <Text style={styles.textField}>Next Photo</Text>
                  </TouchableOpacity>
              ) : ( isGuessing ? (
                    <TouchableOpacity style={styles.guessButton} onPress={handleViewButton}>
                        <Text style={styles.textField}>View Photo</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.guessButton} onPress={handleGuessButton}>
                        <Text style={styles.textField}>Guess</Text>
                    </TouchableOpacity>
                  )
                )   
              }
            </View>
          </View>
          <View style={styles.footerContainer}>
              {/* <Text style={[styles.textField, {fontSize: 15}]}> 
                  Bad picture or inappropriate?&nbsp;
              </Text>
              <Text style={styles.linkText}>Report it</Text> */}
              
          </View>
      </View>
    </SafeAreaView>
  );
}

export default GameComponent;

const styles = StyleSheet.create({
  mapHolder: {
    width: "100%",
  },
  townHeader: {
    marginTop:10,
    paddingTop: '10%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'Londrina-Solid',
    fontSize: 30,
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  },
  loadingText: {
    fontFamily: 'Londrina-Solid-Light',
    fontSize: 20,
    color: colors.dark_brown
  },
  errorText: {
    color: colors.dark_brown
  },
});