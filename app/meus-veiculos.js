import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function MeusVeiculos() {
  const router = useRouter();

  const [veiculos, setVeiculos] = useState([
    {
      id: "1",
      modelo: "Fiat Argo",
      placa: "ABC-1234",
      cor: "Branco",
      apelido: "Meu Argo",
      foto: null,
    },
    {
      id: "2",
      modelo: "Honda Civic",
      placa: "XYZ-5678",
      cor: "Preto",
      apelido: "Civicão",
      foto: null,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo, setModalTipo] = useState(""); // 'editar' ou 'adicionar'
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
  const [novoApelido, setNovoApelido] = useState("");
  const [novoModelo, setNovoModelo] = useState("");
  const [novaPlaca, setNovaPlaca] = useState("");
  const [novaCor, setNovaCor] = useState("");

  async function escolherFoto(id) {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Permita acesso às fotos para escolher uma imagem.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setVeiculos((old) =>
        old.map((v) => (v.id === id ? { ...v, foto: pickerResult.assets[0].uri } : v))
      );
    }
  }

  function abrirModalEditar(veiculo) {
    setVeiculoSelecionado(veiculo);
    setNovoApelido(veiculo.apelido || "");
    setModalTipo("editar");
    setModalVisible(true);
  }

  function abrirModalAdicionar() {
    setNovoApelido("");
    setNovoModelo("");
    setNovaPlaca("");
    setNovaCor("");
    setModalTipo("adicionar");
    setModalVisible(true);
  }

  function salvarEdicao() {
    setVeiculos((old) =>
      old.map((v) =>
        v.id === veiculoSelecionado.id ? { ...v, apelido: novoApelido } : v
      )
    );
    setModalVisible(false);
  }

  function adicionarVeiculo() {
    if (!novoModelo || !novaPlaca || !novaCor) {
      Alert.alert("Preencha todos os campos para adicionar um veículo.");
      return;
    }

    const novoVeiculo = {
      id: Date.now().toString(),
      modelo: novoModelo,
      placa: novaPlaca.toUpperCase(),
      cor: novaCor,
      apelido: novoApelido,
      foto: null,
    };
    setVeiculos((old) => [...old, novoVeiculo]);
    setModalVisible(false);
  }

  const renderItem = ({ item }) => (
    <View style={styles.containerVeiculo}>
      <TouchableOpacity onPress={() => abrirModalEditar(item)}>
        <Text style={styles.apelido}>{item.apelido || "Sem Apelido"}</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => escolherFoto(item.id)} style={styles.circuloImagem}>
          {item.foto ? (
            <Image source={{ uri: item.foto }} style={styles.foto} />
          ) : (
            <Ionicons name="car-outline" size={28} color="#003D4C" />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push(`/veiculo/${item.id}`)} style={styles.placaContainer}>
          <Text style={styles.placa}>{item.placa}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.descritivo}>
        {item.modelo} • Cor: {item.cor}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Meus Veículos</Text>
          <View style={{ width: 28 }} />
        </View>

        <Text style={styles.subTitulo}>
          Acesse os detalhes e o histórico de manutenção dos seus veículos.
        </Text>

        <View style={styles.infoContainer}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#003d4c"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.infoTexto}>
            Selecione a placa do veículo para navegar pelas funcionalidades e serviços de cada um de forma rápida e prática.
          </Text>
        </View>

        <FlatList
          data={veiculos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {modalTipo === "editar" && (
                <>
                  <Text style={styles.modalTitle}>Editar Apelido</Text>
                  <TextInput
                    style={styles.input}
                    value={novoApelido}
                    onChangeText={setNovoApelido}
                    placeholder="Digite um apelido"
                  />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#003D4C" }]} onPress={salvarEdicao}>
                      <Text style={styles.modalButtonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#E0F2F1" }]} onPress={() => setModalVisible(false)}>
                      <Text style={styles.modalButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {modalTipo === "adicionar" && (
                <>
                  <Text style={styles.modalTitle}>Adicionar Veículo</Text>
                  <TextInput
                    style={styles.input}
                    value={novoModelo}
                    onChangeText={setNovoModelo}
                    placeholder="Modelo"
                  />
                  <TextInput
                    style={styles.input}
                    value={novaPlaca}
                    onChangeText={setNovaPlaca}
                    placeholder="Placa"
                    autoCapitalize="characters"
                  />
                  <TextInput
                    style={styles.input}
                    value={novaCor}
                    onChangeText={setNovaCor}
                    placeholder="Cor"
                  />
                  <TextInput
                    style={styles.input}
                    value={novoApelido}
                    onChangeText={setNovoApelido}
                    placeholder="Apelido (opcional)"
                  />
                  <View style={styles.modalButtons}>
                    <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#003D4C" }]} onPress={adicionarVeiculo}>
                      <Text style={styles.modalButtonText}>Adicionar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#999" }]} onPress={() => setModalVisible(false)}>
                      <Text style={styles.modalButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFBAA",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  header: {
    marginTop: 55, // 👈 espaçamento aumentado
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003D4C",
    textAlign: "center",
    flex: 1,
  },
  subTitulo: {
    marginTop: 13,
    marginBottom: 20,
    fontSize: 15,
    color: "#003d4c",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  infoContainer: {
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderColor: "#f0f0f9",
    backgroundColor: "#F0F0F0",
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#b5b1a7",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: -20,
  },
  infoTexto: {
    fontSize: 13,
    color: "#003d4c",
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
  },
  containerVeiculo: {
    marginBottom: 30,
  },
  apelido: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003D4C",
    marginBottom: 8,
    marginLeft: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#003d4c",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  circuloImagem: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    overflow: "hidden",
  },
  foto: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  placaContainer: {
    flex: 1,
  },
  placa: {
    fontSize: 24,
    fontWeight: "700",
    color: "#003D4C",
  },
  descritivo: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#003D4C",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
