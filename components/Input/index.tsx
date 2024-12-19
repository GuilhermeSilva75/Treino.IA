import { View, TextInput, StyleSheet, KeyboardTypeOptions, Text } from 'react-native';
import { Controller } from 'react-hook-form'

interface InputProps {
    name: string
    control: any
    placeholder?: string
    rules?: object
    error?: string
    keyboadType: KeyboardTypeOptions
}

export default function Input({ control, keyboadType, name, error, placeholder, rules }: InputProps) {
    return (
        <View style={styles.container}>
            <Controller
                name={name}
                control={control}
                rules={rules}

                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType={keyboadType}
                        style={styles.input}
                    />
                )}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    errorText: {
        color: 'red',
        marginTop: 4
    },
    input: {
        paddingTop: 8,
        height: 45,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        borderRadius: 4,
        marginTop: 6
    },
})