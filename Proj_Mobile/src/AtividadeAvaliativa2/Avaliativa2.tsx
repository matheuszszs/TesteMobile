import { useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { Alert, Button, TextInput, View } from "react-native";
import { Aval2Props } from "./Navegacao";

const Avaliativa2 = ({navigation}: Aval2Props) => {
    const [codBarras, setCodBarras] = useState('');
    const [nomeProd, setNomeProd] = useState('');
    const [precoProd, setPrecoProd] = useState(''); 

    const salvarProduto = async () => {
        try {
            //  || <= sigfinica "e"
            if (!codBarras || !nomeProd || !precoProd ) {
                Alert.alert('Por favor preencha todos os campos acima!');
                return;
            }

            //Converter preço para números
            const numeroPreco = parseFloat(precoProd);

            // COMO QUE SALVA NO FIREBASE...
            await firestore()
            .collection ('Produtos')
            .add
            ({
                codBarras,
                nomeProd,
                precoProd: numeroPreco
            });
            
            setCodBarras('');
            setNomeProd('');
            setPrecoProd('');

            Alert.alert('Produto salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar o produto: ', error);
            Alert.alert('Ocorreu um erro ao salvar o produto!')
        }
    };

    return (
        <View style={{ padding: 18  }}>
          <TextInput
            style  = {{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            placeholder = "Código de Barras"
            value = {codBarras}
            onChangeText = {text => setCodBarras(text)}
          />
          <TextInput
            style = {{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            placeholder = "Nome do Produto "
            value = {nomeProd}
            onChangeText = {text => setNomeProd(text)}
          />
          <TextInput
            style = {{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            placeholder ="  Preço"
            keyboardType = "numeric"
            value = {precoProd}
            onChangeText = {text => setPrecoProd(text)}
          />
          <Button
            title = "Salvar Produto"
            onPress = { salvarProduto }
          />
        </View>
      );
    }

export default Avaliativa2;