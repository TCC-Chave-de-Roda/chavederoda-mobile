import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MinhasQuilometragens() {
  const router = useRouter();

  const [veiculos, setVeiculos] = useState([
    { id: "1", placa: "ABC-1234", quilometragem: 42000 },
    { id: "2", placa: "XYZ-5678", quilometragem: 15800 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlaca, setSelectedPlaca] = useState(null);
  const [novaQuilometragem, setNovaQuilometragem] = useState("");

  const abrirModal = () => {
    setSelectedPlaca(null);
    setNovaQuilometragem("");
    setModalVisible(true);
  };

  const atualizarQuilometragem = () => {
    if (!selectedPlaca || !novaQuilometragem) {
      alert("Por favor, selecione a placa e informe a nova quilometragem.");
      return;
    }
    setVeiculos((oldVeiculos) =>
      oldVeiculos.map((v) =>
        v.placa === selectedPlaca
          ? { ...v, quilometragem: parseInt(novaQuilometragem, 10) }
          : v
      )
    );
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={28} color="#003D4C" />
          </TouchableOpacity>
          <Text style={styles.title}>Minhas Quilometragens</Text>
          <View style={{ width: 28 }} />
        </View>

        <Text style={styles.description}>
          Atualize aqui suas quilometragens para receber notificações de manutenções próximas.
        </Text>

        <TouchableOpacity
          style={styles.cardButton}
          activeOpacity={0.7}
          onPress={abrirModal}
        >
          <View style={styles.circleIcon}>
            <Ionicons name="pencil-outline" size={20} color="#00695C" />
          </View>
          <Text style={styles.cardButtonText}>Clique para atualizar sua manutenção</Text>
        </TouchableOpacity>

        <ScrollView style={{ marginTop: 10, marginBottom: 20 }}>
          {veiculos.map((v) => (
            <View key={v.id} style={styles.vehicleCard}>
              <View style={styles.circleIcon}>
                <Ionicons name="car-outline" size={24} color="#003d4c" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.vehiclePlate}>{v.placa}</Text>
                <Text style={styles.vehicleKm}>Quilometragem: {v.quilometragem} km</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Modal Atualizado */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Atualizar Quilometragem</Text>

              <Text style={styles.modalLabel}>Selecione a placa que deseja atualizar:</Text>
              {veiculos.map((v) => (
                <TouchableOpacity
                  key={v.id}
                  style={[
                    styles.placaOption,
                    selectedPlaca === v.placa && styles.placaOptionSelected,
                  ]}
                  onPress={() => setSelectedPlaca(v.placa)}
                >
                  <Text
                    style={[
                      styles.placaOptionText,
                      selectedPlaca === v.placa && styles.placaOptionTextSelected,
                    ]}
                  >
                    {v.placa}
                  </Text>
                </TouchableOpacity>
              ))}

              <TextInput
                style={styles.input}
                placeholder=" digite aqui sua nova quilometragem"
                keyboardType="numeric"
                value={novaQuilometragem}
                onChangeText={setNovaQuilometragem}
                placeholderTextColor="#003d4c"
              />

              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={[styles.modalButtonText, { color: "#003D4C" }]}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={atualizarQuilometragem}
                >
                  <Text style={[styles.modalButtonText, { color: "#fff" }]}>Salvar</Text>
                </Pressable>
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
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#003D4C",
    textAlign: "center",
    flex: 1,
  },
  description: {
    fontSize: 15,
    color: "#003D4C",
    textAlign: "center",
    marginTop: 14,
    marginBottom: 25,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  cardButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 25,
  },
  cardButtonText: {
    color: "#003D4C",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 12,
  },
  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  vehiclePlate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003D4C",
  },
  vehicleKm: {
    fontSize: 14,
    color: "#546E7A",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.11)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 18,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#003D4C",
    marginBottom: 20,
    textAlign: "center",
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003D4C",
    marginBottom: 12,
  },
  placaOption: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  placaOptionSelected: {
    backgroundColor: "#003D4C",
    borderColor: "#003D4C",
  },
  placaOptionText: {
    color: "#003d4c",
    fontWeight: "600",
    fontSize: 16,
  },
  placaOptionTextSelected: {
    color: "white",
  },
  input: {
    backgroundColor: "#F0F7F6",
    borderWidth: 1.5,
    borderColor: "#f0f7f6",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 30,
    color: "#003D4C",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#E0F2F1",
    marginRight: 12,
  },
  saveButton: {
    backgroundColor: "#003D4C",
  },
  modalButtonText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
