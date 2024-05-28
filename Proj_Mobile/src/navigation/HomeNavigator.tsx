import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaLogin from "../TelaLogin";
import TelaCadUsuario from "../TelaCadUsuario"
import Aprovado from "../Aprovado";
import TelaPrincipal from "../TelaPrincipal";
import Aprovado2 from "../Aprovado2";
import TelaCadNotas from "../TelaCadNotas";
import TelaCadNota from "../TelaCadNotas";


type RootStackParamList = {
    TelaLogin: undefined;
    TelaCadUsuario: undefined;
    TelaPrincipal: undefined;
    Aprovado: undefined;
    CadMedia: undefined;
    TelaCadNotas: undefined;
    TelaConNotas: undefined;
    TelaAltNota: {id: string}
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName = "TelaLogin"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name = "TelaLogin" component={TelaLogin}/>
            <Stack.Screen name = "TelaCadUsuario" component={TelaCadUsuario}/>
            <Stack.Screen name = "TelaPrincipal" component={TelaPrincipal}/>
            <Stack.Screen name = "Aprovado" component={Aprovado2}/>
            <Stack.Screen name = "TelaCadNotas" component={TelaCadNota}/>

                </Stack.Navigator>
    );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;
type CadUsuarioProps = NativeStackScreenProps<RootStackParamList, 'TelaCadUsuario'>
type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>
type AprovadoProps = NativeStackScreenProps<RootStackParamList, 'Aprovado'>
type CadNotaProps = NativeStackScreenProps<RootStackParamList, 'TelaCadNotas'>
type ConNotaProps = NativeStackScreenProps<RootStackParamList, 'TelaConNotas'>
type AltNotaProps = NativeStackScreenProps<RootStackParamList, 'TelaAltNota'>


export default HomeNavigator;
export type {LoginProps, CadUsuarioProps,PrincipalProps, AprovadoProps, CadNotaProps};