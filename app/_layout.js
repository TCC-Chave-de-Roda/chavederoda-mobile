import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, usePathname } from "expo-router";
import Toast from "react-native-toast-message";
import BottomBar from "./components/BottomBar"; // ajuste caminho se necessário
import * as SplashScreen from "expo-splash-screen";

// Impede que o splash screen desapareça automaticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  // Não mostrar BottomBar nessas rotas:
  const hideBottomBarRoutes = ["/", "/login", "/cadastro"];
  const showBottomBar = !hideBottomBarRoutes.includes(pathname);

  useEffect(() => {
    // Simula o carregamento de recursos, como fontes ou dados
    const loadResources = async () => {
      try {
        // Aqui você pode carregar fontes, fazer requisições de API, etc.
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulação de 2 segundos
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    };

    loadResources();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync(); // Oculta o splash screen quando os recursos estiverem prontos
    }
  }, [isReady]);

  if (!isReady) {
    return null; // Ou um componente de carregamento personalizado
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      {showBottomBar && <BottomBar />}
      <Toast />
    </GestureHandlerRootView>
  );
}
