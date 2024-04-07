import { StyleSheet } from 'react-native'; 
import { colors } from './commonStyles';

export default viewTownStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.background,
    },
    listContainer: {
        paddingVertical: 10,
        width: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
    },
    loadingFooter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
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
        backgroundColor: colors.background,
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
        width:'50%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.background,
    },
    emptyText: {
        fontFamily: 'Londrina-Solid',
        fontSize: 18,
        color: colors.dark_brown,
        textAlign: 'center',
    },
    townItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        backgroundColor: colors.tan,
        marginHorizontal: '3%',
        marginBottom: '3%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        shadowColor: colors.dark_brown,
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 }, 
        elevation: 1,
        borderColor: colors.dark_brown
    },
    townInfoContainer: {
        flex: 1,
        marginRight: 10,
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
        fontSize: 20,
        color: colors.tan,
    },
})