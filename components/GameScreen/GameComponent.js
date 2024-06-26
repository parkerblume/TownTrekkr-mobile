import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhotoGuessingArea from './PhotoGuessingArea';
import GuessMapComponent from './GuessMapComponent';
import {colors, commonStyles} from '../../styles/commonStyles';
import { getPostsByTown } from '../../api/postAPI';
import { FontAwesome } from '@expo/vector-icons';
import { postUserGuess, userRatePost } from '../../api/postAPI';
import { MaterialIcons } from '@expo/vector-icons';

const GameComponent = ({ currentTown, userId, onRefresh }) =>
{
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGuessing, setIsGuessing] = useState(false);
  const [userGuessed, setUserGuessed] = useState(false);
  const [userRating, setUserRating] = useState(null);

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

  const handleRating = async (rating) => {
    const rated = await userRatePost(currentPhoto.postId, userId, rating === 'like' ? 1 : 0);
    if (rated) { setUserRating(rating); }
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
    setIsGuessing(false);
    setUserGuessed(false);
    setUserRating(null);

    console.log(currentPhotoIndex, photos.length);

    if (currentPhotoIndex + 1 >= photos.length)
    {
      console.log('no more photos');
      setError('There\'s no more photos to guess in this town!');
    }
    else
    {
      setLoading(true);
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1));
      setLoading(false);
    }

    console.log(currentPhotoIndex, photos.length);
  }

  if (error)
  {
    return (
      <SafeAreaView style={styles.contentContainer} edges={['top']}>
          <View style={styles.townHeader}>
                <Text style={styles.headerText}>
                    {currentTown ? currentTown.name : "Couldn't get town name..."}
                </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.headerTextBrown}>
                  Hold on!
              </Text>
            <MaterialIcons name="nordic-walking" size={100} color={colors.dark_brown} />
            <View style={styles.textContainer}>
                <Text style={styles.textFieldError}>
                  There's no more photos to guess!
                </Text>
                <TouchableOpacity style={styles.townButton}>
                <Text style={styles.buttonText}>Hit the camera icon to start posting</Text>
                </TouchableOpacity>
            </View>
            </View>
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
                    name={userRating === 'like' ? 'thumbs-up' : 'thumbs-o-up'}
                    size={25}
                    color="green"
                    style={{ opacity: 0.5 }}
                    onPress={() => handleRating('like')}
                />
                <FontAwesome style={{marginHorizontal: 10, opacity: 0.5}}
                    name={userRating === 'dislike' ? 'thumbs-down' : 'thumbs-o-down'}
                    size={25}
                    color="red"
                    onPress={() => handleRating("dislike")}
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
  headerTextBrown: {
    fontFamily: 'Londrina-Solid-Bold',
    fontSize: 30,
    color: colors.dark_brown
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
    padding: '10%',
    borderColor: colors.olive,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    shadowColor: colors.dark_brown,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }, 
    elevation: 10,
    backgroundColor: colors.olive,
  },
  textFieldError: {
    fontFamily: 'Londrina-Solid',
    fontSize: 18,
  },
  townButton: {
    backgroundColor: colors.olive,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'Londrina-Solid-Light',
    fontSize: 15
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