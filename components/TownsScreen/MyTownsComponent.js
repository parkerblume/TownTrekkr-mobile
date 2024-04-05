import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { getTowns } from '../../api/authAPI';
import {colors, commonStyles} from '../../styles/commonStyles';
import * as RootNavigation from '../Navigation/RootNavigation';

const MyTownsComponent = ({ route }) => {
    const userId = route.params.userId;
    const [userTowns, setUserTowns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(userId);

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

    const handleOnPlayPress = (townId, townName) =>
    {
        RootNavigation.navigate('GameScreen', { userId, currentTown: { id: townId, name: townName } })
    }

    if (loading) 
    {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading your towns...</Text>
            </View>
        );
    }

    if (error) 
    {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                    Sorry, we couldn't find any towns. Try again or find some towns to trek in!
                </Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchTowns}>
                    <Text style={styles.buttonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderTownItem = ({ item }) => (
        <View styles={styles.townItem}>
            <View style={styles.townInfoContainer}>
                <Text style={styles.townName}>{item.name}</Text>
                <Text style={styles.createdBy}>Created by: {item.creatingUsername}</Text>
            </View>
            <View style={styles.townButtonsContainer}>
                <TouchableOpacity style={styles.viewButton} onPress={() => {/* Navigate to a Town View Model Compoent */}}>
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.playButton} onPress={() => handleOnPlayPress(item._id, item.name)}>
                    <Text style={styles.buttonText}>Trek!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  
    return (
        <View style={styles.contentContainer}>
            <FlatList
                data={userTowns}
                renderItem={renderTownItem}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            No towns found. Try joining others or create one!
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.tan,
    },
    listContainer: {
        paddingVertical: 10,
        width: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        fontFamily: 'Londrina-Solid',
        fontSize: 18,
        color: colors.dark_brown,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontFamily: 'Londrina-Solid',
        fontSize: 18,
        color: colors.dark_brown,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: colors.olive,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontFamily: 'Londrina-Solid',
        fontSize: 18,
        color: colors.dark_brown,
        textAlign: 'center',
    },
    townItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.tan,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    townInfoContainer: {
        flex: 1,
    },
    townName: {
        fontFamily: 'Londrina-Solid',
        fontSize: 18,
        color: colors.dark_brown,
    },
    createdBy: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 14,
        color: colors.dark_green,
    },
    townButtonsContainer: {
        flexDirection: 'row',
    },
    viewButton: {
        backgroundColor: colors.olive,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 10,
    },
    playButton: {
        backgroundColor: colors.dark_green,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 14,
        color: colors.tan,
    },
});

export default MyTownsComponent;