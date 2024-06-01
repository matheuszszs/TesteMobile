import { useState } from "react";
import { LoginFinalProps } from "./navigation/Navegacao";
import auth from "@react-native-firebase/auth";
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
import { Alert } from "react-native";

const TelaLoginFinal = ({navigation, route} : LoginFinalProps) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function logar(){
        if(verificaCampos()) {

            auth()
                .signInWithEmailAndPassword(email, senha)
                .then(() => {navigation.navigate("TelaPrincipalFinal") })
                .catch((error) => tratarErros( String(error) ))
        }

        return true;
    }

    function verificaCampos(){
        if (email == ''){
            Alert.alert("Email em Branco" , "Digite um email!")
            return false;
        } if (senha == ''){
            Alert.alert("Senha em Branco", "Digite uma senha!")
            return false;
        }

        return true;
    }

    function tratarErros(erro: string){
        console.log(erro);
        if (erro.includes("[auth/invalid-email]")){
            Alert.alert("Email inválido", "Digite um email válido!")
        } else if(erro.includes("[ INVALID_LOGIN_CREDENTIALS ]")){
            Alert.alert("Login ou senha incorretos", "")
        } else if(erro.includes("[auth/invalid-credential]")){
            Alert.alert("Login ou senha incorretos", "")
        } else{
            Alert.alert ("Erro", erro)
        }
    }

    function redefinirSenha(){
        if (email == '') {
            Alert.alert('Email em branco!', "Preencha o email")
            return 
        }

        auth()
            .sendPasswordResetEmail(email)
            .then(() => Alert.alert('Redefinir sua Senha!', 'Um email foi enviado para seu email com orientações para a troca da senha!'))
            .catch((error) => console.log(error))
    }

    return (
        <View style={styles.container}>
            <View style={styles.painel_imagem}>
                <Image
                    style={styles.imagem}
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} />
            </View>

            <View style={styles.container_login}>
                <Text
                    style={styles.titulo_caixa_texto}>
                    Email
                </Text>
                <TextInput
                    style={styles.caixa_texto}
                    onChangeText={(text) => { setEmail(text) }} />

                <Text
                    style={styles.titulo_caixa_texto}>
                    Senha
                </Text>
                <TextInput
                    style={styles.caixa_texto}
                    secureTextEntry={true}
                    onChangeText={(text) => { setSenha(text) }} />

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={logar}>
                    <Text style={styles.desc_botao}>Entrar</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaLoginFinal') }}>
                    <Text style={styles.desc_botao}>Cadastrar</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { redefinirSenha() }}>
                    <Text style={styles.desc_botao}>Esqueci minha senha</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default TelaLoginFinal;

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
