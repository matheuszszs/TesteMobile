import React from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';

const Exemplo1 = () => {
  return (
    <ScrollView>
      <Text>Algum texto</Text>
      <View>
        <Text>Mais Algum Texto</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="Digite aqui"
      />
    </ScrollView>
  );
};

export default Exemplo1;