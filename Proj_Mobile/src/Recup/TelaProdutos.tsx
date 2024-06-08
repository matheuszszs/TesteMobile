

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'; 
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  TelaInicial: undefined;
  TelaFibo: undefined;
  TelaProdutos: { id: string };
};

type Props = StackScreenProps<RootStackParamList, 'TelaProdutos'>;

const TelaProdutos: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [nome, setNome] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [codigoBarras, setCodigoBarras] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await firestore().collection('produtos').doc(id).get(); 
        if (productDoc.exists) {
          const productData = productDoc.data(); 
          setNome(productData?.nome ?? ''); 
          setPreco(productData?.preco ?? ''); 
          setCodigoBarras(productData?.codigoBarras ?? ''); 
        } else {
          Alert.alert('Erro', 'Produto não encontrado.'); 
          navigation.goBack(); 
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar o produto.'); 
        console.error(error); 
        navigation.goBack(); 
      }
    };

    fetchProduct(); 
  }, [id, navigation]); 

  const handleSalvarAlteracoes = async () => {
    try {
      await firestore().collection('produtos').doc(id).update({
        nome,
        preco,
        codigoBarras,
      });
      Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar o produto.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Produto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.label}>Preço do Produto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Código de Barras:</Text>
      <TextInput
        style={styles.input}
        placeholder="Código de Barras"
        value={codigoBarras}
        onChangeText={setCodigoBarras}
        keyboardType="numeric"
      />
      <Button
        title="Salvar Alterações"
        onPress={handleSalvarAlteracoes}
        color="#FFA500" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FF0000', 
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#FFFFFF', 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default TelaProdutos;
