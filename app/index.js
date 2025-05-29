import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

export default function WelcomeScreen() {
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: width * 0.05,
        }}
      >
        {/* Imagem/logo */}
        <Image
          source={require('../assets/images/splash-chave.png')}
          style={{
            width: width * 0.4,
            height: width * 0.4,
            maxWidth: 200,
            maxHeight: 300,
          }}
          resizeMode="contain"
        />

        {/* Texto principal */}
        <Text
          style={{
            textAlign: 'center',
            fontSize: width * 0.045,
            fontWeight: '600',
            color: '#003D4C',
            marginTop: height * 0.03,
            marginHorizontal: width * 0.1,
          }}
        >
          Mantenha seu histórico de serviços sempre à mão. Entre e experimente a excelência que você merece.
        </Text>

        {/* Botões */}
        <View
          style={{
            marginTop: height * 0.05,
            width: '100%',
            alignItems: 'center',
          }}
        >
          {[
            { label: 'Fazer login', route: '/login' },
            { label: 'Cadastre-se', route: '/cadastro' },
          ].map((btn) => (
            <TouchableOpacity
              key={btn.route}
              style={{
                backgroundColor: '#003D4C',
                paddingVertical: height * 0.015,
                width: '90%',
                borderRadius: 10,
                marginBottom: height * 0.025,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: Platform.OS === 'android' ? 3 : 0,
              }}
              onPress={() => router.push(btn.route)}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: width * 0.05,
                }}
              >
                {btn.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
