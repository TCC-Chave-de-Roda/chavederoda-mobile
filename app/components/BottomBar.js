import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const bottomTabs = [
  { label: "Home", icon: "home-outline", route: "/home" },
  { label: "Minha Conta", icon: "person-outline", route: "/minha-conta" },
  { label: "Ajuda", icon: "help-circle-outline", route: "/ajuda" },
  { label: "Fale Conosco", icon: "chatbubble-ellipses-outline", route: "/fale-conosco" },
  { label: "Perfil", icon: "settings-outline", route: "/perfil" },
];

export default function BottomBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(() => {
    const current = bottomTabs.find(tab => tab.route === pathname);
    return current ? current.label : "Home";
  });

  const handlePress = (label, route) => {
    setActiveTab(label);
    router.push(route);
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.bottomSafeArea}>
      <View style={styles.bottomBar}>
        {bottomTabs.map(({ label, icon, route }) => {
          const focused = activeTab === label;
          return (
            <TouchableOpacity
              key={label}
              onPress={() => handlePress(label, route)}
              style={[
                styles.bottomTabButton,
                focused && { borderRadius: 20, overflow: "hidden" },
              ]}
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
    </SafeAreaView>
  );
}

const styles = {
  bottomSafeArea: {
    backgroundColor: "#E5E5E5",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "#003D4C",
    borderTopWidth: 0.5,
    borderTopColor: "#003d4c",
  },
  bottomTabButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,       // garante arredondamento do botão
    overflow: "hidden",     // necessário para que borderRadius funcione bem no Android
    paddingVertical: 5,     // dá um pouco de espaço interno vertical
    paddingHorizontal: 12,  // e horizontal
  },
  iconWrapper: {
    padding: 2,
    borderRadius: 20,
  },
  iconWrapperActive: {
    backgroundColor: "#E0F2F1",
    borderRadius: 25,
  },
  bottomTabText: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 4,
    fontWeight: "400",
  },
  bottomTabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
};
