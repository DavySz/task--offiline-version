import { StyleSheet } from 'react-native'
import themes from '../../global/themes'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderRadius: 13,
        borderColor: '#555'
    },
    done: {
        width: 25,
        height: 25,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.done,
    },
    desc: {
        fontSize: 15,
        fontFamily: themes.fonts.lato300,
        color: themes.colors.mainText,
    },
    date: {
        fontSize: 12,
        color: themes.colors.mainText,
        fontFamily: themes.fonts.lato300,
    },
    trashContent: {
        position: 'absolute',
        right: 20
    }
})