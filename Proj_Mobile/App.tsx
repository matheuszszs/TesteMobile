import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import HomeNavigator from './src/navigation/HomeNavigator';
import Navegacao from './src/AtividadeAvaliativa2/Navegacao';


export default function App() {
  return (
    <NavigationContainer>
      <Navegacao/>
    </NavigationContainer>
  );
}
