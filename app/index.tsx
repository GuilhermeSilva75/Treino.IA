import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";


export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Logotreino.png')}
        resizeMode="cover"
      />

      <Text style={styles.title}>
        Treino<Text style={{ color: 'white' }}>.IA</Text>
      </Text>

      <Text style={styles.text}>
        Sua ficha de treino criada com inteligência artificial
      </Text>

      <Link href="/step" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Gerar ficha de treino</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#0F232C",
    paddingHorizontal: 16
  },
  title: {
    marginTop: 20,
    fontSize: 36,
    color: "#009AD6",
    fontWeight: 'bold'
  },
  text: {
    color: "#FFF",
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    width: 240,
    textAlign: 'center'
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