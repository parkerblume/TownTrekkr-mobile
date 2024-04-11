import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { getTowns } from '../../api/authAPI';
import { colors } from '../../styles/commonStyles';
import viewTownStyles from '../../styles/viewTownStyles';
import { addUserToTown } from '../../api/authAPI';
import ViewTownModal from './ViewTownModal';
import * as RootNavigation from '../Navigation/RootNavigation';

const AllTownsComponent = ({ route  }) => {
    const userId = route.params.userId;
    const [towns, setTowns] = useState([]);
    const [page, setPage] = useState(1); // for API pagination
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTown, setSelectedTown] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTowns();
    }, []);

    useEffect(() => {
        if (page > 1) {
            fetchTowns();
        }
    }, [page]);

    const fetchTowns = async () => 
    {
        setLoading(true);
        setError(null);

        try {
            const newTowns = await getTowns(null, page);
            const filteredTowns = newTowns.filter((town) => {
                return !town.townMembers.some((member) => member.userId === userId);
            })
            setTowns((prevTowns) => [...prevTowns, ...filteredTowns]);
            setHasMore(newTowns.length > 0)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const refreshTowns = async () =>
    {
        setRefreshing(true);
        setPage(1);
        setTowns([]);
        await fetchTowns();
        setRefreshing(false);
    }

    const loadMore = () =>
    {
        if (!loading && hasMore)
        {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleJoinTown = async (townId) =>
    {
        const joined = await addUserToTown(townId, userId);
        if (joined) { refreshTowns(); }
    };

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

    const renderFooter = () =>
    {
        if (!hasMore) return null;
        return (
            <View style={viewTownStyles.loadingFooter}>
                <Text style={viewTownStyles.loadingText}>Loading more towns...</Text>
            </View>
        );
    }

    if (error) 
    {
        return (
            <View style={viewTownStyles.errorContainer}>
                <Text style={viewTownStyles.errorText}>
                    Sorry, we couldn't find any towns. Try again later.
                </Text>
                <TouchableOpacity style={viewTownStyles.retryButton} onPress={fetchTowns}>
                    <Text style={viewTownStyles.buttonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderTownItem = ({ item, index }) => 
    {
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

        return (
            <View style={viewTownStyles.townItem} key={`town-${index}`}>
                <View style={viewTownStyles.townInfoContainer}>
                    <Text style={viewTownStyles.townName}>{item.name}</Text>
                    <Text style={viewTownStyles.createdBy}>Created by: {item.creatingUsername}</Text>
                </View>
                <View style={viewTownStyles.townButtonsContainer}>
                    <TouchableOpacity style={viewTownStyles.viewButton} onPress={() => handleViewTown(townObject)}>
                        <Text style={viewTownStyles.buttonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={viewTownStyles.playButton} onPress={() => handleJoinTown(townObject.id)}>
                        <Text style={viewTownStyles.buttonText}>Join!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
  
    return (
        <View style={viewTownStyles.contentContainer}>
            <FlatList
                data={towns}
                renderItem={renderTownItem}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={viewTownStyles.listContainer}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
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
            {isModalVisible && (
                <ViewTownModal
                    isVisible={isModalVisible}
                    onClose={closeModal}
                    townObject={selectedTown}
                    onJoinPress={handleJoinTown}
                    userId={userId}
                />
            )}
        </View>
    );
}   

export default AllTownsComponent;