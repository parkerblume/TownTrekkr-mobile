import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { colors } from '../../styles/commonStyles';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';


const GuessMapComponent = ({photo, townCoordinates}) => {
    const [topLeftCoord, setTopLeftCoord] = useState(null);
    const [botRightCoord, setBotRightCoord] = useState(null);
    const [midPointCoord, setMidPointCoord] = useState(null);
    const [tooltipText, setTooltipText] = useState('Tap a spot on the map to set your guess!');
    const [userGuess, setUserGuess] = useState(null);
    const toolTipOpacity = useRef(new Animated.Value(0)).current;
    const currentTooltipText = useRef('');

    useEffect(() => {
        const setTownCoordinates = () =>
        {
            if (townCoordinates)
            {
                setTopLeftCoord(townCoordinates.topLeft);
                setBotRightCoord(townCoordinates.botRight);

                const midPointRegion = { 
                            latitude: ((townCoordinates.topLeft.latitude + townCoordinates.botRight.latitude) / 2),
                            longitude: ((townCoordinates.topLeft.longitude + townCoordinates.botRight.longitude) / 2)
                };
                console.log(midPointRegion);
                setMidPointCoord(midPointRegion);
            }
        }

        setTownCoordinates();
    }, [townCoordinates]);
    
    const changeTooltipText = (text) => 
    {
          Animated.timing(toolTipOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
          }).start(() => {
              setTooltipText(text);
              currentTooltipText.current = text;
            //   setShowResetIcon(topLeftCoord && bottomRightCoord);
              Animated.timing(toolTipOpacity, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: true,
              }).start();
          });
    }

    // gets the rectangular coordinates for displaying town's region on map display
    const getRectangularCoordinates = () => 
    {
    if (topLeftCoord && botRightCoord) {
        return [
            topLeftCoord,
            { latitude: topLeftCoord.latitude, longitude: botRightCoord.longitude }, // bottom left coord
            botRightCoord,
            { latitude: botRightCoord.latitude, longitude: topLeftCoord.longitude }, // top right coord
        ];
    }
    return [];
    };
    const polygonCoords = getRectangularCoordinates(); // Polygon does not like a function being passed to it

    console.log(topLeftCoord);
    console.log(botRightCoord);

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
                    >
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
                    <Text>Why</Text>
                </View>
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
        height: 300,
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
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: '2%'
    },
    toolTipText: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 14,
    },
})

export default GuessMapComponent;