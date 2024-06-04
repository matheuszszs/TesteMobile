import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { CadNotaProps } from "./navigation/HomeNavigator";
import firestore from '@react-native-firebase/firestore'
import Carregamento from "./ProjetoFinal/Carregamento";
import { INotas } from "./INotas";
 
const TelaCadNota = ({ navigation, route }: CadNotaProps) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    function cadastrar() {
        setIsCarregando(true);

        if (verificaCampos()) {
            let nota = {
                titulo: titulo,
                descricao: descricao,
                created_at: firestore.FieldValue.serverTimestamp()
            } as INotas;

            firestore()
            .collection('notas')
            .add(nota)
            .then(() => {
                Alert.alert('nota', 'Cadastrada com sucesso')
                navigation.navigate('TelaPrincipal')
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));

        }
        setIsCarregando(false);
    }

    function verificaCampos(){
        if (titulo == ''){
            Alert.alert('Título em branco!',
                'Digite um título!'
            )
            return false;
        }

        return true;
    }

    return (
        <View style={styles.container}>
            <View style={styles.container_login}>
                <Carregamento isCarregando={isCarregando}/>

                <Text>Título</Text>
                <TextInput 
                    style={styles.caixa_texto}
                    onChangeText={(text) => {setTitulo(text) }} />

                <Text>Descrição</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    maxLength={100}
                    style={styles.caixa_texto}
                    onChangeText={(text) => {setDescricao(text) }}/>
                <Pressable
                    style={styles.botao}
                    onPress={() => cadastrar()}>
                    <Text style={styles.desc_botao}>Cadastrar notas</Text>    
                </Pressable>
            </View>
        </View>
    )
}

export default TelaCadNota;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: 'blue',
        paddingBottom: 537,
    },
    container_login: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: 'blue',
        paddingBottom: 527,
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