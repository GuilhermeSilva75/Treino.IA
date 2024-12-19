import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from "expo-router";
import { useDataStore } from "@/store/data";


const schema = z.object({
    name: z.string().min(1, { message: 'O nome é obrigatório' }),
    weight: z.string().min(1, { message: 'O peso é obrigatório' }),
    age: z.string().min(1, { message: 'A idade é obrigatória' }),
    height: z.string().min(1, { message: 'A altura é obrigatória' }),
})

type FormData = z.infer<typeof schema>

export default function Step() {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const setPageOne = useDataStore(state => state.setPageOne)

    function handleCreate(data: FormData) {
        console.log("PASSANDO DADOS PAGINA 1");
        setPageOne({
            name: data.name,
            age: data.age,
            height: data.height,
            weight: data.weight
        })

        router.push('/create')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Vamos Começar"
                step="Passo 1"
            />
            <ScrollView style={styles.content}>

                <Text style={styles.label}>Nome:</Text>
                <Input
                name="name"        
                control={control}
                placeholder="Digite seu nome..."
                error={errors.name?.message}
                keyboadType="default"
                />

                <Text style={styles.label}>Seu peso:</Text>
                <Input
                name="weight"        
                control={control}
                placeholder="EX: 72"
                error={errors.weight?.message}
                keyboadType="numeric"
                />

                <Text style={styles.label}>Altura:</Text>
                <Input
                name="height"        
                control={control}
                placeholder='EX: 1,80'
                error={errors.height?.message}
                keyboadType="numeric"
                />

                <Text style={styles.label}>Idade:</Text>
                <Input
                name="age"        
                control={control}
                placeholder="EX: 22"
                error={errors.age?.message}
                keyboadType="numeric"
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.text}>Avançar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F232C",
    },
    content: {
        paddingHorizontal: 16
    },
    label: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16
    },
    button: {
        backgroundColor: "#009AD6",
        height: 45,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})