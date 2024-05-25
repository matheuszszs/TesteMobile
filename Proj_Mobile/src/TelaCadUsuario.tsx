import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';

import auth from "@react-native-firebase/auth";
import { CadUsuarioProps } from './navigation/HomeNavigator';
import Carregamento from './Carregamento';

const CadastrarUsuario = ({navigation, route }: CadUsuarioProps) => {
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState(''); 
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function cadastrar(){
        // setIsCarregando(true)

        if (verificaCampos()) {
            auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(() => {
                Alert.alert("Conta", 
                    "Cadastrado com Sucesso")
                navigation.goBack();
            })
            .catch((error) => { tratarErros( String(error) ) })
            .finally (() => {
        // setIsCarregando(false)
            });
        }
        // setIsCarregando(false)
    }

    function verificaCampos(){
        if (email == ''){
            Alert.alert("Email em branco!", "Digite um email!")
            return false;
        }
        if (senha == ''){
            Alert.alert("Senha em branco!", "Digite uma senha!")
            return false;
        }
        if (confirmaSenha == '') {
            Alert.alert("Confirmação de senha em branco!", "Digite a confirmação da senha!")
            return false;
        }
        if (senha != confirmaSenha){
            Alert.alert("Confirmação da senha não confere!", "Digite a confirmação da senha novamente")
            return false;
        }

        return true;
    }

    function tratarErros(erro: string){
        console.log(erro);
        if(erro.includes("[auth/invalid-email]")){
            Alert.alert("Email inválido", "Digite um email válido")
        } else if(erro.includes("[auth/weak-pssword!]")){
            Alert.alert("Senha fraca!", "A senha conter no mínimo 6 caracteres!")
        } else if(erro.includes("[ INVALID_LOGIN_CREDENTIALS ]")){
            Alert.alert("Login ou senha incorretos", "")
        } else if(erro.includes("[auth/invalid-credential]")){
            Alert.alert("Login ou senha incorretos", "")
        }else{
            Alert.alert("Erro", erro)
        }
    }

    return (
        <View style={styles.container}>
            <Carregamento isCarregando = {isCarregando}/>
            <View style={styles.painel_imagem}>
                <Image 
                    style={styles.imagem} 
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} />
            </View>
            
            <View style={styles.container_login}>
                <Text
                    style={styles.titulo_caixa_texto}>
                    Login
                </Text>
                <TextInput
                    style={styles.caixa_texto}
                    onChangeText={(text) => {setEmail(text)}}/>

                <Text
                    style={styles.titulo_caixa_texto}>
                    Senha
                </Text>
                <TextInput
                    style={styles.caixa_texto} 
                    onChangeText={(text) => {setSenha(text)}}/>
                <Text style={styles.titulo_caixa_texto}>
                    Confirma Senha
                </Text>
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={cadastrar}>
                    <Text style={styles.desc_botao}>Entrar</Text>
                </Pressable>
            </View>
        </View>
    );

}

export default CadastrarUsuario;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFACD'
    },
    container_login: {
        flex: 2,
        alignItems: 'center'
    },
    titulo_caixa_texto:{
        fontSize: 25,
        color: 'black'
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white'
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 10
    },
    desc_botao: {
        fontSize: 20,
        color: 'white'
    },
    painel_imagem: {
        flex:1,
        alignItems:'center', 
        justifyContent:'center'
    },
    imagem: { 
        width: 200, 
        height: 200, 
        resizeMode: "center"
    }
});
