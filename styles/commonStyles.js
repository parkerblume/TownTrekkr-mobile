import { StyleSheet } from 'react-native'; 

const colors = {
    background: '#ABC4AB',
    dark_brown: '#6D4C3D',
    dark_green: '#727D71',
    tan: '#DCC9B6',
    faded_tan: '#E9DDD1',
    olive: '#A39171',
    fill_transparancy_green: 'rgba(114, 125, 113, 0.5)',
    fill_very_transparent_green: 'rgba(114, 125, 113, 0.15)',
    danger_red: '#8C001C'
};

const commonStyles = StyleSheet.create({
    screenContainer: {
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: colors.background,
        width: '100%'
    },
    contentContainer: {
        backgroundColor: colors.background,
        flex: 1,
    },
    keyboardAvoidingContainer: {
        flex: 1,
        width: '100%'
    },
    scrollViewContainer: {
        flex: 1,
        width: '100%'
    }
});

export { colors, commonStyles };