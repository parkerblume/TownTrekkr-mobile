import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, SafeAreaView, Platform } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import { colors } from '../../styles/commonStyles';
import viewTownStyles from '../../styles/viewTownStyles';
import { getUserById } from '../../api/authAPI';
import getMidpointCoordinate from '../utils/getMidpointCoordinate';
import getRectangularCoordinates from '../utils/getRectangularCoordinates';
import calculateMapDeltas from '../utils/calculateMapDeltas';

const ViewTownModal = ({ isVisible, onClose, townObject, onPlayPress, onJoinPress, onDeletePress, onLeavePress, userId, username }) => {
    const [townMembers, setTownMembers] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [showLeaveButton, setShowLeaveButton] = useState(false);

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
                return { id: member.userId, username: user.username };
            })
        );

        console.log(townObject);

        setTownMembers(members);

        const isLeader = (townObject.leader === username);
        const isMember = members.some(member => member.id === userId);

        setShowDeleteButton(isLeader);
        setShowLeaveButton(!isLeader && isMember);
    };

    const handleMidPointCoordinate = () =>
    {
        if (townObject && townObject.coordinates)
        {
            const { topLeft, botRight } = townObject.coordinates;

            const midPoint = getMidpointCoordinate(topLeft, botRight);
            const mapDeltas = calculateMapDeltas(topLeft, botRight);

            return {...midPoint, ...mapDeltas};
        }

        return null;
    };
    const midPointCoord = handleMidPointCoordinate();

    const handleRectangularCoordinates = () =>
    {
        if (townObject && townObject.coordinates)
        {
            const { topLeft, botRight } = townObject.coordinates;
            const coords = getRectangularCoordinates(topLeft, botRight);
            return coords;
        }

        return [];
    };
    const polygonCoords = handleRectangularCoordinates();


    const renderMemberItem = ({ item }) =>
    {
        if (item.username === undefined) { return null; }

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
        <Modal isVisible={isVisible} onBackdropPress={onClose} transparent={false} >
            <SafeAreaView style={styles.modalContainer} edges={['top', 'bottom']}>
                <View style={styles.headerContainer}>
                    <Text style={styles.townName}>{townObject?.name}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.mapView}
                        initialRegion={{
                            longitude: midPointCoord.longitude,
                            latitude: midPointCoord.latitude,
                            latitudeDelta: midPointCoord.latitudeDelta,
                            longitudeDelta: midPointCoord.longitudeDelta,
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
                    <View style={styles.townDescriptionContainer}>
                        <Text style={styles.townDescription}>
                            {townObject.description}
                        </Text>
                    </View>
                    <View style={styles.infoButtonContainer}>
                        {onPlayPress && (
                            <TouchableOpacity style={styles.actionButton} onPress={() => onPlayPress(townObject)}>
                                <Text style={styles.actionButtonText}>Play</Text>
                            </TouchableOpacity>
                        )}
                        {onJoinPress && (
                            <TouchableOpacity style={styles.actionButton} onPress={() => onJoinPress(townObject.id)}>
                                <Text style={styles.actionButtonText}>Join</Text>
                            </TouchableOpacity>
                        )}
                        {showLeaveButton && (
                            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => onLeavePress(townObject.id, townObject.name)}>
                                <Text style={styles.actionButtonText}>Leave</Text>
                            </TouchableOpacity>
                        )}
                        {showDeleteButton && onDeletePress && (
                            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => onDeletePress(townObject.id, townObject.name)}>
                                <Text style={styles.actionButtonText}>Delete</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.listInfo}>
                        <Text style={styles.membersText}>Town Hall</Text>
                        <View style={styles.listHolder}>
                        <FlatList
                            data={townMembers}
                            renderItem={renderMemberItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContainer}
                        />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.tan,
        paddingTop: '5%',
        flex: 1,
        alignItems: 'center',
        width: '100%',
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
        marginLeft: '10%'
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
        height: "40%",
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
    townDescriptionContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3%',
        paddingVertical: '3%',
        borderBottomColor: colors.dark_brown,
        borderBottomWidth: 3,
        backgroundColor: colors.faded_tan,
        shadowColor: colors.dark_brown,
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }, 
        elevation: 10,
    },
    townDescription: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 20,
        color: colors.dark_brown
    },
    infoContainer: {
        flexGrow: 1,
        width: "100%",
        paddingBottom: '10%',
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
        marginHorizontal: '2%',
        borderRadius: 5,
        width: '45%',
        flex: 1,
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
    listHolder: {
        borderTopWidth: 3,
        borderTopColor: colors.dark_brown,
        borderBottomColor: colors.dark_brown,
        borderBottomWidth: 3,
        backgroundColor: colors.faded_tan
    },
    listContainer: {
        paddingTop: '3%',
        width: '100%',
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
        elevation: 5,
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