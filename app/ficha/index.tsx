import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Share } from 'react-native';
import { useDataStore } from '@/store/data';

import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { Data } from '@/types/data';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ResponseData {
  data: Data
}

export default function Ficha() {

  const user = useDataStore(state => state.user)
  console.log(user);

  const { isFetching, data, error } = useQuery({
    queryKey: ["train"],
    queryFn: async () => {
      try {
        if (!user) {
          throw new Error("Failed create train")
        }

        const response = await api.post<ResponseData>("/train", {
          name: user.name,
          age: user.age,
          gender: user.gender,
          height: user.height,
          weight: user.weight,
          muscle: user.muscle,
          days: user.days
        })

        console.log(response.data.data);

        return response.data.data

      } catch (error) {
        console.log(error);

      }
    }
  })

  if (error) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Falha ao criar ficha!</Text>
        <Link href={"/step"}>
          <Text style={styles.loadingText}>Tente novamente</Text>
        </Link>
      </View>
    )
  }

  if (isFetching) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Gerando ficha de treino</Text>
        <Text style={styles.loadingText}>Consultando IA...</Text>
      </View>
    )
  }

  async function handleShare() {
    try {
      if (data && Object.keys(data).length === 0 ) return

      const train = `${data?.treino.map(item => `\n\nDia: ${item.dia}\n ${item.exercicios.map(item =>`Nome do exercicio: ${item.nome}\n- Repetições: ${item.repeticoes}\n- Series: ${item.series}\n- Descanso: ${item.descanso} segundos\n`)}`)}`


      const message = `Nome: ${data?.nome}\n Foco: ${user.muscle}\n\nTreino: ${train}`

      await Share.share({
        message: message
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Meu Treino</Text>

          <TouchableOpacity style={styles.butttonShare} onPress={handleShare}>
            <Text style={styles.butttonSharetText}>Compartilhar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={styles.name}>Nome: {data.nome}</Text>
            <Text style={styles.foco}>Foco: {user.muscle.charAt(0).toUpperCase() + user.muscle.slice(1)}</Text>

            <Text style={styles.label}>Treino: </Text>

            <ScrollView>
              <View style={styles.train}>
                {data.treino.map((dia) => (
                  <View key={dia.dia} style={styles.training}>
                    <View>
                      <Text style={styles.day}>{dia.dia}</Text>
                    </View>

                    <View style={styles.row}>
                      <MaterialCommunityIcons name='dumbbell' size={14}/>
                      <Text>{dia.focoMuscular}</Text>
                    </View>

                    <View style={styles.exercices}>
                      {dia.exercicios.map((exercicios) => (
                        <View key={exercicios.nome}>
                          <Text style={styles.exercicesName}>
                            {exercicios.nome}
                          </Text>

                          <Text style={styles.series}>
                            Series: {exercicios.series}
                          </Text>

                          <Text style={styles.series}>
                            Repetições: {exercicios.repeticoes}
                          </Text>

                          <Text style={styles.series}>
                            Descanso: {exercicios.descanso} segundos
                          </Text>
                        </View>
                      ))}
                    </View>

                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
                <Text style={styles.buttonText}>Gerar nova ficha de treino</Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F232C"
  },
  containerHeader: {
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingTop: 60,
    paddingBottom: 20,
    marginBottom: 16
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  title: {
    fontSize: 28,
    color: "#0F232C",
    fontWeight: 'bold'
  },
  butttonSharetText: {
    color: "#FFF",
    fontWeight: 'semibold'
  },
  butttonShare: {
    backgroundColor: "#009AD6",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 4
  },
  loading: {
    flex: 1,
    backgroundColor: "#0F232C",
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 18,
    color: "white",
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4
  },
  foco: {
    fontSize: 16,
    color: 'white',
    marginBottom: 26
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  train: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
    marginBottom: 14
  },
  training: {
    backgroundColor: "rgba(208,208,208, 0.4)",
    padding: 8,
    borderRadius: 4
  },
  day: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  trainday: {
    fontSize: 15,
    color: 'black'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  exercices: {
    marginTop: 6
  },
  exercicesName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 6
  },
  series: {
    paddingLeft: 10
  },
  button: {
    backgroundColor: "#009AD6",
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 24
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold'
  }
})