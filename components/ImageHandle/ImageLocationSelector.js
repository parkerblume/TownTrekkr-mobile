import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { colors } from '../../styles/commonStyles';
import getRectangularCoordinates from '../utils/getRectangularCoordinates';
import getMidpointCoordinate from '../utils/getMidpointCoordinate';
import calculateMapDeltas from '../utils/calculateMapDeltas';
import isLocationInBounds from '../utils/isLocationInBounds';

const ImageLocationSelector = ({ coordinates, onConfirmPress, onCancelPress }) =>
{
    const { topLeft, botRight } = coordinates;
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isOutOfBounds, setIsOutOfBounds] = useState(false);
    const [tooltipText, setTooltipText] = useState('We weren\'t able to get your photos location, tap the map to set it!');
    const toolTipOpacity = useRef(new Animated.Value(0)).current;
    const currentTooltipText = useRef('');

    console.log('ImageLocationSelector', coordinates);

    const handleMapPress = (event) =>
    {
        console.log('ImageLocationSelector', coordinates);
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
    }
    
    useEffect(() => {
        if (!isDragging)
        {
            let text = ''
            if (selectedLocation)
            {
                // check if location is in bounds
                let isInBounds = isLocationInBounds(selectedLocation, topLeft, botRight);
                if (isInBounds)
                {
                    text = 'Press confirm to give your pretty little photo a title and post it!';
                    setIsOutOfBounds(false);
                }
                else 
                {
                    text = 'The photo\'s location must be in the town\'s region';
                    setIsOutOfBounds(true);
                }
            }
            else
            {
              text = 'We weren\'t able to get your photos location, tap the map to set it!';
            }

            if (text != currentTooltipText.current) { changeTooltipText(text) }
        }

    }, [selectedLocation]);

    // useEffect(() => {
    //     return () => {
    //         setSelectedLocation(null);
    //     };
    // }, []);

    const handleCancelPress = () =>
    {
        setSelectedLocation(null);
        onCancelPress();
    }

    const changeTooltipText = (text) => 
    {
        // Chain for seamless transitions between text tooltip
        Animated.timing(toolTipOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setTooltipText(text);
            currentTooltipText.current = text;
            Animated.timing(toolTipOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    }

    const polygonCoords = getRectangularCoordinates(topLeft, botRight);
    const midPointCoord = getMidpointCoordinate(topLeft, botRight);
    const mapDeltas = calculateMapDeltas(topLeft, botRight);

    const handleMarkerDrag = (coordinate) => 
    {
      setIsDragging(false);
      setSelectedLocation(coordinate);
    }

    return (
        <View style={styles.contentContainer}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.mapView}
                    initialRegion={{
                        latitude: midPointCoord.latitude,
                        longitude: midPointCoord.longitude,
                        latitudeDelta: mapDeltas.latitudeDelta,
                        longitudeDelta: mapDeltas.longitudeDelta
                    }}
                    onPress={handleMapPress}
                >
                    <Polygon
                        coordinates={polygonCoords}
                        fillColor={colors.fill_transparancy_green}
                        strokeColor={colors.dark_green}
                    />
                    {selectedLocation && 
                        <Marker 
                            draggable
                            pinColor={colors.dark_brown}
                            coordinate={selectedLocation}
                            onDragEnd={(event) => handleMarkerDrag(event.nativeEvent.coordinate)}
                        />
                    }
                </MapView>
                <View style={styles.toolTipContainer}>
                    <Animated.Text style={[styles.toolTipText, isOutOfBounds && styles.outOfBoundsText, { opacity: toolTipOpacity }]}>
                        {tooltipText}
                    </Animated.Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCancelPress}
                >
                    <Text style={styles.confirmButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, isOutOfBounds && styles.disabledButton]}
                    onPress={() => onConfirmPress(selectedLocation)}
                    disabled={isOutOfBounds}
                >
                    <Text style={styles.confirmButtonText}>Confirm Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
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
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
    },
    button: {
        backgroundColor: colors.dark_brown,
        paddingHorizontal: '3%',
        paddingVertical: 10,
        borderRadius: 5,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    disabledButton: {
        opacity: 0.5,
    },
    cancelButton: {
        backgroundColor: colors.olive,
    },
    confirmButtonText: {
        color: colors.tan,
        fontFamily: 'Londrina-Solid',
        fontSize: 20,
    },
    outOfBoundsText: {
        color: colors.danger_red
    },
});

export default ImageLocationSelector;