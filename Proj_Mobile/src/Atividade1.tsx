
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
    titulo: String;
}

const Atividade1 = (props: Props) => (
    <View>
        <Text style={styles.titulo_caixa_texto}>
            {props.titulo}
        </Text>
        <TextInput style={styles.caixa_texto}>

        </TextInput>
    </View>); 

const styles = StyleSheet.create({
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

export default Atividade1;