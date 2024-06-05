import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore'
import { IClientes } from "./model/IClientes";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Carregamento from "./Carregamento";
import { AltClienteProps } from "./navigation/Navegacao";

const TelaAltCliente = ({navigation, route}: AltClienteProps) => {
    const [id,] = useState(route.params.id);
    const [nome, setNome] = useState('');
    const [cpf, setCPF] = useState('');
    const [endereco, setEndereco] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function carregar() {
        setIsCarregando(true);
        const resultado = await firestore()
        .collection('cliente')
        .doc(id)
        .get();

        const cliente = {
            id: resultado.id,
            ...resultado.data()
        } as IClientes;

        setNome(cliente.nome);
        setCPF(cliente.cpf);
        setEndereco(cliente.endereco);
        setIsCarregando(false);

    };

    useEffect(() => {
        carregar();
    }, [])

    function alterar(){
        setIsCarregando(true)

        firestore()
            .collection('')
            .doc(id)
            .update({
                nome,
                cpf,
                endereco,
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Cadastro de Cliente", "Alterado com Sucesso")
                navigation.goBack();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));
    }

    return(
        <View 
            style={styles.container}>
            <Carregamento isCarregando = {isCarregando} /> 

        <Text style = {styles.titulo}>Editar Cliente</Text>

        <Text style = {styles.desc_caixa_texto}>Nomes</Text>
        <TextInput 
            style = {styles.caixa_texto}
            value = {nome}
            onChangeText = {(text) => { setNome(text) }}/>

        <Text style = {styles.desc_caixa_texto}>Endereço</Text>
        <TextInput
            style = {styles.caixa_texto}
            value = {endereco}
            onChangeText = {(text) => {setEndereco(text) }}/>

        <Text></Text>

        <Pressable
            style = {styles.botao}
            onPress={() => alterar()}
            disabled={isCarregando}>
                <Text style={styles.desc_botao}>Alterar</Text>
            </Pressable>
        </View>
    );
} 

export default TelaAltCliente;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: "center"
    },
    titulo : {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 40,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: 'black',
    },
    desc_caixa_texto: {
        fontSize: 20,
        color: 'black',
        paddingBottom: 30,
        textAlign: 'center',
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white',
    },
    desc_botao: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'black'
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 10
    },
})