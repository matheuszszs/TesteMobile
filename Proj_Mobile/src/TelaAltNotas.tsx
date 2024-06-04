import { useEffect, useState } from "react";
import Carregamento from "./ProjetoFinal/Carregamento";
import firestore from '@react-native-firebase/firestore'
import { INotas } from "./INotas";
import { AltNotaProps } from "./navigation/HomeNavigator";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const TelaAltNotas = ({navigation, route}: AltNotaProps) => {
    const [id,] = useState(route.params.id);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function carregar() {
        setIsCarregando(true);
        const resultado = await firestore()
        .collection('notas')
        .doc(id)
        .get();

        const nota = {
            id: resultado.id,
            ...resultado.data()
        } as INotas;

        setTitulo(nota.titulo);
        setDescricao(nota.descricao);
        setIsCarregando(false);

    };

    useEffect(() => {
        carregar();
    }, [])

    function alterar(){
        setIsCarregando(true)

        firestore()
            .collection('notas')
            .doc(id)
            .update({
                titulo,
                descricao,
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Nota", "Alterada com Sucesso")
                navigation.goBack();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));
    }

    return(
        <View 
            style={styles.container}>
            <Carregamento isCarregando = {isCarregando} /> 

        <Text style = {styles.titulo}>Alterar Nota</Text>

        <Text style = {styles.desc_caixa_texto}>Título</Text>
        <TextInput 
            style = {styles.caixa_texto}
            value = {titulo}
            onChangeText = {(text) => { setTitulo(text) }}/>

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

export default TelaAltNotas;

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