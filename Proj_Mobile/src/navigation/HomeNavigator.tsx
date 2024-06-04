import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaCadUsuarioFinal from "../ProjetoFinal/TelaCadUsuarioFinal";
import Aprovado2 from "../Aprovado2";
import TelaCadNota from "../TelaCadNotas";
import TelaPrincipalFinal from "../ProjetoFinal/TelaPrincipalFinal";
import TelaLoginFinal from "../ProjetoFinal/TelaLoginFinal";


type RootStackParamList = {
    Aprovado: undefined;
    CadMedia: undefined;
    TelaCadNotas: undefined;
    TelaConNotas: undefined;
    TelaPrincipalFinal: undefined;
    TelaLoginFinal: undefined;
    TelaCadUsuarioFinal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName = "TelaPrincipalFinal"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name = "TelaPrincipalFinal" component={TelaPrincipalFinal}/>    
            <Stack.Screen name = "TelaLoginFinal" component={TelaLoginFinal}/>
            <Stack.Screen name = "TelaCadUsuarioFinal" component={TelaCadUsuarioFinal}/>
            <Stack.Screen name = "Aprovado" component={Aprovado2}/>
            <Stack.Screen name = "TelaCadNotas" component={TelaCadNota}/>

                </Stack.Navigator>
    );
}

type LoginFinalProps = NativeStackScreenProps<RootStackParamList, 'TelaLoginFinal'>;
type CadUsuarioFinalProps = NativeStackScreenProps<RootStackParamList, 'TelaCadUsuarioFinal'>
type PrincipalFinalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipalFinal'>
type AprovadoProps = NativeStackScreenProps<RootStackParamList, 'Aprovado'>
type CadNotaProps = NativeStackScreenProps<RootStackParamList, 'TelaCadNotas'>
type ConNotasProps = NativeStackScreenProps<RootStackParamList, 'TelaConNotas'>



export default HomeNavigator;
export type {LoginFinalProps, CadUsuarioFinalProps, PrincipalFinalProps, AprovadoProps, CadNotaProps, ConNotasProps};