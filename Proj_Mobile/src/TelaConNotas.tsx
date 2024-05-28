import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Carregamento from "./Carregamento";
import firestore from '@react-native-firebase/firestore'
import { INotas } from "./INotas";
import { ConNotasProps } from "./navigation/HomeNavigator";

type ItemNotaProps = {
    numero: number;
    nota: INotas;
    onAlterar: (id: string) => void;
    onDeletar: (id: string) => void;
}

const ItemNota = (props: ItemNotaProps) => {

    return (
        <View style={styles.card}>
            <View style={styles.dados_card}>
                <Text style={{ fontSize: 35 }}>
                    {props.numero + 1 + ' ' + props.nota.descricao}
                </Text>
                <Text style={{ fontSize: 20 }}>{props.nota.descricao}</Text>
            </View>

            <View style={styles.botao_alterar}>
                <Pressable onPress={() => props.onAlterar(props.nota.id)}>
                    <Text style={styles.texto_botao_card}>
                        A
                    </Text>
                </Pressable>
            </View>

            <View style={styles.botao_deletar}>
                <Pressable onPress={() => props.onDeletar(props.nota.id)}>
                    <Text style={styles.texto_botao_card}>
                        x
                    </Text>
                </Pressable>
            </View>

        </View>

    )
}

const TelaConNotas = ({ navigation, route }: ConNotasProps) => {
    const [notas, setNotas] = useState([] as INotas[]);
    const [isCarregando, setIsCarregando] = useState(false);

    useEffect(() => {
        setIsCarregando(true);

        const subscribe = firestore()
            .collection('notas')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    return {
                        id: doc.id,

                    }

                }) as INotas[];
                setNotas(data);
                setIsCarregando(false);
            })
        return () => subscribe();



    }, []);

    function alterarNota(id: string) {
        navigation.navigate("TelaAltNota", { id: id })
    }

    function deletarNota(id: string) {

    }

    return (
        <View style={styles.container}>
            <Carregamento isCarregando={isCarregando} />

            <Text style={styles.titulo_caixa_texto}>Listagem de Notas</Text>
            <FlatList
                data={notas}
                renderItem={(info) =>
                    <ItemNota
                        numero={info.index}
                        nota={info.item}
                        onAlterar={alterarNota}
                        onDeletar={deletarNota} />}
            ></FlatList>


        </View>
    );
}

export default TelaConNotas;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: 'blue',
        paddingBottom: 537,
    },
    titulo_caixa_texto: {
        fontSize: 45,
        color: 'black',
        paddingTop: 20,
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
    botao_alt: {
        backgroundColor: 'yellow',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botao_del: {
        backgroundColor: 'yellow',
        paddingVertical: 20,
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 70,
    },
    desc_botao: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'black'
    },
    card: {

    },
    dados_card: {

    },
    botao_alterar: {

    },
    texto_botao_card: {

    },
    botao_deletar: {

    }
});