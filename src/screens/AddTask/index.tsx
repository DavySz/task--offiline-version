import React, { useState } from 'react'
import {
    View,
    Modal,
    TouchableWithoutFeedback,
    Text,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native'
import DateTimePicker, { Event, AndroidEvent } from '@react-native-community/datetimepicker';

import { styles } from './styles'
import moment from 'moment';

type Props = {
    isVisible: boolean;
    onCancel: () => void;
    onSave: (
        date: Date | undefined,
        text: string
    ) => void;
}

export function AddTask({ onCancel, onSave, isVisible }: Props) {

    const [text, setText] = useState("")
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    function saveNewTask() {
        const newTask = {
            date: date,
            text: text
        }

        onSave && onSave(newTask.date, newTask.text)
        setDate(new Date())
        setText("")
    }

    function handleClickAlterShowDatePicker() {
        setShowDatePicker(true)
    }

    function getDatePicker() {
        let datePicker = <DateTimePicker
            value={date != undefined ? date : new Date()} //type problem
            mode='date'
            onChange={(event: Event | AndroidEvent, date?: Date) => {
                setDate(date)
                setShowDatePicker(false)
            }}
        />

        const dateString = moment(date).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={handleClickAlterShowDatePicker}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && datePicker}
                </View>

            )
        }

        return datePicker
    }

    return (
        <Modal
            transparent
            statusBarTranslucent
            visible={isVisible}
            animationType='slide'
            onRequestClose={onCancel}
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>

            <View style={styles.container}>
                <Text style={styles.header}>Nova tarefa</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Informe a descrição...'
                    value={text}
                    onChangeText={(value) => setText(value)}
                />

                {
                    getDatePicker()
                }

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={onCancel}>
                        <Text style={styles.buttonsLabel}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={saveNewTask}>
                        <Text style={styles.buttonsLabel}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>

        </Modal>
    )
}