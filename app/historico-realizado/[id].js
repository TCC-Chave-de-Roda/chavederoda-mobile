import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // ✅ novo
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const oficinasMock = [
  { id: "1", nome: "Oficina AutoTech" },
  { id: "2", nome: "Mecânica Rápida" },
];

const historicoMock = [
  {
    id: "h1",
    oficinaId: "1",
    oficinaNome: "Oficina AutoTech",
    data: new Date(2024, 4, 15),
    servico: "Troca de óleo e filtro",
    mecanico: "Carlos Silva",
    detalhes:
      "Troca de óleo 5W30, filtro original, inspeção geral feita com revisão de freios.",
    valor: 180,
  },
  {
    id: "h2",
    oficinaId: "2",
    oficinaNome: "Mecânica Rápida",
    data: new Date(2024, 5, 5),
    servico: "Alinhamento e balanceamento",
    mecanico: "Ana Souza",
    detalhes: "Alinhamento das quatro rodas e balanceamento com equipamento Hunter.",
    valor: 120,
  },
  {
    id: "h3",
    oficinaId: "1",
    oficinaNome: "Oficina AutoTech",
    data: new Date(2024, 6, 10),
    servico: "Substituição de pastilhas de freio",
    mecanico: "Carlos Silva",
    detalhes: "Troca das pastilhas dianteiras com peças originais Bosch.",
    valor: 350,
  },
  {
    id: "h4",
    oficinaId: "2",
    oficinaNome: "Mecânica Rápida",
    data: new Date(2024, 7, 2),
    servico: "Revisão completa do motor",
    mecanico: "Ana Souza",
    detalhes: "Limpeza do sistema de injeção, troca de filtros e velas.",
    valor: 950,
  },
];

export default function HistoricoManutencoes() {
  const navigation = useNavigation(); // ✅ substitui props
  const [filtroOficina, setFiltroOficina] = useState("");
  const [filtroData, setFiltroData] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  const abrirDatePicker = () => setDatePickerVisibility(true);
  const fecharDatePicker = () => setDatePickerVisibility(false);
  const confirmarData = (date) => {
    setFiltroData(date);
    fecharDatePicker();
  };

  const limparFiltros = () => {
    setFiltroData(null);
    setFiltroOficina("");
  };

  const historicoFiltrado = historicoMock.filter((item) => {
    const oficinaConfere = filtroOficina ? item.oficinaId === filtroOficina : true;
    const dataConfere = filtroData
      ? item.data.toDateString() === filtroData.toDateString()
      : true;
    return oficinaConfere && dataConfere;
  });

  const abrirModalServico = (item) => {
    setServicoSelecionado(item);
    setModalAberto(true);
  };

  const formatarData = (data) => {
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header com botão Voltar */}
        <View style={styles.header}>
          <View style={styles.botaoVoltarContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // ✅ aumenta área de toque
              style={styles.botaoVoltar}
            >
              <Ionicons name="chevron-back" size={28} color="#003D4C" />
            </TouchableOpacity>
          </View>

          <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>Histórico de Manutenções Realizadas</Text>
          </View>

          <View style={styles.espacoDireita} />
        </View>

        <Text style={styles.textoAbaixoTitulo}>
          Veja o histórico completo das manutenções realizadas em seu veículo. Use os filtros para facilitar a busca.
        </Text>

        {/* Filtros */}
        <View style={styles.filtrosContainer}>
          <TouchableOpacity
            style={styles.filtroBotao}
            onPress={abrirDatePicker}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={18} color="#003D4C" />
            <Text style={styles.filtroTexto}>
              {filtroData ? formatarData(filtroData) : "Filtrar por data"}
            </Text>
          </TouchableOpacity>

          <View style={{ width: 10 }} />

          <TouchableOpacity
            style={styles.filtroBotao}
            onPress={() => setMostrarDropdown((prev) => !prev)}
            activeOpacity={0.7}
          >
            <Ionicons name="business-outline" size={18} color="#003D4C" />
            <Text style={styles.filtroTexto}>
              {filtroOficina
                ? oficinasMock.find((o) => o.id === filtroOficina)?.nome
                : "Filtrar por oficina"}
            </Text>
            <Ionicons
              name={mostrarDropdown ? "chevron-up-outline" : "chevron-down-outline"}
              size={16}
              color="#003D4C"
            />
          </TouchableOpacity>
        </View>

        {mostrarDropdown && (
          <View style={styles.dropdown}>
            <ScrollView style={{ maxHeight: 150 }}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setFiltroOficina("");
                  setMostrarDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemTexto}>Todas as oficinas</Text>
              </TouchableOpacity>
              {oficinasMock.map((oficina) => (
                <TouchableOpacity
                  key={oficina.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setFiltroOficina(oficina.id);
                    setMostrarDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemTexto}>{oficina.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {(filtroData || filtroOficina) && (
          <TouchableOpacity onPress={limparFiltros} style={styles.limparFiltro}>
            <Text style={{ color: "#003D4C", fontWeight: "600" }}>Limpar filtros</Text>
          </TouchableOpacity>
        )}

        {/* Lista */}
        <FlatList
          data={historicoFiltrado}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 20 }}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => abrirModalServico(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.nomeServico}>{item.servico}</Text>
              <Text style={styles.subInfo}>
                {item.oficinaNome} - {formatarData(item.data)}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ color: "#555", textAlign: "center", marginTop: 40 }}>
              Nenhuma manutenção encontrada para esses filtros.
            </Text>
          }
        />

        {/* Modal detalhes do serviço */}
        <Modal visible={modalAberto} animationType="slide" transparent>
          <View style={styles.modalFundo}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitulo}>{servicoSelecionado?.servico}</Text>
              <Text style={styles.modalSubtitulo}>
                Oficina: {servicoSelecionado?.oficinaNome}
              </Text>
              <Text style={styles.modalSubtitulo}>
                Data: {servicoSelecionado ? formatarData(servicoSelecionado.data) : ""}
              </Text>
              <Text style={styles.modalSubtitulo}>
                Mecânico: {servicoSelecionado?.mecanico}
              </Text>
              <Text style={styles.modalDetalhes}>{servicoSelecionado?.detalhes}</Text>
              <Text style={styles.modalValor}>
                Valor: R$ {servicoSelecionado?.valor.toFixed(2)}
              </Text>

              <TouchableOpacity
                onPress={() => setModalAberto(false)}
                style={styles.botaoFecharModal}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={confirmarData}
          onCancel={fecharDatePicker}
          headerTextIOS="Selecione a data"
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
          locale="pt_BR"
        />
      </View>
    </SafeAreaView>
  );
}

// estilos (sem alteração)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAFBAA" },
  container: { flex: 1, paddingHorizontal: 20, paddingBottom: 0 },
  header: { flexDirection: "row", alignItems: "center", marginTop: 80, marginBottom: 40 },
  botaoVoltarContainer: { width: 40, justifyContent: "center", alignItems: "flex-start" },
  botaoVoltar: { padding: 4 },
  tituloContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 23, fontWeight: "bold", color: "#003D4C", textAlign: "center" },
  espacoDireita: { width: 40 },
  textoAbaixoTitulo: { color: "#003D4C", fontSize: 16, textAlign: "center" },
  filtrosContainer: { flexDirection: "row", marginTop: 20, justifyContent: "center" },
  filtroBotao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2F1",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  filtroTexto: { marginLeft: 6, color: "#003D4C", fontWeight: "600" },
  dropdown: {
    marginTop: 10,
    backgroundColor: "white",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 6,
    maxHeight: 150,
  },
  dropdownItem: { padding: 12, borderBottomColor: "#EEE", borderBottomWidth: 1 },
  dropdownItemTexto: { color: "#003D4C" },
  limparFiltro: { marginTop: 12, alignSelf: "center" },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nomeServico: { fontWeight: "600", fontSize: 18, color: "#003D4C" },
  subInfo: { fontSize: 14, color: "#555", marginTop: 4 },
  modalFundo: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003D4C",
    marginBottom: 6,
    textAlign: "center",
  },
  modalSubtitulo: { fontSize: 16, fontWeight: "600", color: "#003D4C", marginBottom: 4 },
  modalDetalhes: { fontSize: 14, color: "#333", marginVertical: 10 },
  modalValor: { fontSize: 16, fontWeight: "700", color: "#003D4C", marginBottom: 20 },
  botaoFecharModal: {
    backgroundColor: "#003D4C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
