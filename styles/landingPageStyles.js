import { colors } from './commonStyles';
import { StyleSheet } from 'react-native'; 

let pageStyles = StyleSheet.create({
    earthContainer: {
        width:'100%',
        paddingTop:75,
        justifyContent: 'center',
    }, 
    glView: {
        width: '100%', 
        aspectRatio: 1, 
        backgroundColor: 'transparent',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20, 
    }, 
    boxContainer: {
        width:'100%',
        position: 'absolute',
        bottom: 0,
    },
    cardContainer: {
        backgroundColor: colors.tan,
        borderRadius: 50,
        width: '100%',
        paddingHorizontal: 15,
    },
    cardTitle: {
        padding: 15,
        marginBottom:'10%'
    },
    cardFooter: {
        flex: 1,
        padding:15,
        paddingVertical:30
    },
    cardButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',   
        overflow: 'hidden',
    },
    button: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: colors.dark_brown
    },
});

export { pageStyles };