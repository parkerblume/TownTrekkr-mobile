import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { colors } from '../../styles/commonStyles';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

const MapComponent = ({ onCoordinateChange }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [topLeftCoord, setTopLeftCoord] = useState(null);
    const [bottomRightCoord, setBottomRightCoord] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [tooltipText, setTooltipText] = useState('Press and drag to change each corresponding marker!');
    const [showResetIcon, setShowResetIcon] = useState(true);
    const toolTipOpacity = useRef(new Animated.Value(0)).current;
    const currentTooltipText = useRef('');
    
    useEffect(() => {
        const getUserLocation = async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);

            // pre-render a region on mount
            // const { latitude, longitude } = location.coords;
            // setTopLeftCoord({ latitude: latitude + 0.005, longitude: longitude - 0.005 });
            // setBottomRightCoord({ latitude: latitude - 0.005, longitude: longitude + 0.005 });
          }
        };
    
        getUserLocation();
      }, []);

      useEffect(() => {
        console.log("Use effect");
        if (!isDragging)
        {
            let text = ''
            if (topLeftCoord && bottomRightCoord)
            {
              text = 'Press and drag to change each corresponding marker!';
            }
            else if (topLeftCoord)
            {
              text = 'Tap to set the bottom right marker!';
            }
            else
            {
              text = 'To set your region, tap the map to place the marker!';
            }
    
            if (text != currentTooltipText.current) { changeTooltipText(text) }
        }

        handleCoordinatesChange();
      }, [topLeftCoord, bottomRightCoord])

      const changeTooltipText = (text) => 
      {
            Animated.timing(toolTipOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setTooltipText(text);
                currentTooltipText.current = text;
                setShowResetIcon(topLeftCoord && bottomRightCoord);
                Animated.timing(toolTipOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            });
      }

      const handleMapPress = (event) => 
      {
        console.log("map press");
        const { coordinate } = event.nativeEvent;
        if (!topLeftCoord) {
          setTopLeftCoord(coordinate);
        } else if (!bottomRightCoord) {
          setBottomRightCoord(coordinate);
        }
      };

      const handleMarkerDrag = (coordinate, corner) => 
      {
        if (corner === 'topLeftCorner')
        {
            setTopLeftCoord(coordinate);
        }
        else
        {
            setBottomRightCoord(coordinate);
        }

        setIsDragging(true);
      }

      const handleCoordinatesChange = () => 
      {
        console.log(topLeftCoord, bottomRightCoord);
        if (topLeftCoord && bottomRightCoord) 
        { 
            console.log("not null coords");
            onCoordinateChange(topLeftCoord, bottomRightCoord); 
        }
        else
        {
            console.log("null coord");
            onCoordinateChange(null, null);
        }
      }

      const handleRestartCoordinates = () => 
      {
        setTopLeftCoord(null);
        setBottomRightCoord(null);
        setIsDragging(false);
      }

      // gets the rectangular coordinates for displaying town's region on map display
      const getRectangularCoordinates = () => 
      {
        if (topLeftCoord && bottomRightCoord) {
          return [
            topLeftCoord,
            { latitude: topLeftCoord.latitude, longitude: bottomRightCoord.longitude }, // bottom left coord
            bottomRightCoord,
            { latitude: bottomRightCoord.latitude, longitude: topLeftCoord.longitude }, // top right coord
          ];
        }
        return [];
      };
      const polygonCoords = getRectangularCoordinates(); // Polygon does not like a function being passed to it

      return (
        <View style={styles.container}>
            {userLocation && (
            <MapView
                style={styles.map}
                initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04,
                }}
                onPress={handleMapPress}
            >
                {topLeftCoord && 
                    <Marker 
                        coordinate={topLeftCoord} 
                        pinColor={colors.tan}
                        draggable
                        onDragEnd={(event) => handleMarkerDrag(event.nativeEvent.coordinate, "topLeftCorner")} />}
                {bottomRightCoord && 
                    <Marker 
                        coordinate={bottomRightCoord} 
                        pinColor={colors.tan}
                        draggable
                        onDragEnd={(event) => handleMarkerDrag(event.nativeEvent.coordinate, "bottomRightCorner")} />}
                {polygonCoords.length > 1 && 
                    <Polygon
                    coordinates={polygonCoords}
                    fillColor={colors.fill_transparancy_green}
                    strokeColor={colors.dark_green}
                    />
                }
            </MapView>
            )}
            <View style={styles.toolTipContainer}>
                <Animated.Text style={[styles.toolTipText, { opacity: toolTipOpacity }]}>
                    {tooltipText}
                </Animated.Text>
                {topLeftCoord && bottomRightCoord && showResetIcon &&
                    <Animated.View style={{ opacity: toolTipOpacity }}>
                        <MaterialIcons name="restart-alt" size={20} color="black" onPress={handleRestartCoordinates} />
                    </Animated.View>
                }
            </View>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
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
});

export default MapComponent;