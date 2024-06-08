import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from '../ProvaRe/TelaInicial';
import Fibonacci from '../ProvaRe/Fibonacci';
import AlterarProd from '../ProvaRe/AlterarProd';

type RootStackParamList = {
  TelaInicial: undefined;
  TelaFibo: undefined;
  AlterarProd: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TelaInicial">
      <Stack.Screen name="TelaInicial" component={TelaInicial} />
      <Stack.Screen name="TelaFibo" component={Fibonacci} />
      <Stack.Screen name="AlterarProd" component={AlterarProd} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
