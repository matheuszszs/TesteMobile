import React, { useState } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';
import { Aval1Props } from './Navegacao';

const Avaliativa1 = ({navigation}: Aval1Props) => {
    const [numero, setNumero] = useState('');
    const [resultado, setResultado] = useState('');

    const Calcular = () => {
        const n1 = parseInt(numero);
        let div3 = '';

        if (!isNaN(n1)) {
            for (let i = 1; i < n1; i++) {
                if (i % 3 === 0) {
                    div3 += i + ', ';
                }
            }
            setResultado(div3)
        }else{
            setResultado('Insira um número válido!')
        }
    };

    return (
        <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center' 
            }}>

          <TextInput style={{ 
                borderWidth: 1, 
                padding: 10, 
                marginBottom: 20 }}

            placeholder="Insira um número"
            keyboardType="numeric"
            value={numero}
            onChangeText={text => setNumero(text)}
          />
          <Button
            title="Calcular"
            onPress={Calcular} />

          <Text style={{ marginTop: 20 }}>
            Números divisíveis por 3 até {numero}:
          </Text>
          <Text>{resultado}</Text>
        </View>
      );

}

export default Avaliativa1;