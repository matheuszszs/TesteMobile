import { Alert, Pressable, Text, TextInput } from "react-native";
import { useState } from "react";
import { CadNotaProps } from "./navigation/HomeNavigator";
import firestore from '@react-native-firebase/firestore'
import Carregamento from "./Carregamento";
import { INotas } from "../Model/INotas";
 
const TelaCadNota = {{ navigation, route }: CadNotaProps} => {
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

