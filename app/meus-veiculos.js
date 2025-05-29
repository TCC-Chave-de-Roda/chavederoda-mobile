import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MeusVeiculos() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [veiculos, setVeiculos] = useState([
    { id: '1', modelo: 'Fiat Argo', placa: 'ABC-1234', cor: 'Branco' },
    { id: '2', modelo: 'Honda Civic', placa: 'XYZ-5678', cor: 'Preto' },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Ionicons name="car-outline" size={30} color="#003D4C" />
      <View style={styles.info}>
        <Text style={styles.modelo}>{item.modelo}</Text>
        <Text style={styles.texto}>Placa: {item.placa}</Text>
        <Text style={styles.texto}>Cor: {item.cor}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Meus Veículos</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={veiculos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{ width: width - 40 }}
      />

      {/* Botão Adicionar */}
      <TouchableOpacity style={styles.botaoAdicionar}>
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.textoBotao}>Adicionar Veículo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFBAA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003D4C',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  info: {
    marginLeft: 15,
  },
  modelo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003D4C',
  },
  texto: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
  botaoAdicionar: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#003D4C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});


