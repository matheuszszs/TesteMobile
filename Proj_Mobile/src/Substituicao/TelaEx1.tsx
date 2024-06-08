import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const TelaEx1 = () => {
  const [inputValue, setInputValue] = useState('');
  const [fibonacciSequence, setFibonacciSequence] = useState<number[]>([]);

  const calculateFibonacci = (n: number) => {
    let sequence = [1, 1];
    for (let i = 2; i < n; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence.slice(0, n);
  };

  const handleCalculate = () => {
    const num = parseInt(inputValue, 10);
    if (num > 0) {
      setFibonacciSequence(calculateFibonacci(num));
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Digite um número"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Calcular" onPress={handleCalculate} />
      {fibonacciSequence.length > 0 && (
        <Text style={{ marginTop: 20 }}>
          Sequência: {fibonacciSequence.join(', ')}
        </Text>
      )}
    </View>
  );
};

export default TelaEx1;
