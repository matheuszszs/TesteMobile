import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';


const Atividade3 = () => {
    const [titulo, setTitulo] = useState('');

    return (
            <View style={styles.container_login}>
                <Text
                    style={styles.titulo_caixa_texto}>

                </Text>
                <TextInput
                    style={styles.caixa_texto}
                    onChangeText={(text) => {setTitulo(text)}}/>
            </View>
    );
}

export default Atividade3;

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
});
