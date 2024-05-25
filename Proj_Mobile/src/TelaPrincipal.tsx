import { Pressable, ScrollView, StyleSheet, Text, View, ScrollViewComponent, Alert, Image, } from "react-native"
import { useState } from "react";
import { PrincipalProps } from "./navigation/HomeNavigator";

const TelaPrincipal = ({navigation, route} : PrincipalProps) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style = {styles.titulo_caixa_texto}>
                    Bem vindo!
                </Text>
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? {opacity: 0.5} : null]}
                    onPress={() => {navigation.navigate('Aprovado') }}>
                    <Text style={styles.desc_botao}>Calcular Média</Text>
                </Pressable>
                    
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? {opacity: 0.5} : null]}
                    onPress={() => {navigation.navigate('TelaCadNotas') }}>
                    <Text style={styles.desc_botao}></Text>
                </Pressable>
            </View>    
        </ScrollView>
    );
}

export default TelaPrincipal;

const styles= StyleSheet.create({
    container: {
        paddingTop: 20, 
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: 537,
    },
    titulo_caixa_texto:{
        fontSize: 45,
        color: 'black',
        paddingTop: 20,
        paddingBottom: 30,
        textAlign: 'center',
    },
    caixa_texto: {
        width:'70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white',
    },
    botao: {
        backgroundColor: 'blue',
        paddingVertical: 20,
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 70,
    },
    desc_botao: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
    }
})