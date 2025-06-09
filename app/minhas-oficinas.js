import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MinhasOficinas() {
  const router = useRouter();

  const [oficinas, setOficinas] = useState([
    {
      id: "1",
      nome: "Oficina AutoTech",
      endereco: "Rua das Flores, 123 - Centro",
      telefone: "(11) 99999-1234",
      imagem: null,
    },
    {
      id: "2",
      nome: "Mecânica Rápida",
      endereco: "Av. Brasil, 456 - Bairro Novo",
      telefone: "(11) 98888-5678",
      imagem: null,
    },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.containerOficina}>
      <Text style={styles.nome}>{item.nome}</Text>

      <View style={styles.card}>
        <View style={styles.circuloImagem}>
          {item.imagem ? (
            <Image source={{ uri: item.imagem }} style={styles.foto} />
          ) : (
            <Ionicons name="business-outline" size={28} color="#003D4C" />
          )}
        </View>

        <View style={styles.infoTextos}>
          <Text style={styles.detalhe}>{item.endereco}</Text>
          <Text style={styles.detalhe}>{item.telefone}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Minhas Oficinas</Text>
          <View style={{ width: 28 }} />
        </View>

        <Text style={styles.subTitulo}>
          Visualize as oficinas cadastradas com informações úteis de contato.
        </Text>

        <FlatList
          data={oficinas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        />
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
    paddingBottom: 0,
  },
  header: {
    marginTop: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003D4C",
    textAlign: "center",
    flex: 1,
  },
  subTitulo: {
    marginTop: 13,
    marginBottom: 20,
    fontSize: 15,
    color: "#003d4c",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  containerOficina: {
    marginBottom: 30,
  },
  nome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003D4C",
    marginBottom: 8,
    marginLeft: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  circuloImagem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    overflow: "hidden",
  },
  foto: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  infoTextos: {
    flex: 1,
  },
  detalhe: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
});
