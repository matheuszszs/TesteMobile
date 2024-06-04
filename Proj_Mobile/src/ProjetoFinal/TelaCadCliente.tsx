import { useState } from "react"
import { IClientes } from "./IClientes";
import firestore from '@react-native-firebase/firestore'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Carregamento from "./Carregamento";
import { CadClienteProps } from "./navigation/Navegacao";

const TelaCadCliente = ({ navigation, route }: CadClienteProps) => {
    const [nome, setNome] = useState('');
    const [cpf, setCPF] = useState('');
    const [endereco, setEndereco] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);


    function cadastrarCliente() {
        setIsCarregando(true)

        if (verificaCampos()) {
            let cliente = {
                nome: nome,
                cpf: cpf,
                endereco: endereco,
                created_at: firestore.FieldValue.serverTimestamp()
            } as IClientes;

            firestore()
                .collection('clientes')
                .add(cliente)
                .then(() => {
                    Alert.alert('cliente', 'Cadastrado com Sucesso!')
                    navigation.navigate('TelaPrincipalFinal')
                })
                .catch((error) => console.log(error))
                .finally(() => setIsCarregando(false));

        }
        setIsCarregando(false);
    }

    function verificaCampos() {
        if (nome == '') {
            Alert.alert('Nome em branco',
                'Digite um nome para o cliente'
            )
            return false;
        }

        if (cpf == '') {
            Alert.alert('CPF em branco',
                'Digite um CPF válido'
            )
            return false;
        }

        if (endereco == '') {
            Alert.alert('endereco em branco',
                'Digite um endereço válido'
            )
        }

        return true;
    }

    return (
        <View style={styles.container}>

            <Carregamento isCarregando={isCarregando} />

            <Text style={styles.label}>Nome do Cliente</Text>
            <TextInput
                style={styles.caixa_texto}
                onChangeText={(text) => { setNome(text) }} />

            <Text>CPF</Text>
            <TextInput
                style={styles.caixa_texto}
                numberOfLines={4}
                maxLength={100}
                onChangeText={(text) => { setCPF(text) }} />

            <Text>Endereço</Text>
            <TextInput
                style={styles.caixa_texto}
                numberOfLines={2}
                onChangeText={(text) => { setEndereco(text) }} />
            <Pressable
                style={styles.botao}
                onPress={() => cadastrarCliente()}>
                <Text style={styles.desc_botao}>Cadastrar Cliente</Text>
            </Pressable>
        </View>
    )

}

export default TelaCadCliente;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: 'khaki',
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
    label: {
        color: 'black'
    }
})