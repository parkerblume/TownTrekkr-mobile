import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/commonStyles';

const TownSelector = ({ currentTown, towns, onTownChange }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleTownChange = (town) => {
        //onTownChange(town);
        console.log("this is where town would change");
        setShowDropdown(false);
    }

    return (
        <View style={styles.container}>
        
            <TouchableOpacity style={styles.header} onPress={() => setShowDropdown(!showDropdown)}>
                <Text style={styles.headerText}>Currently Trekkn': {currentTown ? currentTown.name : 'No Town'}</Text>
                <Ionicons name={showDropdown ? 'chevron-up' : 'chevron-down'} size={20} color={colors.dark_brown} />
            </TouchableOpacity>
            {showDropdown && (
            <View style={styles.dropdown}>
            {towns.map((town) => (
                <TouchableOpacity
                key={town.id}
                style={styles.dropdownItem}
                onPress={() => handleTownChange(town)}
                >
                <Text style={styles.dropdownItemText}>{town.name}</Text>
                </TouchableOpacity>
            ))}
            </View>
        )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.olive,
        padding: 10,
        borderRadius: 10,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headerText: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 18,
        color: 'white',
      },
      dropdown: {
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      dropdownItem: {
        padding: 10,
      },
      dropdownItemText: {
        fontFamily: 'Londrina-Solid-Light',
        fontSize: 16,
      },
})

export default TownSelector;