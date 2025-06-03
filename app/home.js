import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const promoImages = [
  require("../assets/images/promo1.png"),
  require("../assets/images/promo2.png"),
  require("../assets/images/promo3.png"),
];

export default function Home() {
  const router = useRouter();
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const userName = "Usuário";

  const cards = [
    {
      label: "Meus veículos",
      subtitle: "Visualize e gerencie seus veículos",
      icon: "car-sport-outline",
      route: "/meus-veiculos",
    },
    {
      label: "Minhas oficinas",
      subtitle: "Veja suas oficinas cadastradas",
      icon: "build-outline",
      route: "/minhas-oficinas",
    },
    {
      label: "Notificações",
      subtitle: "Mensagens e alertas importantes",
      icon: "notifications-outline",
      route: "/notificacoes",
    },
    {
      label: "Promoções",
      subtitle: "Ofertas exclusivas pra você",
      icon: "pricetag-outline",
      route: "/promocoes",
    },
    {
      label: "Minhas Quilometragens",
      subtitle: "Histórico de percurso e uso",
      icon: "speedometer-outline",
      route: "/minhas-quilometragens",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Boas-vindas */}
          <View style={styles.welcomeContainer}>
            <Ionicons name="person-circle-outline" size={28} color="#003D4C" />
            <Text style={styles.welcomeText}>Olá, {userName}</Text>
          </View>

          {/* Promoções */}
          <View style={styles.promoContainer}>
            <Image
              source={promoImages[promoIndex]}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>

          {/* Acesso Rápido */}
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>

          <View style={styles.cardSection}>
            {cards.map(({ label, subtitle, icon, route }) => (
              <Pressable
                key={label}
                onPress={() => router.push(route)}
                style={({ pressed }) => [
                  styles.cardButton,
                  { opacity: pressed ? 0.85 : 1 },
                ]}
              >
                <View style={styles.iconWrapper}>
                  <Ionicons name={icon} size={20} color="#00695C" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{label}</Text>
                  <Text style={styles.cardSubtitle}>{subtitle}</Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#999"
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = {
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 3,
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    gap:10,
  },
  welcomeText: {
    color: "#003D4C",
    fontSize: 23,
    fontWeight: "500",
  },
  promoContainer: {
    height: 110,
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#eee",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003D4C",
    marginBottom: 9,

  },
  cardSection: {
    gap: 13,
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: "#E0F2F1", // verde claro da paleta
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003D4C",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
};
