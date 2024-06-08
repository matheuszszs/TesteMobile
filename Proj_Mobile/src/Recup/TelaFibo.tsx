

import React, { useState } from 'react';
import { View, TextInput, Button, Text, Modal, StyleSheet, Pressable } from 'react-native';

const TelaFibo = () => {
  const [number, setNumber] = useState<string>('');
  const [sequence, setSequence] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const calculateFibonacci = (num: number): number[] => {
    let fib = [1, 1];
    for (let i = 2; i < num; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib.slice(0, num);
  };

  const handleCalculate = () => {
    const num = parseInt(number, 10);
    if (!isNaN(num) && num > 0) {
      setSequence(calculateFibonacci(num));
      setModalVisible(true);
    } else {
      setSequence([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conta Fibonacci</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite um número"
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />
      <Button
        title="Calcular Fibonacci"
        onPress={handleCalculate}
        color="#FFA500" 
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Sequência de Fibonacci:</Text>
            <Text style={styles.sequenceText}>{sequence.join(', ')}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FF0000', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F0E68C', 
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sequenceText: {
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#FF6347', 
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TelaFibo;
