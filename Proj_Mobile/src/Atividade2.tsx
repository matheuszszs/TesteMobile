import { StyleSheet } from "react-native";

const Atividade2 = {} => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style ={styles.painel_imagem}>
                    <Image
                        style={styles.imagem}
                        source={{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }}>

                    </Image>
                    <Image
                        style={styles.imagem}
                        source={{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }}>

                    </Image>
                    <Image
                        style={styles.imagem}
                        source={{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }}>

                    </Image>
                </View>
            </View>
        </ScrollView>
    );
}

export default Atividade2;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#FFFACD'
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
})