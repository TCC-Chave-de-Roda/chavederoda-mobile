import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const buttons = [
    { label: 'Fazer login', route: 'login' },
    { label: 'Cadastre-se', route: 'cadastro' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.innerContainer, { paddingHorizontal: width * 0.05 }]}>
        {/* Imagem/logo */}
        <Image
          source={require('../assets/images/splash-chave.png')}
          style={{ width: width * 0.4, height: width * 0.4 }}
          resizeMode="contain"
        />

        {/* Texto principal */}
        <Text
          style={[
            styles.mainText,
            {
              fontSize: width * 0.045,
              marginTop: height * 0.03,
              marginHorizontal: width * 0.1,
            },
          ]}
        >
          Mantenha seu histórico de serviços sempre à mão. Entre e experimente a excelência que você merece.
        </Text>

        {/* Botões */}
        <View style={[styles.buttonContainer, { marginTop: height * 0.05 }]}>
          {buttons.map((btn) => (
            <TouchableOpacity
              key={btn.route}
              style={[styles.button, { paddingVertical: height * 0.015, marginBottom: height * 0.025 }]}
              onPress={() => {
                console.log(`Clicou em: ${btn.label}`);
                router.push(btn.route);
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, { fontSize: width * 0.05 }]}>{btn.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#003D4C',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#003D4C',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#003d4c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: Platform.OS === 'android' ? 3 : 0,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
