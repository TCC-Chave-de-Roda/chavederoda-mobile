// app/minha-conta.jsx

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MinhaConta() {
  const router = useRouter();

  // Estados simulados de usuário
  const [nome, setNome] = useState("João Silva");
  const [email, setEmail] = useState("joao.silva@example.com");
  const [telefone, setTelefone] = useState("(11) 91234-5678");
  const [endereco, setEndereco] = useState("Rua das Laranjeiras, 45, São Paulo");

  const [editando, setEditando] = useState(false);

  function toggleEditar() {
    setEditando((prev) => !prev);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header com botão voltar e ação de editar/salvar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
            <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Minha Conta</Text>
          <TouchableOpacity onPress={toggleEditar} style={styles.editTouch}>
            <Ionicons
              name={editando ? "checkmark-outline" : "pencil-outline"}
              size={24}
              color="#003D4C"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitulo}>
          {editando
            ? "Altere seus dados e toque no ✔ para salvar."
            : "Confira e atualize seus dados pessoais."}
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Campo: Nome */}
          <View style={styles.card}>
            <Text style={styles.label}>Nome</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={22} color="#00576B" style={styles.icon} />
              {editando ? (
                <TextInput
                  style={[styles.input, styles.inputFlu]}
                  value={nome}
                  onChangeText={setNome}
                  placeholder="Seu nome"
                  placeholderTextColor="#AAA"
                />
              ) : (
                <Text style={styles.valor}>{nome}</Text>
              )}
            </View>
          </View>

          {/* Campo: E-mail */}
          <View style={styles.card}>
            <Text style={styles.label}>E-mail</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={22} color="#00576B" style={styles.icon} />
              {editando ? (
                <TextInput
                  style={[styles.input, styles.inputFlu]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Seu e-mail"
                  placeholderTextColor="#AAA"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.valor}>{email}</Text>
              )}
            </View>
          </View>

          {/* Campo: Telefone */}
          <View style={styles.card}>
            <Text style={styles.label}>Telefone</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={22} color="#00576B" style={styles.icon} />
              {editando ? (
                <TextInput
                  style={[styles.input, styles.inputFlu]}
                  value={telefone}
                  onChangeText={setTelefone}
                  placeholder="Seu telefone"
                  placeholderTextColor="#AAA"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.valor}>{telefone}</Text>
              )}
            </View>
          </View>

          {/* Campo: Endereço */}
          <View style={styles.card}>
            <Text style={styles.label}>Endereço</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="home-outline" size={22} color="#00576B" style={styles.icon} />
              {editando ? (
                <TextInput
                  style={[styles.input, styles.inputFlu]}
                  value={endereco}
                  onChangeText={setEndereco}
                  placeholder="Seu endereço"
                  placeholderTextColor="#003d4c"
                />
              ) : (
                <Text style={styles.valor}>{endereco}</Text>
              )}
            </View>
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
  editTouch: {
    padding: 6,
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
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#00576B",
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4F7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#37474F",
  },
  inputFlu: {
    backgroundColor: "#F0F4F7", // fundo suave para o input
  },
  valor: {
    flex: 1,
    fontSize: 16,
    color: "#37474F",
  },
});
