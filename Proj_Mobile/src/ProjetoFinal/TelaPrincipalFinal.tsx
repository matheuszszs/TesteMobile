import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';
import { PrincipalFinalProps } from './navigation/Navegacao';



const TelaPrincipalFinal = ({ navigation, route }: 
    PrincipalFinalProps) => {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Bem Vindo ao Cadastro de Clientes</Text>
    
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaCadCliente') }}>
                    <Text style={styles.desc_botao}>Cadastrar um Novo Cliente</Text>
                </Pressable>
    
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaConCliente') }}>
                    <Text style={styles.desc_botao}>Consultar Clientes</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaCadAtendimento') }}>
                    <Text style={styles.desc_botao}>Cadastrar Atendimento</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaConAtendimento') }}>
                    <Text style={styles.desc_botao}>Consultar Atendimento</Text>
                </Pressable>
            </View>
        );
    }

    export default TelaPrincipalFinal;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#EA72F0'
        },
        titulo: {
            fontSize: 35,
            color: 'black',
            textAlign: 'center',
        },
        botao: {
            justifyContent: 'center',
            backgroundColor: '#FBFFA5',
            paddingVertical: 10,
            paddingHorizontal: 30,
            marginTop: 50,
            borderRadius: 160,
        },
        desc_botao: {
            fontSize: 20,
            color: 'black'
        },
    });
    