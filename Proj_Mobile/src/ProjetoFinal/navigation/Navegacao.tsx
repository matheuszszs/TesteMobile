import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaLoginFinal from "../TelaLoginFinal";
import TelaPrincipalFinal from "../TelaPrincipalFinal";
import TelaCadUsuarioFinal from "../TelaCadUsuarioFinal";
import TelaCadCliente from "../TelaCadCliente";

type RootStackParamList = {
    TelaLoginFinal: undefined;
    TelaPrincipalFinal: undefined;
    TelaCadUsuarioFinal: undefined;
    TelaCadCliente: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navegacao = () => {
    return (
        <Stack.Navigator
            initialRouteName = "TelaCadCliente"
            screenOptions={{headerShown: false}}>

            <Stack.Screen name = "TelaLoginFinal" component = {TelaLoginFinal}/>
            <Stack.Screen name = "TelaCadUsuarioFinal" component = {TelaCadUsuarioFinal}/>
            <Stack.Screen name = "TelaPrincipalFinal" component = {TelaPrincipalFinal}/>
            <Stack.Screen name = "TelaCadCliente" component = {TelaCadCliente}/>

        </Stack.Navigator>
    );
}

type LoginFinalProps = NativeStackScreenProps<RootStackParamList, 'TelaLoginFinal'>
type CadClienteProps = NativeStackScreenProps<RootStackParamList, 'TelaCadCliente'>
type PrincipalFinalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipalFinal'>
type CadUsuarioFinalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipalFinal'>


export default Navegacao;
export type {LoginFinalProps, PrincipalFinalProps,CadUsuarioFinalProps, CadClienteProps};