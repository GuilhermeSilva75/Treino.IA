import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { router } from "expo-router";

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDataStore } from "@/store/data";


import Select from "../../components/Input/select";


const schema = z.object({
  gender: z.string().min(1, { message: 'O Sexo é obrigatório' }),
  days: z.string().min(1, { message: 'A quantidade de dias é obrigatório' }),
  muscle: z.string().min(1, { message: 'O objetivo muscular é obrigatório' }),
})



type FormData = z.infer<typeof schema>

export default function Create() {

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const setPageTwo = useDataStore(state => state.setPageTwo)

  const genderOptions = [
    { label: "Masculino", value: "Masculino" },
    { label: "Feminino", value: "Feminino" }
  ]

  const daysOptions = [
    { label: "1 Dia", value: "1 dia" },
    { label: "2 Dias", value: "2 dias" },
    { label: "3 Dias", value: "3 dias" },
    { label: "4 Dias", value: "4 dias" },
    { label: "5 Dias", value: "5 dias" },
    { label: "6 Dias", value: "6 dias" },
    { label: "7 Dias", value: "7 dias" },
  ]
  const muscleOptions = [
    { label: "Peitoral", value: "peitoral" },
    { label: "Costas", value: "costas" },
    { label: "Pernas", value: "pernas" },
    { label: "Braços", value: "braços" },
    { label: "Abdômen", value: "abdômen" },
    { label: "Antebraço", value: "antebraço" },
    { label: "Panturrilha", value: "panturrilha" },
  ]

  function handleCreate(data: FormData) {
    setPageTwo({
      gender: data.gender,
      days: data.days,
      muscle: data.muscle
    })    
    router.push('/ficha')
  }

  return (
    <View style={styles.container}>
      <Header
        step="Passo 2"
        title="Finalzando Ficha"
      />

      <ScrollView style={styles.content}>

        <Text style={styles.label}>Sexo:</Text>
        <Select
          name="gender"
          placeholder="Selecione seu sexo:"
          control={control}
          error={errors.gender?.message}
          options={genderOptions}
        />

        <Text style={styles.label}>Quantidades de dias disponíveis para treino:</Text>
        <Select
          name="days"
          placeholder="Dias disponíveis"
          control={control}
          error={errors.days?.message}
          options={daysOptions}
        />

        <Text style={styles.label}>Selecione seu grupo muscular alvo:</Text>
        <Select
          name="muscle"
          placeholder="Selecione seu objetivo:"
          control={control}
          error={errors.muscle?.message}
          options={muscleOptions}
        />

          <TouchableOpacity style={styles.button} onPress={handleSubmit(handleCreate)}>
            <Text style={styles.buttonText}>Gerar ficha de treino</Text>
          </TouchableOpacity>  
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F232C"
  },
  label: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  },
  content: {
    paddingHorizontal: 16
  },
  button: {
    height: 40,
    backgroundColor: "#009AD6",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 16
  }
})