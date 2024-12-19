import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Controller } from 'react-hook-form'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';


interface OptionProps {
    label: string
    value: string | number
}

interface SelectProps {
    name: string
    control: any
    placeholder?: string
    error?: string
    options: OptionProps[]
}

export default function Select({ control, name, error, placeholder, options }: SelectProps) {

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View style={styles.container}>
            <Controller
                name={name}
                control={control}

                render={({ field: { onChange, value } }) => (
                    <>
                        <TouchableOpacity style={styles.select} onPress={() => setModalVisible(true)}>
                            <Text style={{color: "gray"}}>
                                {value ? options.find(options => options.value === value)?.label : placeholder}
                            </Text>

                            <AntDesign name="arrowdown" size={24} color="black" />
                        </TouchableOpacity>

                        <Modal visible={modalVisible} animationType='fade' transparent={true} onRequestClose={() => setModalVisible(false)}>
                            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => setModalVisible(false)}>

                                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                                    <FlatList
                                        data={options}
                                        contentContainerStyle={{ gap: 4 }}
                                        keyExtractor={(item) => item.value.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.options}
                                                onPress={() => {
                                                    onChange(item.value)
                                                    setModalVisible(false)
                                                }}
                                            >
                                                <Text>{item.label}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                    </>
                )}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 25
    },
    errorText: {
        color: 'red',
        marginTop: 4
    },
    select: {
        flexDirection: 'row',
        height: 45,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 4
    },
    modalContainer: {
        backgroundColor: "rgba(0,0,0, 0.5)",
        flex: 1,
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 8
    },
    options: {
        paddingVertical: 14,
        backgroundColor: "rgba(208,208,208, 0.40)",
        borderRadius: 4,
        paddingHorizontal: 8
    }
})