import { Modal, View, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

type CarregamentoProps = {
    isCarregando: boolean;
}

const Carregamento = (props: CarregamentoProps) => {
    return (
        <Modal
            visible= {props.isCarregando}
            transparent={false}>
                <View style={styles.container}>
                    <ActivityIndicator size={"large"}></ActivityIndicator>
                </View>
        </Modal>
        );
}

export default Carregamento;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20, 
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: 537,
    },
    container_cadastro: {
        flex: 2,
        alignItems: 'center'
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
    },
    painel_imagem: {
        flex:1,
        alignItems:'center', 
        justifyContent:'center'
    },
    imagem: { 
        width: 200, 
        height: 200, 
        resizeMode: "center"
    }
})