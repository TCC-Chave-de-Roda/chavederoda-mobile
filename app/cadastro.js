import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, useWindowDimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CadastroScreen() {
  const { width } = useWindowDimensions();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const senhaValida = senha.length >= 8 && /[A-Z]/.test(senha) && /\d/.test(senha);
  const senhasIguais = senha === confirmarSenha;
  const podeCadastrar = nome && email && senhaValida && senhasIguais;

  return (
    <View style={styles.container}>

      {/* 🔙 Botão Voltar */}
      <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
        <Ionicons name="chevron-back-outline" size={30} color="#003D4C" />
      </TouchableOpacity>

      {/* Área fixa para a logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/splash-chave.png')}
          style={[styles.logo, { width: width * 0.3, height: width * 0.3 }]}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.titulo}>Crie sua conta</Text>

      <View style={styles.campo}>
        <Ionicons name="person-outline" size={20} color="#003D4C" />
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#003D4C"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.campo}>
        <Ionicons name="mail-outline" size={20} color="#003D4C" />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#003D4C"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.campo}>
        <Ionicons name="lock-closed-outline" size={20} color="#003D4C" />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#003D4C"
          secureTextEntry={!mostrarSenha}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Ionicons name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'} size={20} color="#003D4C" />
        </TouchableOpacity>
      </View>
      {!senhaValida && senha.length > 0 && (
        <Text style={styles.erro}>Use no mínimo 8 caracteres, com 1 letra maiúscula e 1 número.</Text>
      )}

      <View style={styles.campo}>
        <Ionicons name="lock-closed-outline" size={20} color="#003D4C" />
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#003D4C"
          secureTextEntry={!mostrarSenha}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
      </View>
      {!senhasIguais && confirmarSenha.length > 0 && (
        <Text style={styles.erro}>As senhas não coincidem.</Text>
      )}

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: podeCadastrar ? '#003d4c' : '#003D4C' }]}
        onPress={() => {
          if (podeCadastrar) {
            alert('Cadastro realizado com sucesso!');
            router.replace('/login');
          }
        }}
        disabled={!podeCadastrar}
      >
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>Já tem uma conta? Fazer login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFBAA',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logoContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    opacity: 0.9,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003D4C',
    marginBottom: 30,
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#003D4C',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    width: '100%',
    backgroundColor: '#F9FAFBAA',
    shadowColor: '#F9FAFBAA',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 45,
    paddingLeft: 10,
    color: '#003D4C',
    fontWeight: '500',
  },
  botao: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  erro: {
    color: '#DC2626',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  link: {
    color: '#003D4C',
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
