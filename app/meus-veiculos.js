import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
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
  const [veiculoModal, setVeiculoModal] = useState(null);
  const [modalEditarApelido, setModalEditarApelido] = useState(false);
  const [novoApelido, setNovoApelido] = useState("");

  async function escolherFoto(id) {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permita acesso às fotos para escolher uma imagem.");
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

  function abrirModalPlaca(veiculo) {
    setVeiculoModal(veiculo);
    setModalVisible(true);
  }

  function fecharModal() {
    setModalVisible(false);
    setVeiculoModal(null);
  }

  function abrirModalEditarApelido(veiculo) {
    setVeiculoModal(veiculo);
    setNovoApelido(veiculo.apelido || "");
    setModalEditarApelido(true);
  }

  function fecharModalEditarApelido() {
    setModalEditarApelido(false);
    setVeiculoModal(null);
    setNovoApelido("");
  }

  function salvarApelido() {
    if (veiculoModal) {
      setVeiculos((old) =>
        old.map((v) =>
          v.id === veiculoModal.id ? { ...v, apelido: novoApelido } : v
        )
      );
    }
    fecharModalEditarApelido();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
          </TouchableOpacity>
          <Text style={styles.titulo}>Meus Veículos</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Subtítulo */}
        <Text style={styles.subTitulo}>
          Acesse os detalhes e o histórico de manutenção dos seus veículos.
        </Text>

        {/* Info */}
        <View style={styles.infoContainer}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#003d4c"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.infoTexto}>
            Selecione a placa do veículo para navegar pelas funcionalidades e
            serviços de cada um de forma rápida e prática.
          </Text>
        </View>

        {/* Lista veículos */}
        <FlatList
          data={veiculos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.containerVeiculo}>
              <TouchableOpacity
                onPress={() => abrirModalEditarApelido(item)}
                style={{ flexDirection: "row", alignItems: "center", marginLeft: 10, marginBottom: 8 }}
              >
                <Text style={[styles.apelido, { textDecorationLine: "none" }]}>
                  {item.apelido || "Sem Apelido"}
                </Text>
                <Ionicons
                  name="pencil-outline"
                  size={18}
                  color="#003D4C"
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>

              <View style={styles.card}>
                {/* Círculo com foto */}
                <TouchableOpacity
                  onPress={() => escolherFoto(item.id)}
                  style={styles.circuloImagem}
                >
                  {item.foto ? (
                    <Image source={{ uri: item.foto }} style={styles.foto} />
                  ) : (
                    <Ionicons name="car-outline" size={28} color="#003D4C" />
                  )}
                </TouchableOpacity>

                {/* Placa - agora abre modal */}
                <TouchableOpacity
                  onPress={() => abrirModalPlaca(item)}
                  style={styles.placaContainer}
                >
                  <Text style={styles.placa}>{item.placa}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.descritivo}>
                {item.modelo} • Cor: {item.cor}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Modal ao clicar na placa */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { width: "100%" }]}>
              {/* aumentei a largura aqui */}
              <Text style={styles.modalTitle}>Opções do Veículo</Text>
              <Text style={styles.modalDescription}>
                Selecione uma opção para seu veículo:
              </Text>

              <TouchableOpacity
                style={[
  styles.modalButton,
  {
    backgroundColor: "#fff",     // fundo branco
    borderWidth: 1,
    borderColor: "#f5f5f5",         // borda cinza
    marginBottom: 15,
    elevation: 2,
  }
]}

                onPress={() => {
                  setModalVisible(false);
                  router.push(`/historico/${veiculoModal?.id}`);
                }}
              >
                <Text style={styles.modalButtonText}>
                  Visualize seu histórico de manutenções realizadas
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#E0F2F1" }]}
                onPress={() => {
                  setModalVisible(false);
                  router.push(`/servicos-pendentes/${veiculoModal?.id}`);
                }}
              >
                <Text style={[styles.modalButtonText, { color: "#003d4c" }]}>
                  Visualize os serviços pendentes do seu veículo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal para editar apelido */}
        <Modal
          visible={modalEditarApelido}
          animationType="slide"
          transparent
          onRequestClose={fecharModalEditarApelido}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { width: "90%" }]}>
              <Text style={styles.modalTitle}>Editar Apelido</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite um novo apelido"
                value={novoApelido}
                onChangeText={setNovoApelido}
              />
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#E0F2F1", flex: 1, marginRight: 10 }]}
                  onPress={fecharModalEditarApelido}
                >
                  <Text style={[styles.modalButtonText, { color: "#003d4c" }]}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={[styles.modalButton, { backgroundColor: "#003d4c", flex: 1 }]}
                  onPress={salvarApelido}
                >
                  <Text style={[styles.modalButtonText, { color: "#fff" }]}>Salvar</Text>

                </TouchableOpacity>
              </View>
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
    marginTop: 55,
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
    fontSize: 18,
    fontWeight: "600",
    color: "#003D4C",
    marginBottom: 4
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
    width: 55,
    height: 55,
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
    color: "#003d4c",
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
    padding: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 25,
    color: "#003D4C",
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: "#003D4C",
    textAlign: "center",

  },
  modalButton: {
    borderRadius: 9,
    paddingVertical: 14,
    paddingHorizontal:15,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#003d4c",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 7,
    padding: 12,
    fontSize: 16,
    color: "#003D4C",
    backgroundColor: "#Fff",
    elevation: 2
  },
});
