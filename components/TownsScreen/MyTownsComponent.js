import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { getTowns } from '../../api/authAPI';
import { colors } from '../../styles/commonStyles';
import viewTownStyles from '../../styles/viewTownStyles';
import * as RootNavigation from '../Navigation/RootNavigation';

const MyTownsComponent = ({ route }) => {
    const userId = route.params.userId;
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
            //console.log(towns);
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

    const renderTownItem = ({ item }) => {
        const topLeftCoord = {latitude: item.topLeftLat, longitude: item.topLeftLong};
        const botRightCoord = {latitude: item.botRightLat, longitude: item.botRightLong};
        const townObject = {
            id: item._id,
            name: item.name,
            coordinates: {
                topLeft: topLeftCoord,
                botRight: botRightCoord,
            }
        };

        return (
            <View style={viewTownStyles.townItem}>
                <View style={viewTownStyles.townInfoContainer}>
                    <Text style={viewTownStyles.townName}>{item.name}</Text>
                    <Text style={viewTownStyles.createdBy}>Created by: {item.creatingUsername}</Text>
                </View>
                <View style={viewTownStyles.townButtonsContainer}>
                    <TouchableOpacity style={viewTownStyles.viewButton} onPress={() => {/* Navigate to a Town View Model Compoent */}}>
                        <Text style={viewTownStyles.buttonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={viewTownStyles.playButton} onPress={() => handleOnPlayPress(townObject)}>
                        <Text style={viewTownStyles.buttonText}>Trek!</Text>
                    </TouchableOpacity>
                </View>
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