import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const { width } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailValido = /^\S+@\S+\.\S+$/.test(email);
  const senhaValida = senha.length >= 8;
  const podeLogin = emailValido && senhaValida && !loading;

  const handleLogin = () => {
    if (!podeLogin) return;

    setLoading(true);
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Login realizado com sucesso!",
        position: "bottom",
      });
      setEmail("");
      setSenha("");
      setLoading(false);
      router.replace("/home");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.botaoVoltar}
        accessibilityLabel="Voltar"
        accessible
      >
        <Ionicons name="chevron-back-outline" size={30} color="#003D4C" />
      </TouchableOpacity>

      {/* Logo e Título */}
      <View style={styles.topo}>
        <Image
          source={require("../assets/images/splash-chave.png")}
          style={[styles.logo, { width: width * 0.3, height: width * 0.3 }]}
          resizeMode="contain"
          accessible
          accessibilityLabel="Logo Chave"
        />
        <Text style={styles.titulo}>Faça login</Text>
      </View>

      {/* Formulário */}
      <View style={styles.formulario}>
        <View style={styles.campo}>
          <Ionicons name="mail-outline" size={20} color="#003D4C" />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#003D4C"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="Campo de e-mail"
            accessible
          />
        </View>
        {!emailValido && email.length > 0 && (
          <Text style={styles.erro}>Digite um e-mail válido.</Text>
        )}

        <View style={styles.campo}>
          <Ionicons name="lock-closed-outline" size={20} color="#003D4C" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#003D4C"
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
            accessibilityLabel="Campo de senha"
            accessible
          />
          <TouchableOpacity
            onPress={() => setMostrarSenha(!mostrarSenha)}
            accessibilityLabel={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            accessible
          >
            <Ionicons
              name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#003D4C"
            />
          </TouchableOpacity>
        </View>
        {!senhaValida && senha.length > 0 && (
          <Text style={styles.erro}>
            A senha deve ter pelo menos 8 caracteres.
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.botao,
            { backgroundColor: podeLogin ? "#003D4C" : "#003d4c" },
          ]}
          onPress={handleLogin}
          disabled={!podeLogin}
          accessibilityLabel="Botão entrar"
          accessible
        >
          <Text style={styles.textoBotao}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/cadastro")}
          style={{ marginTop: 10 }}
          accessibilityLabel="Ir para cadastro"
          accessible
        >
          <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFBAA",
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  botaoVoltar: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  topo: {
    alignItems: "center",
    marginBottom: 15,
  },
  logo: {
    opacity: 0.9,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003D4C",
    marginTop: 5,
  },
  formulario: {
    width: "100%",
    marginTop: 30,
    gap: 12,
    alignItems: "center",
  },
  campo: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#003D4C",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F9FAFBAA",
    shadowColor: "#F9FAFBAA",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
    height: 50,
  },
  input: {
    flex: 1,
    height: 45,
    paddingLeft: 10,
    color: "#003D4C",
    fontWeight: "500",
    outlineWidth:0
  },
  erro: {
    color: "#DC2626",
    fontSize: 13,
    alignSelf: "flex-start",
  },
  botao: {
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  textoBotao: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#003D4C",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
