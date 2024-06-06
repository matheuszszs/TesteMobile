import { useState } from "react"
import { IClientes } from "./model/IClientes";
import firestore from '@react-native-firebase/firestore'
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Carregamento from "./Carregamento";
import { CadClienteProps } from "./navigation/Navegacao";

const TelaCadCliente = ({ navigation, route }: CadClienteProps) => {
    const [nome, setNome] = useState('');
    const [cpf, setCPF] = useState('');
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

        else if (!(/^[a-zA-Z\s]+$/.test(nome))) {
            Alert.alert("Formato do nome inválido", "O nome deve conter apenas letras.");
            return false;
        } else if (cpf === '') {
            Alert.alert("CPF em branco", "Digite seu CPF");
            return false;
        } else if (cpf.length !== 14) {
            Alert.alert("CPF inválido", "Deve ser informado um CPF com 11 dígitos");
            return false;
        } else if (dataNasc === '') {
            Alert.alert("Data de Nascimento em branco", "Preencha a Data de Nascimento");
            return false;
        } else if (dataNasc.length !== 10) {
            Alert.alert("Data de nascimento inválida", "Números insuficientes");
            return false;
        } else if (rua === '') {
            Alert.alert("Rua em branco", "Digite a rua");
            return false;
        } else if (bairro === '') {
            Alert.alert("Bairro em branco", "Digite seu bairro");
            return false;
        } else if (cidade === '') {
            Alert.alert("Cidade em branco", "Digite sua cidade");
            return false;
        } else if (estado === '') {
            Alert.alert("Estado em branco", "Digite seu estado");
            return false;
        }

        return true;
    }

    const formataCPF = (text: string) => {
        let cpfFormatado = text.replace(/\D/g, '');

        if (cpfFormatado.length > 3) {
            cpfFormatado = cpfFormatado.replace(/^(\d{3})(\d)/g, '$1.$2');
        if (cpfFormatado.length > 7) {
                cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3');
        if (cpfFormatado.length > 11) {
                    cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3-$4');
                }
            }
        }

        return cpfFormatado.substring(0, 14);
}

<<<<<<< HEAD
    const ajustarCPF = (text: string) => {
     const cpfFormatado = formataCPF(text);
        setCPF(cpfFormatado);
    };

    const formatarData = (text: string) => {
        let dataFormatada = text.replace(/\D/g, '');

        if (dataFormatada.length > 2) {
            dataFormatada = dataFormatada.replace(/^(\d{2})(\d)/g, '$1/$2');
            if (dataFormatada.length > 5) {
                dataFormatada = dataFormatada.replace(/^(\d{2})\/(\d{2})(\d)/g, '$1/$2/$3');
            }
        }

        return dataFormatada.substring(0, 10);
    };

    const ajustarDataNascimento = (text: string) => {
        const dataFormatada = formatarData(text);
        setDataNasc(dataFormatada);
    };
=======
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
>>>>>>> a9e986859090426260c2fb9f157beef09e933f2d

    return (
        <ScrollView>
            <View style={styles.container}>
                <Carregamento isCarregando={isCarregando} />
                <View style={styles.container_header}>
                    <Text style={styles.titulo_T}>
                        Cadastre um Novo Cliente
                    </Text>
                </View>
                <View style={styles.container_body}>
                    <Text style={styles.titulo}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setNome(text) }}
                        placeholder='Nome' />

                    <Text style={styles.titulo}>CPF</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={ajustarCPF}
                        value={cpf}
                        keyboardType="numeric"
                        maxLength={14}
                        placeholder='CPF' />

                    <Text style={styles.titulo}>Data de Nascimento</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={ajustarDataNascimento}
                        value={dataNasc}
                        keyboardType="numeric"
                        maxLength={10}
                        placeholder='DD/MM/YYYY' />

                    <Text style={styles.titulo}>Rua</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setRua(text) }}
                        placeholder='Rua' />

                    <Text style={styles.titulo}>Número</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setNumero(text.toString()) }}
                        placeholder='Número'
                        keyboardType='numeric' />

                    <Text style={styles.titulo}>Bairro</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setBairro(text) }}
                        placeholder='Bairro' />

                    <Text style={styles.titulo}>Complemento</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setComplemento(text) }}
                        placeholder='Complemento' />

                    <Text style={styles.titulo}>Cidade</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setCidade(text) }}
                        placeholder='Cidade' />

                    <Text style={styles.titulo}>Estado</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setEstado(text) }}
                        placeholder='Estado' />

                    <Pressable
                        style={styles.botao}
                        onPress={() => { cadastrarCliente() }}>
                        <Text style={styles.desc_botao}>Cadastrar</Text>
                    </Pressable>
                    <Pressable
                        style={styles.botao}
                        onPress={() => { navigation.goBack() }}>
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
        backgroundColor: '#EA72F0',
    },
    caixas: {
        textAlign: 'center'
    },
    caixa_botao: {
        paddingTop: 15,
    },
    input: {
        width: '100%',
        height: 43,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 19,
        color: 'black'
    },
    
    container_body: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 30,
    },
    titulo_T: {
        textAlign: 'center',
        color: 'black',
        fontSize: 30,
        marginLeft: 50,
        alignSelf: 'flex-start',
    },
    container_header: {
        flex: 1,
        backgroundColor: 'khaki',
        paddingBottom: 1,
    },
    titulo: {
        paddingTop: 55,
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold'
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
        backgroundColor: 'khaki',
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