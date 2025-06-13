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

export default function Ajuda() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
            <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ajuda</Text>
          <View style={{ width: 28 }} />
        </View>

        <Text style={styles.subtitulo}>
          Tire suas dúvidas e saiba como utilizar o aplicativo.
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.rowLabel}>
              <View style={styles.iconCircle}>
                <Ionicons name="phone-portrait-outline" size={18} color="#003D4C" />
              </View>
              <Text style={styles.label}>Como utilizar o app?</Text>
            </View>
            <Text style={styles.valor}>
              O aplicativo permite que você consulte informações do seu cadastro,
              veículos e oficinas vinculadas, além de personalizar seus dados com apelido e foto.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.rowLabel}>
              <View style={styles.iconCircle}>
                <Ionicons name="lock-closed-outline" size={18} color="#003D4C" />
              </View>
              <Text style={styles.label}>Esqueci minha senha</Text>
            </View>
            <Text style={styles.valor}>
              Vá para a tela de login e toque em "Esqueci minha senha". Um link será enviado
              para o seu e-mail de cadastro.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.rowLabel}>
              <View style={styles.iconCircle}>
                <Ionicons name="build-outline" size={18} color="#003D4C" />
              </View>
              <Text style={styles.label}>Alterar meus dados</Text>
            </View>
            <Text style={styles.valor}>
              A maioria das alterações deve ser feita pelo sistema web. No app, é possível
              atualizar apelido e foto dos veículos.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.rowLabel}>
              <View style={styles.iconCircle}>
                <Ionicons name="mail-outline" size={18} color="#003D4C" />
              </View>
              <Text style={styles.label}>Suporte</Text>
            </View>
            <Text style={styles.valor}>
              Em caso de dúvidas, envie um e-mail para suporte@chavederoda.com.br.
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
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#003d4c",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  rowLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 16,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
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
