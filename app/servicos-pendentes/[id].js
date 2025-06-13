import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ServicosPendentes() {
  const navigation = useNavigation(); // <- Hook para navegação
  const [modalVisible, setModalVisible] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);

  const servicos = [
    {
      id: 1,
      titulo: 'Troca de Óleo',
      detalhes: ['Produto: Óleo Lubrificante', 'Marca: Shell Helix', 'Valor estimado: R$ 150,00'],
    },
    {
      id: 2,
      titulo: 'Alinhamento',
      detalhes: ['Serviço: Geometria', 'Valor estimado: R$ 80,00'],
    },
    {
      id: 3,
      titulo: 'Substituição de Pastilhas',
      detalhes: ['Peça: Pastilha de Freio', 'Marca: Bosch', 'Valor estimado: R$ 220,00'],
    },
  ];

  const abrirModal = (servico) => {
    setServicoSelecionado(servico);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={28} color="#003D4C" />
      </TouchableOpacity>

      <Text style={styles.titulo}>Serviços Pendentes</Text>
      <Text style={styles.subtitulo}>Confira abaixo os serviços que ainda não foram realizados ou estão aguardando aprovação.</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {servicos.map((servico) => (
          <View key={servico.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitulo}>{servico.titulo}</Text>
              <TouchableOpacity onPress={() => abrirModal(servico)}>
                <MaterialIcons name="info" size={20} color="#003D4C" />
              </TouchableOpacity>
            </View>

            {servico.detalhes.map((linha, index) => (
              <Text key={index} style={styles.cardDetalhe}>{linha}</Text>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Modal de Detalhes */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Detalhes do Serviço</Text>

            {servicoSelecionado && (
              <>
                <Text style={styles.modalSubtitulo}>{servicoSelecionado.titulo}</Text>
                {servicoSelecionado.detalhes.map((linha, index) => (
                  <Text key={index} style={styles.modalTexto}>{linha}</Text>
                ))}
              </>
            )}

            <View style={styles.modalButtons}>
              <Pressable style={styles.btnFechar} onPress={() => setModalVisible(false)}>
                <Text style={styles.textFechar}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 65,
    left: 16,
    zIndex: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003D4C',
    textAlign: 'center',
    marginBottom: 22,
  },
  subtitulo: {
    fontSize: 15,
    color: '#003d4c',
    textAlign: 'center',
    marginBottom: 25,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003D4C',
  },
  cardDetalhe: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003D4C',
    marginBottom: 10,
  },
  modalSubtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003D4C',
    marginBottom: 6,
  },
  modalTexto: {
    fontSize: 14,
    color: '#003d4c',
    marginBottom: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  btnFechar: {
    backgroundColor: '#003D4C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  textFechar: {
    color: '#fff',
    fontWeight: '600',
  },
});
