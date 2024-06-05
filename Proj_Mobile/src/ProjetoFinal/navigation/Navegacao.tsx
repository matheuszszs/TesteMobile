import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaLoginFinal from "../TelaLoginFinal";
import TelaPrincipalFinal from "../TelaPrincipalFinal";
import TelaCadUsuarioFinal from "../TelaCadUsuarioFinal";
import TelaCadCliente from "../TelaCadCliente";
import TelaConCliente from "../TelaConCliente";
import TelaAltCliente from "../TelaAltCliente";
import TelaConAtendimento from "../TelaConAtendimento";
import TelaCadAtendimento from "../TelaCadAtendimento";

type RootStackParamList = {
    TelaLoginFinal: undefined;
    TelaPrincipalFinal: undefined;
    TelaCadUsuarioFinal: undefined;
    TelaCadCliente: undefined;
    TelaConCliente: undefined;
    TelaConAtendimento: undefined;
    TelaCadAtendimento: undefined;
    TelaAltCliente: {id : string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navegacao = () => {
    return (
        <Stack.Navigator
            initialRouteName = "TelaPrincipalFinal"
            screenOptions={{headerShown: false}}>

            <Stack.Screen name = "TelaLoginFinal" component = {TelaLoginFinal}/>
            <Stack.Screen name = "TelaConCliente" component = {TelaConCliente}/>
            <Stack.Screen name = "TelaCadUsuarioFinal" component = {TelaCadUsuarioFinal}/>
            <Stack.Screen name = "TelaPrincipalFinal" component = {TelaPrincipalFinal}/>
            <Stack.Screen name = "TelaCadCliente" component = {TelaCadCliente}/>
            <Stack.Screen name = "TelaAltCliente" component = {TelaAltCliente}/>
            <Stack.Screen name = "TelaConAtendimento" component = {TelaConAtendimento}/>
            <Stack.Screen name = "TelaCadAtendimento" component = {TelaCadAtendimento}/>

        </Stack.Navigator>
    );
}

type LoginFinalProps = NativeStackScreenProps<RootStackParamList, 'TelaLoginFinal'>
type CadClienteProps = NativeStackScreenProps<RootStackParamList, 'TelaCadCliente'>
type PrincipalFinalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipalFinal'>
type CadUsuarioFinalProps = NativeStackScreenProps<RootStackParamList, 'TelaCadUsuarioFinal'>
type ConClienteProps = NativeStackScreenProps<RootStackParamList, 'TelaConCliente'>
type AltClienteProps = NativeStackScreenProps<RootStackParamList, 'TelaAltCliente'>
type CadAtendimentoProps = NativeStackScreenProps<RootStackParamList, 'TelaCadAtendimento'>
type ConAtendimentoProps = NativeStackScreenProps<RootStackParamList, 'TelaConAtendimento'>



export default Navegacao;
export type {LoginFinalProps, PrincipalFinalProps,CadUsuarioFinalProps, CadClienteProps, ConClienteProps, AltClienteProps,ConAtendimentoProps, CadAtendimentoProps};