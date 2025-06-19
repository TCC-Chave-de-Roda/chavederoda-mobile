import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, usePathname } from "expo-router";
import Toast from "react-native-toast-message";
import BottomBar from "./components/BottomBar"; // ajuste caminho se necessário

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  const hideBottomBarRoutes = ["/", "/login", "/cadastro"];
  const showBottomBar = !hideBottomBarRoutes.includes(pathname);

  useEffect(() => {
    async function loadResources() {
      try {
        // Por exemplo: carregue fontes, dados, etc
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    loadResources();
  }, []);

  if (!isReady) {
    return null; // opcional: colocar loader personalizado aqui
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      {showBottomBar && <BottomBar />}
      <Toast />
    </GestureHandlerRootView>
  );
}
