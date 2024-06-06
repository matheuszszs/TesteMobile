import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore'
import { IAtendimento } from "./model/IAtendimento";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IClientes } from "./model/IClientes";
import { CadAtendProps } from "./navigation/Navegacao";
import Carregamento from "./Carregamento";

const TelaCadAtendimento = ({ navigation, route }: CadAtendProps) => {
    const [clientes, setClientes] = useState<IClientes[]>([]);
    const [clienteSelecionado, setClienteSelecionado] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isCarregando, setIsCarregando] = useState(false);
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [descricao, setDescricao] = useState('');

    const formatarData = (text: string) => {
        let dataFormatada = text.replace(/\D/g, '');

        if (dataFormatada.length > 2) {
            dataFormatada = dataFormatada.replace(/^(\d{2})(\d)/g, '$1/$2');
            if (dataFormatada.length > 5) {
                dataFormatada = dataFormatada.replace(/^(\d{2})\/(\d{2})(\d)/g, '$1/$2');
            }
        }

        return dataFormatada.substring(0, 10);
    };

    const ajustarData = (text: string) => {
        const dataFormatada = formatarData(text);
        setData(dataFormatada);
    };

    const formatarHora = (text: string) => {
        let horaFormatada = text.replace(/\D/g, '');

        if (horaFormatada.length > 2) {
            horaFormatada = horaFormatada.replace(/^(\d{2})(\d)/g, '$1:$2');
            
        }

        return horaFormatada.substring(0, 5);
    };

    const ajustarHora = (text: string) => {
        const horaFormatada = formatarHora(text);
        setHora(horaFormatada);
    };

    useEffect(() => {
        carregarClientes();
    }, []);

    const carregarClientes = () => {
        setIsCarregando(true);
        firestore()
            .collection('cliente')
            .get()
            .then((querySnapshot) => {
                const clientesData: IClientes[] = [];
                querySnapshot.forEach((documentSnapshot) => {
                    const clienteData = documentSnapshot.data() as IClientes;
                    const cliente: IClientes = {
                        id: documentSnapshot.id,
                        nome: clienteData.nome,
                        cpf: clienteData.cpf,
                        rua: clienteData.rua,
                        numero: clienteData.numero,
                        bairro: clienteData.bairro,
                        complemento: clienteData.complemento,
                        cidade: clienteData.cidade,
                        estado: clienteData.estado,
                        dataNasc: clienteData.dataNasc,
                        created_at: clienteData.created_at,
                    };
                    clientesData.push(cliente);
                });
                setClientes(clientesData);
            })
            .catch((error) => {
                console.error("Erro ao carregar clientes: ", error);
            })
            .finally(() => setIsCarregando(false));
    };

    const cadastrarAtendimento = () => {
        firestore()
            .collection('atendimentos')
            .add({
                cliente: clienteSelecionado,
                data: data,
                hora: hora,
                descricao: descricao
            })
            .then(() => {
                Alert.alert("Atendimento", "Cadastrado com sucesso");
                navigation.navigate("TelaPrincipalFinal");
                setClienteSelecionado('');
                setData('');
                setHora('');
                setDescricao('');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar atendimento: ', error);
            });
    };

    const selecionarCliente = (cliente: string) => {
        setClienteSelecionado(cliente);
        setModalVisible(false);
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Carregamento isCarregando={isCarregando} />
        

        <Text style={styles.titulo}>Cliente</Text>
        <TextInput
            style={styles.caixaTexto}
            value={clienteSelecionado}
            placeholder='Selecione um cliente'
            editable={false}
            placeholderTextColor='#888888' />

        <Pressable style={styles.botao}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.desc_botao}>Procurar</Text>

        </Pressable>
        {clienteSelecionado && (
            <View>
                <Text style={styles.titulo}>CPF</Text>
                <TextInput
                    style={styles.caixaTexto}
                    value={clientes.find(cliente => cliente.nome === clienteSelecionado)?.cpf || ''}
                    editable={false}
                    placeholderTextColor='#888888' />
            </View>
        )}

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}>
            <View style={styles.modal}>
                <ScrollView>
                    {clientes.map((cliente) => (
                        <TouchableOpacity
                            key={cliente.id}
                            style={styles.itemModal}
                            onPress={() => selecionarCliente(cliente.nome)}>
                            <Text style={styles.titulo_P}>{cliente.nome}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </Modal>

        <Text style={styles.titulo}>Data</Text>
        <TextInput
            style={styles.caixaTexto}
            value={data}
            placeholder='DD/MM'
            keyboardType='numeric'
            onChangeText={ajustarData}
            placeholderTextColor='#888888' />

        <Text style={styles.titulo}>Hora</Text>
        <TextInput
            style={styles.caixaTexto}
            value={hora}
            placeholder='HH:MM'
            keyboardType='numeric'
            onChangeText={ajustarHora}
            placeholderTextColor='#888888' />

        <Text style={styles.titulo}>Descrição</Text>
        <TextInput
            style={[styles.caixaTexto, styles.descricao]}
            value={descricao}
            placeholder='Descrição da consulta'
            multiline
            maxLength={200}
            onChangeText={(text) => { setDescricao(text) }}
            placeholderTextColor='#888888' />

        <Pressable style={styles.botao}
            onPress={() => { cadastrarAtendimento() }}>
            <Text style={styles.desc_botao}>Cadastrar atendimento</Text>

        </Pressable>
        <Pressable style={styles.botao}
            onPress={() => navigation.goBack()}>
            <Text style={styles.desc_botao}>Voltar</Text>

        </Pressable>
    </ScrollView>
    );
};

export default TelaCadAtendimento;

const styles = StyleSheet.create({
    container: {
        flexGrow: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 35,
        backgroundColor: 'pink',
    },
    descricao: {
        height: 100,
        textAlignVertical: 'top',
    },
    titulo_P: {
        color: 'black',
        fontSize: 30,
        marginBottom: 10,
        textAlign: 'center'
    },

    modal: {
        backgroundColor: '#FFFFFF',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        elevation: 5
    },
    itemModal: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
    },
    caixaTexto: {
        width: '100%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#EEEEEE',
        fontSize: 20,
    },

    caixas: {
        alignItems: 'center',
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
    botao: {
        backgroundColor: 'khaki',
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 40,
    },
    desc_botao: {
        textAlign: 'center',
        fontSize: 25,
        color: 'black'
    },
    titulo_caixa_texto: {
        paddingTop: 10,
        fontSize: 25,
        color: 'black',
        paddingBottom: 10,
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white',
    },
});