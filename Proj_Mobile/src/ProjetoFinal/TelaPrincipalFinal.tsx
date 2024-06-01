import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';
import ListaFlat from '../ListaFlat';
import { PrincipalFinalProps } from './navigation/Navegacao';



const TelaPrincipalFinal = ({ navigation, route }: 
    PrincipalFinalProps) => {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Bem Vindo</Text>
    
                {/* <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaCadCliente') }}>
                    <Text style={styles.desc_botao}>Calcular Média</Text>
                </Pressable>
    
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaCadAtendimento') }}>
                    <Text style={styles.desc_botao}>Cadastrar Nota</Text>
                </Pressable> */}

                <ListaFlat/>
            </View>
        );
    }

    export default TelaPrincipalFinal;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFFACD'
        },
        titulo: {
            fontSize: 40
        },
        botao: {
            justifyContent: 'center',
            backgroundColor: 'green',
            paddingVertical: 10,
            paddingHorizontal: 30,
            marginTop: 20,
            borderRadius: 10
        },
        desc_botao: {
            fontSize: 20,
            color: 'white'
        },
    });
    