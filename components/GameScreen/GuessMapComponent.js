import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';
import { colors } from '../../styles/commonStyles';
import { MaterialIcons } from '@expo/vector-icons';
import calculateDistance from '../utils/calculateDistance';
import getMidpointCoordinate from '../utils/getMidpointCoordinate';
import getRectangularCoordinates from '../utils/getRectangularCoordinates';


const GuessMapComponent = ({photo, townCoordinates, handleGuess}) => {
    const [topLeftCoord, setTopLeftCoord] = useState(null);
    const [botRightCoord, setBotRightCoord] = useState(null);
    const [midPointCoord, setMidPointCoord] = useState(null);
    const [photoCoords, setPhotoCoords] = useState(null);
    const [guessWasMade, setGuessWasMade] = useState(false);
    const [guessDistance, setGuessDistance] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [tooltipText, setTooltipText] = useState('Tap on the map to set your guess');
    const [userGuess, setUserGuess] = useState(null);
    const [showGuessButton, setShowGuessButton] = useState(false);
    const toolTipOpacity = useRef(new Animated.Value(0)).current;
    const currentTooltipText = useRef('');

    useEffect(() => {
        const setCoordinates = () =>
        {
            if (townCoordinates)
            {
                setTopLeftCoord(townCoordinates.topLeft);
                setBotRightCoord(townCoordinates.botRight);

                const midPointRegion = getMidpointCoordinate(townCoordinates.topLeft, townCoordinates.botRight);

                setMidPointCoord(midPointRegion);
            }

            if (photo)
            {
                const coords = {
                    latitude: photo.coordinateX,
                    longitude: photo.coordinateY
                };

                setPhotoCoords(coords);
            }
        }

        setCoordinates();
    }, [townCoordinates]);

   useEffect(() => {
        if (!isDragging)
        {
            let text = ''
            if (userGuess)
            {
                text = 'Tap or drag to change your guess';
            }
            else 
            {
                text = 'Tap on the map to set your guess';
            }

            if (guessWasMade && guessDistance)
            {
                text = `Your guess was ${guessDistance.toFixed(2)} meters away!`;
            }
            

            if (text != currentTooltipText.current) { changeTooltipText(text) }
        }

    }, [userGuess, guessWasMade]);
    
    const changeTooltipText = (text) => 
    {
        Animated.timing(toolTipOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setTooltipText(text);
            currentTooltipText.current = text;
            setShowGuessButton(userGuess);
            Animated.timing(toolTipOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    }

    const handleMapPress = (event) => 
    {
      const { coordinate } = event.nativeEvent;
      console.log(coordinate);
      setUserGuess(coordinate);

      if (photoCoords)
      {
        const distance = calculateDistance(coordinate, photoCoords);
        setGuessDistance(distance);
      }
    };

    const handleMarkerDrag = (coordinate) => 
    {
      setUserGuess(coordinate);
      setIsDragging(true);
      if (photoCoords)
      {
        const distance = calculateDistance(coordinate, photoCoords);
        setGuessDistance(distance);
      }
    };

    const handleGuessButton = async () =>
    {
        setGuessWasMade(!guessWasMade);
        console.log("Handle guess in guess map component");
        handleGuess(0, guessDistance);
    };

    // gets the rectangular coordinates for displaying town's region on map display
    const handleRectangularCoordinates = () => 
    {
        if (topLeftCoord && botRightCoord) {
            return getRectangularCoordinates(topLeftCoord, botRightCoord);
        }
        return [];
    };
    const polygonCoords = handleRectangularCoordinates(); // Polygon does not like a function being passed to it

    return (
        <View style={styles.contentContainer}>
            <View style={styles.mapContainer}>
                {midPointCoord && ( 
                    <MapView style={styles.mapView}
                        initialRegion={{
                            latitude: midPointCoord.latitude,
                            longitude: midPointCoord.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        onPress={handleMapPress}
                    >
                    {userGuess &&
                        <Marker 
                        coordinate={userGuess} 
                        pinColor={colors.dark_brown}
                        draggable
                        onDragEnd={(event) => handleMarkerDrag(event.nativeEvent.coordinate)} />
                    }
                    {
                        guessWasMade && photoCoords && (
                            <>
                                <Marker
                                    coordinate={photoCoords}
                                />
                                <Polyline
                                    coordinates={[userGuess, photoCoords]}
                                    strokeColor={colors.dark_brown}
                                    strokeWidth={2}
                                    lineDashPattern={[5,5]}
                                />
                            </>
                        )
                    }
                    {polygonCoords.length > 1 && 
                        <Polygon
                        coordinates={polygonCoords}
                        fillColor={colors.fill_very_transparent_green}
                        strokeColor={colors.dark_green}
                        />
                    }
                    </MapView>
                )
                }
                <View style={styles.toolTipContainer}>
                    <Animated.Text style={[styles.toolTipText, { opacity: toolTipOpacity }]}>
                        {tooltipText}
                    </Animated.Text>
                    {showGuessButton && !guessWasMade && (
                        <Animated.View style={[styles.icons, { opacity: toolTipOpacity }]}>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleGuessButton}>
                                <Text style={styles.confirmText}>
                                    Guess!
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                </View>
                {/* Make a view that displays how far the user's guess was from the photo's marker */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        width: "100%",
    },
    mapContainer: {
        width: '100%',
        height: 400,
        marginBottom:'2%',
        marginTop: '2%',
        borderColor: colors.olive,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        shadowColor: colors.dark_brown,
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }, 
        backgroundColor: colors.olive,
    },
    mapView: {
        flex: 1,
    },
    toolTipContainer: {
        height: '10%',
        width: '100%',
        paddingHorizontal: "5%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    toolTipText: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 18,
    },
    icons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    confirmButton: {
        backgroundColor: colors.dark_brown,
        borderRadius: 5,
        paddingVertical: "4%",
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmText: {
        fontFamily: "Londrina-Solid-Light",
        fontSize: 15,
        color: colors.tan
    },
    distanceContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    distanceText: {
    fontFamily: 'Londrina-Solid-Light',
    fontSize: 18,
    },
})

export default GuessMapComponent;