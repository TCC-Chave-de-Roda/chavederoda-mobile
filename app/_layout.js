import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, usePathname } from "expo-router";
import Toast from "react-native-toast-message";
import BottomBar from "./components/BottomBar"; // ajuste caminho se necessário
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const pathname = usePathname();

  // Não mostrar BottomBar nessas rotas:
  const hideBottomBarRoutes = ["/", "/login", "/cadastro"];
  const showBottomBar = !hideBottomBarRoutes.includes(pathname);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      
      {showBottomBar && <BottomBar />}

      <Toast />
    </GestureHandlerRootView>
  );
}
