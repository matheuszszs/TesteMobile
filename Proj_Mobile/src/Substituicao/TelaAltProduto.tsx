import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/HomeNavigator';
import { IProdutos } from '../model/IProdutos';

type AltProdutoProps = NativeStackScreenProps<RootStackParamList, 'TelaAltProduto'>;

const TelaAltProduto = ({ navigation, route }: AltProdutoProps) => {
    const { id } = route.params;
    const [barcode, setBarcode] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function carregar() {
        setIsCarregando(true);
        const resultado = await firestore()
            .collection('products')
            .doc(id)
            .get();

        const product = {
            id: resultado.id,
            ...resultado.data()
        } as IProdutos;

        setBarcode(product.barcode);
        setName(product.name);
        setPrice(product.price.toString());
        setIsCarregando(false);
    };

    useEffect(() => {
        carregar();
    }, []);

    function alterar() {
        setIsCarregando(true);

        firestore()
            .collection('products')
            .doc(id)
            .update({
                barcode,
                name,
                price: parseFloat(price),
                updated_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Produto", "Alterado com sucesso");
                navigation.goBack();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));
    }

    return (
        <View style={styles.container}>
            {isCarregando && <Text>Carregando...</Text>}

            <Text style={styles.titulo}>Alterar Produto</Text>

            <Text style={styles.desc_caixa_texto}>Código de Barras</Text>
            <TextInput
                style={styles.caixa_texto}
                value={barcode}
                onChangeText={(text) => { setBarcode(text) }}
            />

            <Text style={styles.desc_caixa_texto}>Nome</Text>
            <TextInput
                style={styles.caixa_texto}
                value={name}
                onChangeText={(text) => { setName(text) }}
            />

            <Text style={styles.desc_caixa_texto}>Preço</Text>
            <TextInput
                style={styles.caixa_texto}
                value={price}
                onChangeText={(text) => { setPrice(text) }}
                keyboardType="numeric"
            />

            <Pressable
                style={styles.botao}
                onPress={() => alterar()}
                disabled={isCarregando}
            >
                <Text style={styles.desc_botao}>Alterar</Text>
            </Pressable>
        </View>
    );
}

export default TelaAltProduto;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFACD',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    titulo: {
        fontSize: 40,
        textAlign: 'center',
        color: 'black',
        marginBottom: 20
    },
    caixa_texto: {
        width: '80%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 5,
        padding: 10,
        backgroundColor: 'white'
    },
    desc_caixa_texto: {
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginTop: 10
    },
    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20
    },
    desc_botao: {
        fontSize: 25,
        color: 'white'
    },
});
