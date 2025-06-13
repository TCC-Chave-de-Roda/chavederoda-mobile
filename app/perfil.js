import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Perfil() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
            <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Subtítulo */}
        <Text style={styles.subtitulo}>
          Aqui você encontra orientações sobre alterações de dados no seu perfil.
        </Text>

        {/* Cards informativos */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.labelContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="lock-closed-outline" size={20} color="#003d4c" />
              </View>
              <Text style={styles.label}>Alteração de dados</Text>
            </View>
            <Text style={styles.valor}>
              Seus dados podem ser atualizados apenas por uma de nossas oficinas parceiras.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.labelContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="call-outline" size={20} color="#003d4c" />
              </View>
              <Text style={styles.label}>Como alterar?</Text>
            </View>
            <Text style={styles.valor}>
              Entre em contato com a oficina vinculada ao seu cadastro e solicite a atualização desejada.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.labelContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="hand-left-outline" size={20} color="#003d4c" />
              </View>
              <Text style={styles.label}>Estamos aqui!</Text>
            </View>
            <Text style={styles.valor}>
              Se tiver dúvidas, acesse a tela de Ajuda ou entre em contato pelo suporte.
            </Text>
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFBAA",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backTouch: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#003D4C",
    textAlign: "center",
    flex: 1,
  },
  subtitulo: {
    fontSize: 15,
    color: "#003d4c",
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#003d4c",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 16,
    backgroundColor: "#E0F2F1", // verde claro
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#00576B",
  },
  valor: {
    fontSize: 15,
    color: "#37474F",
    lineHeight: 20,
  },
});
