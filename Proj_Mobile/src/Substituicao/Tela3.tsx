import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/HomeNavigator';
import TelaEx1 from '../Substituicao/TelaEx1';

type TelaEx3Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'TelaEx3'>;
};

const TelaEx3: React.FC<TelaEx3Props> = ({ navigation }) => {
    const [productId, setProductId] = useState('');

    const navigateToAltProduto = () => {
        if (productId) {
            navigation.navigate('TelaAltProduto', { id: productId });
        } else {
            console.log('Por favor, insira um ID de produto válido');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Escolha sua Tela:</Text>

            <Pressable
                style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                onPress={() => navigation.navigate('TelaEx1')}>
                <Text style={styles.desc_botao}>Tela 1</Text>
            </Pressable>

            <Pressable
                style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                onPress={navigateToAltProduto}>
                <Text style={styles.desc_botao}>Tela 2</Text>
            </Pressable>

            <Text style={styles.desc_caixa_texto}>ID do Produto:</Text>
            <TextInput
                style={styles.caixa_texto}
                value={productId}
                onChangeText={setProductId}
                keyboardType="numeric"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFACD',
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 30,
        color: 'black',
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: '#800000',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 15,
        borderRadius: 10,
    },
    desc_botao: {
        fontSize: 20,
        color: 'white',
    },
    desc_caixa_texto: {
        fontSize: 18,
        marginTop: 20,
    },
    caixa_texto: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: 'white',
    },
});

export default TelaEx3;
