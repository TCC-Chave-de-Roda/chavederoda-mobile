import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const promoImages = [
  require("../assets/images/promo1.png"),
  require("../assets/images/promo2.png"),
  require("../assets/images/promo3.png"),
];

const bottomTabs = [
  { label: "Home", icon: "home-outline", route: "/" },
  { label: "Minha Conta", icon: "person-outline", route: "/minha-conta" },
  { label: "Ajuda", icon: "help-circle-outline", route: "/ajuda" },
  {
    label: "Fale Conosco",
    icon: "chatbubble-ellipses-outline",
    route: "/fale-conosco",
  },
  { label: "Perfil", icon: "settings-outline", route: "/perfil" },
];

export default function Home() {
  const router = useRouter();
  const [promoIndex, setPromoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Home");

  // Pega o espaço reservado pela barra de navegação (safe area insets)
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const buttonIcons = {
    "Meus veículos": "car-sport-outline",
    "Minhas oficinas": "build-outline",
    Notificações: "notifications-outline",
    Promoções: "pricetag-outline",
    "Minhas Quilometragens": "speedometer-outline",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Cabeçalho azul */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons
            name="notifications-outline"
            size={20}
            color="#fff"
            style={{ marginTop: -2 }}
          />
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal */}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { paddingBottom: 70 + insets.bottom }, // espaço do bottomBar + inset da barra do sistema
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Image
            source={require("../assets/images/splash-chave.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Barra de pesquisa */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#003D4C" />
            <TextInput
              placeholder="Pesquisar"
              placeholderTextColor="#003D4C"
              style={styles.input}
              accessibilityLabel="Campo de pesquisa"
              accessible
            />
          </View>

          {/* Imagem promocional */}
          <View style={styles.promoContainer}>
            <Image
              source={promoImages[promoIndex]}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>

          {/* Botões */}
          <View style={{ gap: 16, width: "100%" }}>
            {[
              { label: "Meus veículos", route: "/meus-veiculos" },
              { label: "Minhas oficinas", route: "/minhas-oficinas" },
              { label: "Notificações", route: "/notificacoes" },
              { label: "Promoções", route: "/promocoes" },
              {
                label: "Minhas Quilometragens",
                route: "/minhas-quilometragens",
              },
            ].map(({ label, route }) => (
              <TouchableOpacity
                key={label}
                onPress={() => router.push(route)}
                style={styles.button}
                accessibilityLabel={`Botão ${label}`}
                accessible
              >
                <Ionicons
                  name={buttonIcons[label]}
                  size={24}
                  color="#003D4C"
                  style={{ marginRight: 12 }}
                />
                <Text style={styles.buttonText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Barra fixa inferior */}
      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: insets.bottom, // cria um padding interno para respeitar a barra do sistema
            height: 70 + insets.bottom, // aumenta a altura para não ficar atrás da barra do sistema
          },
        ]}
      >
        {bottomTabs.map(({ label, icon, route }) => {
          const focused = activeTab === label;
          return (
            <TouchableOpacity
              key={label}
              onPress={() => {
                setActiveTab(label);
                router.push(route);
              }}
              style={[
                styles.bottomTabButton,
                focused && styles.bottomTabButtonActive,
              ]}
              accessibilityLabel={`Botão ${label}`}
              accessible
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconWrapper,
                  focused && styles.iconWrapperActive,
                ]}
              >
                <Ionicons
                  name={icon}
                  size={focused ? 28 : 24}
                  color={focused ? "#003D4C" : "#ccc"}
                />
              </View>
              <Text
                style={[
                  styles.bottomTabText,
                  focused && styles.bottomTabTextActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: "#003D4C",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 70,
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderColor: "#003D4C",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
    width: "100%",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: "#003D4C",
    fontSize: 15,
    fontWeight: "500",
  },
  promoContainer: {
    height: 120,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#003D4C",
    shadowColor: "#003D4C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
  },
  buttonText: {
    color: "#003D4C",
    fontWeight: "600",
    fontSize: 17,
  },
  bottomBar: {
    backgroundColor: "#003D4C",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 20,
  },
  bottomTabButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTabButtonActive: {
    // estilos adicionais
  },
  iconWrapper: {
    padding: 6,
    borderRadius: 20,
  },
  iconWrapperActive: {
    backgroundColor: "#CCE5FF",
  },
  bottomTabText: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 4,
    fontWeight: "400",
    fontFamily: "System",
  },
  bottomTabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
