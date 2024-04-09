import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, SafeAreaView } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import { colors } from '../../styles/commonStyles';
import viewTownStyles from '../../styles/viewTownStyles';
import { getUserById } from '../../api/authAPI';
import getMidpointCoordinate from '../utils/getMidpointCoordinate';
import getRectangularCoordinates from '../utils/getRectangularCoordinates';

const ViewTownModal = ({ isVisible, onClose, townObject, onPlayPress, onJoinPress, onDeletePress }) => {
    const [townMembers, setTownMembers] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    useEffect(() => {
        if (townObject && townObject.townMembers)
        {
            fetchTownMembers();
        }
    }, [townObject]);

    const fetchTownMembers = async () =>
    {
        const members = await Promise.all(
            townObject.townMembers.map(async (member) =>
            {
                const user = await getUserById(member.userId);
                console.log(user);
                return { id: member.userId, username: user.username };
            })
        );

        setTownMembers(members);
        setShowDeleteButton(members.some(member => member.username === townObject.leader));
    };

    const handleMidPointCoordinate = () =>
    {
        console.log("handle Mid Point");
        if (townObject && townObject.coordinates)
        {
            console.log("Should not be in here right now");
            console.log("coords: ", townObject.coordinates);
            const { topLeft, botRight } = townObject.coordinates;

            return getMidpointCoordinate(topLeft, botRight);
        }

        return null;
    };
    const midPointCoord = handleMidPointCoordinate();

    const handleRectangularCoordinates = () =>
    {
        console.log("handle rectangular");
        if (townObject && townObject.coordinates)
        {
            console.log("should not be in here right now");
            console.log("coords: ", townObject.coordinates);
            const { topLeft, botRight } = townObject.coordinates;
            const coords = getRectangularCoordinates(topLeft, botRight);
            return coords;
        }

        return [];
    };
    const polygonCoords = handleRectangularCoordinates();


    const renderMemberItem = ({ item }) =>
    {
        return (
            <View style={styles.memberItem}>
                <View style={styles.memberInfoContainer}>
                    <Text style={styles.memberName}>{item.username}</Text>
                    {townObject.leader === item.username && (
                        <Text style={styles.leaderText}>Town Leader</Text>
                    )}
                </View>
            </View>
        );
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} transparent={false}>
            <SafeAreaView style={styles.modalContainer} edges={['top']}>
                <View style={styles.headerContainer}>
                    <Text style={styles.townName}>{townObject?.name}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.mapView}
                        initialRegion={{
                            longitude: midPointCoord.longitude,
                            latitude: midPointCoord.latitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                    {polygonCoords && (
                        <Polygon
                            coordinates={polygonCoords}
                            fillColor={colors.fill_transparancy_green}
                            strokeColor={colors.dark_green}
                        />
                    )}
                    </MapView>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.infoButtonContainer}>
                        {onPlayPress && (
                                <TouchableOpacity style={styles.actionButton} onPress={() => onPlayPress(townObject)}>
                                    <Text style={styles.actionButtonText}>Play</Text>
                                </TouchableOpacity>
                            )}
                        {onJoinPress && (
                            <TouchableOpacity style={styles.actionButton} onPress={() => onPlayPress(townObject)}>
                                <Text style={styles.actionButtonText}>Join</Text>
                            </TouchableOpacity>
                        )}
                        {showDeleteButton && (
                            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => onDeletePress(townObject.id, townObject.name)}>
                                <Text style={styles.actionButtonText}>Delete</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.listInfo}>
                        <Text style={styles.membersText}>Hall of Members</Text>
                        <FlatList
                            data={townMembers}
                            renderItem={renderMemberItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContainer}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.tan,
        borderRadius: 10,
        padding: 20,
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        flexDirection: 'row',
        paddingHorizontal: '5%',
    },
    townName: {
        fontFamily: 'Londrina-Solid',
        fontSize: 24,
        textAlign: 'center',
        flex: 1,
        marginLeft: '5%'
    },
    closeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.olive, 
        paddingVertical: "2%",
        paddingHorizontal: "4%",
        borderRadius: 5,
    },
    closeButtonText: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 18,
        color: colors.tan,
    },
    mapContainer: {
        width: '100%',
        height: "50%",
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
        flex: 1
    },
    infoContainer: {
        flex: 1,
        width: "100%",
    },
    infoButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '5%',
        paddingHorizontal: '4%',
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.olive, 
        paddingVertical: "3%",
        paddingHorizontal: "2%",
        borderRadius: 5,
        width: '45%',
    },
    deleteButton: {
        backgroundColor: colors.dark_brown
    },
    actionButtonText: {
        fontFamily: 'Londrina-Solid',
        fontSize: 18,
        color: colors.tan
    },
    listInfo: {
        flex: 1,
        width: '100%',
    },
    listContainer: {
        paddingTop: '3%',
        width: '100%',
        borderTopWidth: 2,
        borderTopColor: colors.dark_brown,
        borderBottomColor: colors.dark_brown,
        borderBottomWidth: 3,
        backgroundColor: colors.faded_tan,
        flex: 1,
    },
    membersText: {
        fontFamily: 'Londrina-Solid',
        fontSize: 24,
        color: colors.dark_brown,
        marginBottom: '3%',
        textAlign: 'left',
        paddingHorizontal: '4%',
    },
    memberItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        backgroundColor: colors.tan,
        marginHorizontal: '3%',
        marginBottom: '3%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        shadowColor: colors.dark_brown,
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }, 
        elevation: 1,
        borderColor: colors.dark_brown
    },
    memberInfoContainer: {
        flex: 1,
        marginRight: 10,
    },
    memberName: {
        fontFamily: 'Londrina-Solid',
        fontSize: 18,
        color: colors.dark_brown,
    },
    leaderText: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 15,
        color: colors.dark_green,
    },
});

export default ViewTownModal;