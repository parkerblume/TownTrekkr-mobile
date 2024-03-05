import { colors } from './commonStyles';
import { StyleSheet } from 'react-native'; 

let pageStyles = StyleSheet.create({
    earthContainer: {
        width:'100%',
        paddingTop:50,
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
        paddingVertical:40
    },
    cardButtons: {
        flexDirection: 'row',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 1,
        overflow: 'hidden',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10
    },
});

export { pageStyles };