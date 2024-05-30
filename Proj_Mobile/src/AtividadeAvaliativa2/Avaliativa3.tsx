import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, StyleSheet, View } from 'react-native';
import { Aval3Props } from './Navegacao';

const Stack = createStackNavigator();

// Tela inicial
const Avaliativa3 = ({ navigation }: Aval3Props) => {
    return (
        <View style={styles.container}>
            <Button 
                title='Contador'
                onPress={() => navigation.navigate('Avaliativa1')} />

            <Button 
                title='Cadastro de Produtos'
                onPress={() => navigation.navigate('Avaliativa2')} /> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Avaliativa3;