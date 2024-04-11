import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/commonStyles';

export default PasswordRequirements = ({ password }) => {
  const containsLowercase = /[a-z]/.test(password);
  const containsUppercase = /[A-Z]/.test(password);
  const containsNumber = /\d/.test(password);
  const containsSpecialChar = /[!@#$%^&*]/.test(password);
  const hasMinLength = password.length >= 8;

  return (
    <View style={styles.container}>
        <View style={styles.requirementContainer}>
            <Text style={styles.label}>Your password must contain:</Text>
            <Text style={[styles.requirement, hasMinLength ? styles.met : styles.notMet]}>
                - At least 8 characters
            </Text>
            <Text style={[styles.requirement, containsLowercase ? styles.met : styles.notMet]}>
                - Lowercase letters (a-z)
            </Text>
            <Text style={[styles.requirement, containsUppercase ? styles.met : styles.notMet]}>
                - Uppercase letters (A-Z)
            </Text>
            <Text style={[styles.requirement, containsNumber ? styles.met : styles.notMet]}>
                - Numbers (0-9)
            </Text>
            <Text style={[styles.requirement, containsSpecialChar ? styles.met : styles.notMet]}>
                - Special characters (e.g. !@#$%^&*)
            </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      borderTopColor: colors.dark_brown,
      borderTopWidth: 1,
      borderBottomColor: colors.dark_brown,
      borderBottomWidth: 1,
      width: '80%',
      justifyContent:'center',
      alignItems:'center',
      marginBottom: 10
    },
    label: {
      fontFamily:'Londrina-Solid-Bold',
      fontSize: 15,
      marginBottom: 5,
    },
    requirementContainer: {
        justifyContent: 'center',
        alignItems:'baseline'
    },
    requirement: {
      fontFamily: 'Londrina-Solid-Light',
      justifyContent:'center',
      marginBottom: 3,
    },
    met: {
      color: 'green',
    },
    notMet: {
      color: 'red',
    },
  });