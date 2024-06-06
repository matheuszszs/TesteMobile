import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { IAtendimento } from "./model/IAtendimento";
import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore'
import Carregamento from "./Carregamento";
import { ConAtendimentoProps } from "./navigation/Navegacao";


const ItemAtendimento = ({ atendimento }: { atendimento: IAtendimento }) => {
    return (
        <View style={styles.card}>
            <View style={styles.dados_card}>
                <Text style={styles.titulo}>
                    {' Nome do cliente: ' + atendimento.cliente}
                </Text>
                <Text style={styles.texto}>
                    {'Data: ' + atendimento.data}
                </Text>
                <Text style={styles.texto}>
                    {'Hora: ' + atendimento.hora}
                </Text>
                <Text style={styles.texto}>
                    {'Descrição: ' + atendimento.descricao}
                </Text>
            </View>
        </View>
    );
}

const TelaConAtendimento = ({ navigation, route }: ConAtendimentoProps) => {
    const [atendimento, setAtendimento] = useState([] as IAtendimento[]);
    const [isCarregando, setIsCarregando] = useState(false);

    useEffect(() => {
        setIsCarregando(true);

        const subscribe = firestore()
            .collection('atendimento')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {

                    return {
                        id: doc.id,
                        ...doc.data()
                    }

                }) as IAtendimento[];

                setAtendimento(data);
                setIsCarregando(false);
            });

        return () => subscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Carregamento isCarregando={isCarregando} />
            <View style={styles.container_header}>
                <Text style={styles.titulo_T}>Lista de Atendimentos</Text>
            </View>

            <FlatList
                data={atendimento}
                renderItem={({ item }) =>
                    <ItemAtendimento
                        atendimento={item}
                    />}
            />
            <View style={styles.container_body}>
                <Pressable
                    style={styles.botao}
                    onPress={() => { navigation.goBack() }}>
                    <Text style={styles.desc_botao}>Voltar</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default TelaConAtendimento;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFACD'
    },
    texto: {
        fontSize: 18,
        color: 'white',
        marginBottom: 5
    },
    container_body: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    titulo: {
        fontSize: 40,
        textAlign: 'center',
        color: 'black'
    },  
    container_header: {
        backgroundColor: 'rgba(20,0,300,0.5)',
        padding: 30,
    },
    titulo_T: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        marginBottom: 10
    },
    botao: {
        backgroundColor: 'indigo',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
    },
    desc_botao: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    card: {
        borderWidth: 2,
        borderColor: 'grey',
        margin: 5,
        borderRadius: 10,
        padding: 3,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    dados_card: {
        flex: 1
    },
    botao_deletar: {
        backgroundColor: 'red',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botao_alterar: {
        backgroundColor: 'green',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botao_info: {
        backgroundColor: 'yellow',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto_botao_card: {
        fontWeight: "bold",
        fontSize: 40,
        color: 'black'
    }
});