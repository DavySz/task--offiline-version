import { StyleSheet } from 'react-native'
import themes from '../../global/themes'

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: themes.colors.overlay
    },
    container: {
        backgroundColor: themes.colors.secondary
    },
    header: {
        fontFamily: themes.fonts.lato300,
        backgroundColor: themes.colors.today,
        color: themes.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    input: {
        fontFamily: themes.fonts.lato300,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
        paddingHorizontal: 5
    },
    buttonsLabel: {
        margin: 20,
        marginRight: 30,
        color: themes.colors.today
    },
    date: {
        fontFamily: themes.fonts.lato300,
        fontSize: 20,
        marginLeft: 15
    }
})
