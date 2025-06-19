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

export default function Promocoes() {
  const router = useRouter();

  const promocoes = [
    {
      iconName: "pricetag-outline",
      titulo: "Troca de óleo com 20% OFF",
      descricao: "Promoção válida até o final do mês nas oficinas participantes.",
      oficina: "Oficina AutoMais",
    },
    {
      iconName: "pricetag-outline",
      titulo: "Revisão completa com brinde",
      descricao: "Ganhe um kit de cuidados automotivos.",
      oficina: "Oficina Premium Car",
    },
    {
      iconName: "pricetag-outline",
      titulo: "Higienização interna grátis",
      descricao: "Grátis em serviços acima de R$300.",
      oficina: "Oficina Roda Certa",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Promoções</Text>
          {/* Placeholder para alinhar título */}
          <View style={{ width: 28 }} />
        </View>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>
          Fique por dentro das ofertas das suas oficinas parceiras!
        </Text>

        {/* Lista de promoções */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {promocoes.map((promo, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.labelRow}>
                <View style={styles.iconCircle}>
                  <Ionicons name={promo.iconName} size={20} color="#00695C" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>{promo.titulo}</Text>
                  <Text style={styles.value}>{promo.descricao}</Text>
                  <View style={styles.oficinaRow}>
                    <Ionicons
                      name="business-outline"
                      size={14}
                      color="#007C91"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={styles.oficina}>{promo.oficina}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Estilos padronizados
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
  backButton: {
    padding: 6,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: "#003D4C",
  },
  subtitle: {
    fontSize: 15,
    color: "#003D4C",
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#003D4C",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: "#37474F",
    marginBottom: 6,
  },
  oficinaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  oficina: {
    fontSize: 13,
    fontWeight: "600",
    color: "#007C91",
  },
});
