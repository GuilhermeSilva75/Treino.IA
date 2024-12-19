import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';


interface HeaderProps {
    title: string
    step: string
}

export default function Header({ step, title }: HeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.text}>
                        {step} <Feather name="loader" size={24} color="black" />
                    </Text>
                </View>

                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        marginBottom: 14,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 16 : 16
    },
    title: {
        color: "#0F232C",
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 8
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 25,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    text: {
        fontSize: 18
    }
})