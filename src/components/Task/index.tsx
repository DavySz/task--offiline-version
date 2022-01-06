import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import 'moment/locale/pt-br'
import moment from 'moment'

import { styles } from './styles'
import themes from '../../global/themes'

type Props = {
    id: number;
    desc: string;
    estimateAt: Date | undefined;
    doneAt: Date | null;
    toggleTask: (id: number) => void;
    onDelete: (id: number) => void
}

export function Task({
    desc,
    estimateAt,
    doneAt,
    id,
    toggleTask,
    onDelete
}: Props) {

    const doneOrNotStyle = doneAt ? 'line-through' : 'none'
    const date = doneAt ? doneAt : estimateAt
    const dateFormatted = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    function getCheckView(doneAt: Date | null) {
        if (doneAt) {
            return (
                <View
                    style={styles.done}
                >
                    <FontAwesome
                        name='check'
                        size={20}
                        color='#FFF'
                    />
                </View>
            )
        } else {
            return (
                <View
                    style={styles.pending}
                ></View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => toggleTask(id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text
                    style={[styles.desc, { textDecorationLine: doneOrNotStyle }]}
                >{desc}</Text>
                <Text
                    style={styles.date}
                >{dateFormatted}</Text>
            </View>
            <View style={styles.trashContent}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onDelete && onDelete(id)}>
                    <FontAwesome5
                        name='trash'
                        size={24}
                        color={themes.colors.today}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}