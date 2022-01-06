import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts, Lato_300Light } from '@expo-google-fonts/lato'
import { FontAwesome5 } from '@expo/vector-icons'
import AppLoading from 'expo-app-loading'
import 'moment/locale/pt-br'
import moment from 'moment'

import Today from '../../assets/imgs/today.jpg'

import { Task } from '../../components/Task';
import themes from '../../global/themes';
import { styles } from './styles'
import { AddTask } from '../AddTask';

type PropsTask = {
    id: number;
    desc: string;
    estimateAt: Date | undefined,
    doneAt: Date | null
}


export default function TaskList() {

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
    const [showModal, setShowModal] = useState(false)
    const [task, setTask] = useState<PropsTask[]>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@storage_Key')
                const tasks = jsonValue != null ? JSON.parse(jsonValue) : null;
                setTask(tasks)
            } catch (e) {
                // error reading value
            }
        }
        getData()
    }, [])

    function deleteTask(id: number) {
        const tasks = task.filter(task => task.id !== id)
        setTask(tasks)
        const storeData = async () => {
            try {
                const jsonValue = JSON.stringify(tasks)
                await AsyncStorage.setItem('@storage_Key', jsonValue)
            } catch (e) {
                // saving error
            }
        }
        storeData()
    }

    function addTask(date: Date | undefined, text: string) {
        if (!text) {
            Alert.alert('Dados inválidos', 'Descrição não informada')
            return
        }
        const tasks = [...task]
        tasks.push({
            id: Math.random(),
            desc: text,
            estimateAt: date,
            doneAt: null
        })
        setTask(tasks)
        setShowModal(false)
        const storeData = async () => {
            try {
                const jsonValue = JSON.stringify(tasks)
                await AsyncStorage.setItem('@storage_Key', jsonValue)
            } catch (e) {
                // saving error
            }
        }
        storeData()
    }

    function handleOpenModal() {
        setShowModal(true)
    }

    function handleCloseModal() {
        setShowModal(false)
    }



    function toggleTask(taskId: number) {
        const tasks = [...task]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        setTask(tasks)
    }

    let [fontsLoaded] = useFonts({
        Lato_300Light
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={Today}
                style={styles.image}
            >
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>
            </ImageBackground>
            <View style={styles.content}>
                <FlatList
                    data={task}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => (
                        <Task
                            {...item}
                            toggleTask={toggleTask}
                            onDelete={deleteTask}
                        />
                    )}
                />
            </View>

            <View>
                <TouchableOpacity style={styles.addButton} onPress={handleOpenModal} activeOpacity={0.7}>
                    <FontAwesome5
                        name='plus'
                        size={20}
                        color={themes.colors.secondary}
                    />
                </TouchableOpacity>
            </View>

            {/* Modal add task */}
            <AddTask
                isVisible={showModal}
                onCancel={handleCloseModal}
                onSave={addTask}
            />

        </View>
    )

}