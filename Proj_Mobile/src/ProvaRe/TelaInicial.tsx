import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  TelaInicial: undefined;
  TelaFibo: undefined;
  AlterarProd: { id: string };
};

type Props = StackScreenProps<RootStackParamList, 'TelaInicial'>;

const TelaInicial: React.FC<Props> = ({ navigation }) => {
  const [productId, setProductId] = useState<string>('');

  const handleNavigateToProduct = () => {
    if (productId.trim()) {
      navigation.navigate('AlterarProd', { id: productId });
    } else {
      Alert.alert('Erro', 'Por favor, insira um ID de produto válido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Menu</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#009688' }]} 
        onPress={() => navigation.navigate('TelaFibo')}
      >
        <Text style={styles.buttonText}>Calcular Fibonacci</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TextInput
        style={styles.input}
        placeholder="Digite o ID do Produto"
        value={productId}
        onChangeText={setProductId}
      />
      <View style={styles.separator} />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#00796B' }]} 
        onPress={handleNavigateToProduct}
      >
        <Text style={styles.buttonText}>Acessar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0', 
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333', 
  },
  input: {
    height: 40,
    borderColor: '#757575', 
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '80%',
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
