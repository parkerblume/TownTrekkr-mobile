import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl, Alert } from 'react-native';
import { getTowns, deleteTown } from '../../api/authAPI';
import { colors } from '../../styles/commonStyles';
import viewTownStyles from '../../styles/viewTownStyles';
import * as RootNavigation from '../Navigation/RootNavigation';
import ViewTownModal from './ViewTownModal';
import { removeUserFromTown } from '../../api/authAPI';

const MyTownsComponent = ({ route }) => {
    const userId = route.params.userId;
    const username = route.params.username;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTown, setSelectedTown] = useState(false);
    const [deletedTownIds, setDeletedTownIds] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [userTowns, setUserTowns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTowns();
    }, []);

    const fetchTowns = async () => 
    {
        setLoading(true);
        setError(null);

        try {
            const towns = await getTowns(userId);
            setUserTowns(towns);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const refreshTowns = async () =>
    {
        setRefreshing(true);
        setUserTowns([]);
        await fetchTowns().then(() => setRefreshing(false));
        //setRefreshing(false);
    }

    const handleOnPlayPress = (townObject) =>
    {
        console.log("we hit paly");
        setIsModalVisible(false);
        RootNavigation.navigate('GameScreen', { userId, currentTown: { townObject } })
    }

    if (loading) 
    {
        return (
            <View style={viewTownStyles.loadingContainer}>
                <Text style={viewTownStyles.loadingText}>Loading your towns...</Text>
            </View>
        );
    }

    if (error) 
    {
        return (
            <View style={viewTownStyles.errorContainer}>
                <Text style={viewTownStyles.errorText}>
                    Sorry, we couldn't find any towns. Try again or find some towns to trek in!
                </Text>
                <TouchableOpacity style={viewTownStyles.retryButton} onPress={fetchTowns}>
                    <Text style={viewTownStyles.buttonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleViewTown = (townObject) =>
    {
        setSelectedTown(townObject);
        setIsModalVisible(true);
    }

    const closeModal = () =>
    {
        setIsModalVisible(false);
        setSelectedTown(null);
    }

    const handleDeleteTown = async (townId, townName) =>
    {
        Alert.alert(
            'Confirm Delete',
            `Are you sure you want to delete ${townName}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const deleted = await deleteTown(townId);
                        if (deleted) 
                        { 
                            setDeletedTownIds([...deletedTownIds, townId]); 
                            closeModal(false);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleLeaveTown = async (townId, townName) =>
    {
        Alert.alert(
            'Leave town?',
            `Are you sure you want to leave ${townName}?`,
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: async () => {
                        const leaveTown = await removeUserFromTown(townId, userId);
                        if (leaveTown)
                        {
                            closeModal();
                            refreshTowns();
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const renderTownItem = ({ item, index }) => {
        const topLeftCoord = {latitude: item.topLeftLat, longitude: item.topLeftLong};
        const botRightCoord = {latitude: item.botRightLat, longitude: item.botRightLong};
        const townObject = {
            id: item._id,
            name: item.name,
            description: item.description,
            coordinates: {
                topLeft: topLeftCoord,
                botRight: botRightCoord,
            },
            townMembers: item.townMembers,
            leader: item.creatingUsername
        };

        if (deletedTownIds.includes(townObject.id))
        {
            return (
                <View style={[viewTownStyles.townItem, viewTownStyles.deletedTownItem]}>
                    <Text style={viewTownStyles.deletedTownText}>
                        {townObject.name} was deleted!
                    </Text>
                </View>
            );
        }

        return (
            <View style={viewTownStyles.townItem} key={`town-${index}`}>
                <View style={viewTownStyles.townInfoContainer}>
                    <Text style={viewTownStyles.townName}>{item.name}</Text>
                    <Text style={viewTownStyles.createdBy}>Created by: {item.creatingUsername}</Text>
                </View>
                <View style={viewTownStyles.townButtonsContainer}>
                    {townObject.leader === username && (
                        <TouchableOpacity style={viewTownStyles.deleteButton} onPress={() => handleDeleteTown(townObject.id, townObject.name)}>
                            <Text style={viewTownStyles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={viewTownStyles.viewButton} onPress={() => handleViewTown(townObject)}>
                        <Text style={viewTownStyles.buttonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={viewTownStyles.playButton} onPress={() => handleOnPlayPress(townObject)}>
                        <Text style={viewTownStyles.buttonText}>Trek!</Text>
                    </TouchableOpacity>
                </View>
                {isModalVisible && (
                    <ViewTownModal
                        isVisible={isModalVisible}
                        onClose={closeModal}
                        townObject={selectedTown}
                        onPlayPress={handleOnPlayPress}
                        onLeavePress={handleLeaveTown}
                        onDeletePress={handleDeleteTown}
                        userId={userId}
                        username={username}
                    />
                )}
            </View>
        );
    };
  
    return (
        <View style={viewTownStyles.contentContainer}>
            <FlatList
                data={userTowns}
                renderItem={renderTownItem}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={viewTownStyles.listContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refreshTowns}
                        colors={[colors.dark_brown, colors.olive]}
                        tintColor={colors.dark_green}
                    />
                }
                ListEmptyComponent={
                    <View style={viewTownStyles.emptyContainer}>
                        <Text style={viewTownStyles.emptyText}>
                            No towns found. Try joining others or create one!
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

export default MyTownsComponent;