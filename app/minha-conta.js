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

export default function MinhaConta() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
            <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Minha Conta</Text>
          <View style={{ width: 28 }} />
        </View>

        <Text style={styles.subtitulo}>
          Veja as informações da sua conta cadastrada no sistema.
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Nome */}
          <View style={styles.card}>
            <View style={styles.labelRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="person-outline" size={18} color="#003D4C" />
              </View>
              <Text style={styles.labelText}>Nome completo</Text>
            </View>
            <Text style={styles.valor}>João da Silva</Text>
          </View>

          {/* E-mail */}
          <View style={styles.card}>
            <View style={styles.labelRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="mail-outline" size={18} color="#003D4C" />
              </View>
              <Text style={styles.labelText}>E-mail</Text>
            </View>
            <Text style={styles.valor}>joao@email.com</Text>
          </View>

          {/* Telefone */}
          <View style={styles.card}>
            <View style={styles.labelRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="call-outline" size={18} color="#003D4C" />
              </View>
              <Text style={styles.labelText}>Telefone</Text>
            </View>
            <Text style={styles.valor}>(11) 98765-4321</Text>
          </View>

          {/* CPF */}
          <View style={styles.card}>
            <View style={styles.labelRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="card-outline" size={18} color="#003D4C" />
              </View>
              <Text style={styles.labelText}>CPF</Text>
            </View>
            <Text style={styles.valor}>123.456.789-00</Text>
          </View>

          {/* Data de nascimento */}
          <View style={styles.card}>
            <View style={styles.labelRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="calendar-outline" size={18} color="#003D4C" />
              </View>
              <Text style={styles.labelText}>Data de nascimento</Text>
            </View>
            <Text style={styles.valor}>01/01/1990</Text>
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
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  labelText: {
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
