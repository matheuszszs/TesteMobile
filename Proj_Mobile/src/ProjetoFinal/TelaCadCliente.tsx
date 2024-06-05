import { useState } from "react"
import { IClientes } from "./model/IClientes";
import firestore from '@react-native-firebase/firestore'
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Carregamento from "./Carregamento";
import { CadClienteProps } from "./navigation/Navegacao";

const TelaCadCliente = ({ navigation, route }: CadClienteProps) => {
    const [nome, setNome] = useState('');
    const [cpf, setCPF] = useState('');
    const [endereco, setEndereco] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);


    function cadastrarCliente() {
        setIsCarregando(true)

        if (verificaCampos()) {
            let cliente = {
                nome: nome,
                cpf: cpf,
                rua: rua,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                dataNasc: dataNasc,
                created_at: firestore.FieldValue.serverTimestamp()
            } as IClientes;

            firestore()
                .collection('cliente')
                .add(cliente)
                .then(() => {
                    Alert.alert('Cliente', 'Cadastrado com Sucesso!')
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

        if (rua == '') {
            Alert.alert('Rua em branco',
                'Digite um endereço válido'
            )
            return false;
        }
        if (numero == '') {
            Alert.alert("Número em branco",
                "Digite um numero")
            return false;
        }
        if (bairro == '') {
            Alert.alert("Bairro em branco",
                "Digite um bairro")
            return false;
        }
        if (cidade == '') {
            Alert.alert("Cidade em branco",
                "Digite uma cidade")
            return false;
        }
        if (estado == '') {
            Alert.alert("Estado em branco",
                "Digite um estado")
            return false;
        }
        if (dataNasc == '') {
            Alert.alert("Data de nascimento em branco",
                "Digite uma data de nascimento")
            return false;
        }

        return true;
    }

    const formataCPF = (text: string) => {
        let cpfFormatado = text.replace(/\D/g, '');

        if (cpfFormatado.length > 3) {
            cpfFormatado = cpfFormatado.replace(/^(\d{3})\(\d)/g, '$1.$2')
         if (cpfFormatado.length > 7) {
            cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3');
            
         if (cpfFormatado.length > 11) {
            cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3-$4')
                }
          }
    }
    return cpfFormatado.substring(0,14);
}

    const ajustaCpf = (text: string) => {
    const cpfFormatado = formataCPF(text);
    setCPF(cpfFormatado);
}

    const formataData = (text: string) => {
    let cpfFormat = text.replace(/\D/g, '');

    if (cpfFormat.length > 2) {
        cpfFormat = cpfFormat.replace(/^(\d{2})(\d)/g, '$1/$2');
        if (cpfFormat.length > 6) {
            cpfFormat = cpfFormat.replace(/^(\d{2})\/(\d{2})(\d)/g, '$1/$2/$3');
        }
    }
    return cpfFormat.substring(0, 10);
}

    const ajustaData = (text: string) => {
    const dataFormatado = formataData(text);
    setDataNasc(dataFormatado);
}

    return (
        <ScrollView>
            <View style={styles.container_header}>
                <Text style={styles.titulo}>
                 Cadastro de cliente
                </Text>
        </View>
        <View style={styles.container}>
            <View style={styles.caixas}>
                <Text style={styles.titulo_caixa_texto}>
                    Nome:
                </Text>
                <TextInput style={styles.caixa_texto}
                    onChangeText={(text) => { setNome(text) }}>

                </TextInput>

                <Text style={styles.titulo_caixa_texto}>
                    Cpf:
                </Text>
                <TextInput style={styles.caixa_texto}
                    onChangeText={(text) => { setCPF(text.toString()) }}
                    maxLength={11}
                    keyboardType='numeric' />
                {formataCPF(cpf)}

            </TextInput>

            <Text style={styles.titulo_caixa_texto}>
                Rua:
            </Text>
            <TextInput style={styles.caixa_texto}
                onChangeText={(text) => { setRua(text) }}>

            </TextInput>

            <Text style={styles.titulo_caixa_texto}>
                Número:
            </Text>
            <TextInput style={styles.caixa_texto}
                onChangeText={(text) => { setNumero(text.toString()) }}
                keyboardType='numeric'>

            </TextInput>

            <Text style={styles.titulo_caixa_texto}>
                Bairro:
            </Text>
            <TextInput style={styles.caixa_texto}
                onChangeText={(text) => { setBairro(text) }}>

            </TextInput>

            <Text style={styles.titulo_caixa_texto}>
                Complemento:
            </Text>
            <TextInput style={styles.caixa_texto}
                onChangeText={(text) => { setComplemento(text) }}>

            </TextInput>

            <Text style={styles.titulo_caixa_texto}>
                Cidade:
            </Text>
            <TextInput style={styles.caixa_texto}
                onChangeText={(text) => { setCidade(text) }}>

            </TextInput>

            <Text style={styles.titulo_caixa_texto}>
                Estado:
            </Text>
            <TextInput style={styles.caixa_texto}
                onChangeText={(text) => { setEstado(text) }}>

            </TextInput>

            <Text style={styles.titulo_caixa_texto}>
                Data de nascimento:
            </Text>
            <TextInput style={styles.caixa_texto}
                onChangeText={(text) => { setDataNasc(text.toString()) }}
                maxLength={8}
                keyboardType='numeric'>
                    {formataData(dataNasc)}

            </TextInput>
        </View>
        <View style={styles.caixa_botao}>
            <Pressable
                style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                onPress={() => cadastrarCliente()}
                disabled={isCarregando}>
                <Text style={styles.desc_botao}>Cadastrar</Text>
            </Pressable>

            <Pressable
                style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                onPress={() => { navigation.navigate('TelaPrincipalFinal') }}>
                <Text style={styles.desc_botao}>Voltar</Text>
            </Pressable>
        </View>
    </View>
</ScrollView>

);

}

export default TelaCadCliente;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: 'khaki',
    },
    caixas: {
        textAlign: 'center'
    },
    caixa_botao: {
        paddingTop: 15,
    },
    container_header: {
        flex: 1,
        backgroundColor: '#164d96',
        paddingBottom: 60,
    },
    titulo: {
        paddingTop: 55,
        color: 'white',
        fontSize: 35,
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
    label: {
        color: 'black'
    },
    titulo_caixa_texto: {
        paddingTop: 10,
        fontSize: 25,
        color: 'black',
        paddingBottom: 10,
    },
})