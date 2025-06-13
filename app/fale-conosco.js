import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FaleConosco() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
            <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Fale Conosco</Text>
          <View style={{ width: 28 }} />
        </View>

        <Text style={styles.subtitulo}>
          Estamos aqui para te ajudar. Confira abaixo as formas de contato.
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.labelContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="mail-outline" size={20} color="#003D4C" />
              </View>
              <Text style={styles.label}>E-mail</Text>
            </View>
            <Text style={styles.valor}>suporte@chavederoda.com.br</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.labelContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="call-outline" size={20} color="#003D4C" />
              </View>
              <Text style={styles.label}>Telefone</Text>
            </View>
            <Text style={styles.valor}>0800 123 456</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.labelContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="time-outline" size={20} color="#003D4C" />
              </View>
              <Text style={styles.label}>Atendimento</Text>
            </View>
            <Text style={styles.valor}>Segunda a sexta, das 08h às 18h</Text>
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
    backgroundColor: "#E0F2F1",
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
