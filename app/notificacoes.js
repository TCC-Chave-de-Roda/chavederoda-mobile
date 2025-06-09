import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Notificacoes() {
  const router = useRouter();

  const notificacoes = [
    {
      id: "1",
      titulo: "Revisão concluída",
      descricao: "Seu carro já está pronto para retirada.",
    },
    {
      id: "2",
      titulo: "Nova mensagem",
      descricao: "Temos uma atualização sobre o serviço em andamento.",
    },
    {
      id: "3",
      titulo: "Promoção especial",
      descricao: "Descontos em alinhamento e balanceamento nesta semana!",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      // No futuro pode adicionar onPress para abrir detalhes
    >
      <View style={styles.iconWrapper}>
        <Ionicons name="notifications-outline" size={20} color="#00695C" />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
            <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notificações</Text>
          <View style={{ width: 32 }} />
        </View>

        <Text style={styles.subtitulo}>
          Acompanhe todas as atualizações e mensagens importantes sobre seus serviços.
        </Text>

        <FlatList
          data={notificacoes}
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
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
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
    color: "#003D4C",
    marginTop: 12,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "flex-start",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    marginTop: 4,
  },
  cardContent: {
    flex: 1,
  },
  titulo: {
    fontSize: 17,
    fontWeight: "600",
    color: "#004D5A",
    marginBottom: 6,
  },
  descricao: {
    fontSize: 14,
    color: "#546E7A",
    lineHeight: 20,
  },
});
