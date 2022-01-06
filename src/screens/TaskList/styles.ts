import { Platform, StyleSheet } from 'react-native'
import themes from '../../global/themes'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 3,
    },
    content: {
        flex: 7
    },
    title: {
        color: themes.colors.secondary,
        fontFamily: themes.fonts.lato300,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        color: themes.colors.secondary,
        fontFamily: themes.fonts.lato300,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 50
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: themes.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})