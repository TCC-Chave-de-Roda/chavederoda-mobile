import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ícones do pacote Ionicons
import { useRouter } from "expo-router"; // Hook para navegação

export default function Notificacoes() {
  const router = useRouter(); // Para voltar à página anterior

  // Lista de notificações (simulada)
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
      descricao:
        "Descontos em alinhamento e balanceamento nesta semana!",
    },
  ];

  // Função para renderizar cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Ionicons
        name="notifications-outline"
        size={24}
        color="#00576B"
        style={styles.icone}
      />
      <View style={styles.cardContent}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Cabeçalho com botão de voltar e título */}
        <View style={styles.header}>
          {/* Botão voltar */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
            <Ionicons
              name="chevron-back-outline"
              size={28}
              color="#00576B"
            />
          </TouchableOpacity>

          {/* Título da tela */}
          <Text style={styles.headerTitle}>Notificações</Text>

          {/* Espaço vazio para alinhar o título centralizado */}
          <View style={{ width: 32 }} />
        </View>

        {/* Subtítulo abaixo do título principal */}
        <Text style={styles.subtitulo}>
          Acompanhe todas as atualizações e mensagens importantes sobre seus serviços.
        </Text>

        {/* Lista de notificações */}
        <FlatList
          data={notificacoes} // Fonte de dados
          keyExtractor={(item) => item.id} // Chave única
          renderItem={renderItem} // Função de renderização
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

// Estilos com StyleSheet
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFBAA", // Fundo levemente azulado
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    flexDirection: "row", // Elementos lado a lado
    justifyContent: "space-between",
    alignItems: "center",
  },
  backTouch: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#003d4c", // Azul esverdeado
    textAlign: "center",
    flex: 1,
  },
  subtitulo: {
    fontSize: 15,
    color: "#003d4c", // Cinza-azulado suave
    marginTop: 12,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF", // Branco puro
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
    // sombra suave
    elevation: 2, // Android
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  icone: {
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
