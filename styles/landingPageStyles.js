import { colors } from './commonStyles';
import { StyleSheet, Platform } from 'react-native'; 

let pageStyles = StyleSheet.create({
    earthContainer: {
        width:'100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 2
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
        flex: 3,
        justifyContent: 'flex-end',
    },
    cardContainer: {
        backgroundColor: colors.tan,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        width: '100%',
        paddingHorizontal: 15,
        paddingBottom: Platform.OS === 'ios' ? 40 : 30,
        overflow: 'hidden'
    },
    cardTitle: {
        padding: 15,
        marginBottom:20
    },
    cardFooter: {
        paddingHorizontal:15,
        //paddingBottom: '10%',
    },
    cardButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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