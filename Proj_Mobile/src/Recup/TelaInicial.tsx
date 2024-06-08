

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  TelaInicial: undefined;
  TelaFibo: undefined;
  TelaProdutos: { id: string };
};

type Props = StackScreenProps<RootStackParamList, 'TelaInicial'>;

const TelaInicial: React.FC<Props> = ({ navigation }) => {
  const [productId, setProductId] = useState<string>('');

  const handleNavigateToProduct = () => {
    if (productId.trim()) {
      navigation.navigate('TelaProdutos', { id: productId });
    } else {
      Alert.alert('Erro', 'Por favor, insira um ID de produto válido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Principal</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FFA500' }]} 
        onPress={() => navigation.navigate('TelaFibo')}
      >
        <Text style={styles.buttonText}>Ir para Fibonacci</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TextInput
        style={styles.input}
        placeholder="ID do Produto"
        value={productId}
        onChangeText={setProductId}
      />
      <View style={styles.separator} />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FFA500' }]} 
        onPress={handleNavigateToProduct}
      >
        <Text style={styles.buttonText}>Alterar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000', 
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '80%', // 
    marginBottom: 20,
  },
  button: {
    width: '80%', 
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
  },
  separator: {
    height: 10, 
  },
});

export default TelaInicial;
