import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { IClientes } from "./model/IClientes";
import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore'
import Carregamento from "./Carregamento";
import { ConClienteProps } from "./navigation/Navegacao";

type ItemClienteProps = {
    cliente: IClientes;
    onAlterar: (id: string) => void;
    onDeletar: (id: string) => void;
} 

const ItemCliente = (props: ItemClienteProps) => {
    
    return (
        <ScrollView>
        <View style={styles.card}>
                <View style={styles.dados_card}>
                    <Text style={{ fontSize: 35 }}>
                        {props.cliente.nome}
                    </Text>
                    <Text style={{ fontSize: 20 }}>{props.cliente.cpf}</Text>
                </View>
                <View style={styles.botao_alterar}>
                    <Pressable
                        onPress={() => props.onAlterar(props.cliente.id!)}>
                        <Text style={styles.texto_botao_card}>
                            A
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.botao_deletar}>

                    <Pressable
                        onPress={() => props.onDeletar(props.cliente.id!)}>
                        <Text style={styles.texto_botao_card}>
                            X
                        </Text>
                    </Pressable>
                </View>

            </View>
    </ScrollView>
    );
}

const TelaConCliente = ({ navigation, route }: ConClienteProps) => {
    const [cliente, setClientes] = useState([] as IClientes[]);
    const [isCarregando, setIsCarregando] = useState(false);

    useEffect(() => {
        setIsCarregando(true);

        const subscribe = firestore()
            .collection('cliente')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {

                    return {
                        id: doc.id,
                        ...doc.data()
                    }

                }) as IClientes[];

                setClientes(data);
                setIsCarregando(false);
            });

        return () => subscribe();
    }, []);

    function alterarCliente(id: string) {
        navigation.navigate("TelaAltCliente", { id: id })
    }

    function deletarCliente(id: string) {
        setIsCarregando(true);

        firestore()
            .collection('cliente')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("Cliente", "Removido com sucesso")
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));
    }

    return (
        <View style={styles.container}>
            <Carregamento isCarregando={isCarregando} />

            <Text style={styles.titulo}>Listagem de Clientes</Text>
            <FlatList
                data={cliente}
                renderItem={(info) => 
                    <ItemCliente 
                        cliente={info.item}
                        onAlterar={alterarCliente}
                        onDeletar={deletarCliente}/>}>

            </FlatList>
        </View>
    );
}

export default TelaConCliente;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFACD'
    },
    titulo: {
        fontSize: 40,
        textAlign: 'center',
        color: 'black'
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
        backgroundColor: 'yellow',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto_botao_card:{
        fontWeight: "bold", 
        fontSize: 40,
        color: 'black' 
    }
});