import { StyleSheet } from 'react-native'; 

const colors = {
    background: '#ABC4AB',
    buttonPrimary: '#6D4C3D',
    greenAccent: '#727D71',
    tan: '#DCC9B6',
    olive: '#A39171'
};

const commonStyles = StyleSheet.create({
    screenContainer: {
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: colors.background,
        width: '100%'
    },
});

export { colors, commonStyles };