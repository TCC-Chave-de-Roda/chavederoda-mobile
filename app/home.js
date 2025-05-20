import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const imagensPropaganda = [
  require('../assets/images/promo1.png'),
  require('../assets/images/promo2.png'),
  require('../assets/images/promo3.png'),
  require('../assets/images/promocao.png'),
];

// Ícones para cada ação (pode ajustar conforme seus ícones)
const acoes = [
  { key: 'veiculos', label: 'Meus Veículos', icon: 'car-sport', screen: 'Veiculos' },
  { key: 'oficinas', label: 'Minhas Oficinas', icon: 'build', screen: 'Oficinas' },
  { key: 'notificacoes', label: 'Minhas Notificações', icon: 'notifications', screen: 'Notificacoes' },
  { key: 'promocoes', label: 'Promoções', icon: 'local-offer', screen: 'Promocoes' },
];

export default function Conta({ route }) {
  const navigation = useNavigation();

  // Simulação do nome vindo do cadastro
  const nomeUsuario = route?.params?.nomeUsuario || 'Usuário';

  // Estado para troca automática da propaganda
  const [propIndex, setPropIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPropIndex((prev) => (prev + 1) % imagensPropaganda.length);
    }, 6000); // troca a cada 6s
    return () => clearInterval(timer);
  }, []);

  // Renderiza item da lista de ações
  function renderAcao({ item }) {
    return (
      <TouchableOpacity
        style={styles.itemAcao}
        onPress={() => navigation.navigate(item.screen)}
      >
        <Ionicons name={item.icon} size={24} color="#003D4C" />
        <Text style={styles.textoAcao}>{item.label}</Text>
        <Ionicons name="chevron-forward" size={20} color="#003D4C" />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Topo */}
      <View style={styles.topo}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notificacoes')}>
          <Ionicons name="notifications" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Saudação */}
      <View style={styles.saudacao}>
        <Image
          source={require('../assets/images/splash-chave.png')}
          style={styles.logoChave}
          resizeMode="contain"
        />
        <Text style={styles.textoSaudacao}>Bem-vindo(a), {nomeUsuario}</Text>
      </View>

      {/* Propaganda */}
      <View style={styles.propaganda}>
        <Image
          source={imagensPropaganda[propIndex]}
          style={styles.imagemPropaganda}
          resizeMode="contain"
        />
      </View>

      {/* Ações */}
      <FlatList
        data={acoes}
        renderItem={renderAcao}
        keyExtractor={(item) => item.key}
        style={styles.listaAcoes}
        scrollEnabled={false}
      />

      {/* Barra de busca no rodapé */}
      <View style={styles.rodape}>
        <Ionicons name="search" size={24} color="#003D4C" style={{ marginHorizontal: 8 }} />
        <TextInput
          placeholder="Buscar..."
          placeholderTextColor="#666"
          style={styles.inputBusca}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topo: {
    backgroundColor: '#003D4C',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  saudacao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  logoChave: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  textoSaudacao: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003D4C',
  },
  propaganda: {
    marginVertical: 15,
    alignItems: 'center',
  },
  imagemPropaganda: {
    width: width * 0.9,
    height: 120,
    borderRadius: 10,
  },
  listaAcoes: {
    marginHorizontal: 15,
  },
  itemAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  textoAcao: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#003D4C',
    fontWeight: '600',
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  inputBusca: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
    color: '#003D4C',
  },
});
