import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import HomeNavigator from './src/navigation/HomeNavigator';
import TelaPrincipal from './src/TelaPrincipal';
import Navegacao from './src/ProjetoFinal/navigation/Navegacao';


export default function App() {
  return (
    <NavigationContainer>
      <Navegacao/>
    </NavigationContainer>
  );
}
