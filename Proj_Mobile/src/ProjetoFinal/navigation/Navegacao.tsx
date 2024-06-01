import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaLoginFinal from "../TelaLoginFinal";
import TelaPrincipalFinal from "../TelaPrincipalFinal";

type RootStackParamList = {
    TelaLoginFinal: undefined;
    TelaPrincipalFinal: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navegacao = () => {
    return (
        <Stack.Navigator
            initialRouteName = "TelaLoginFinal"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name = "TelaLoginFinal" component = {TelaLoginFinal}/>
            <Stack.Screen name = "TelaPrincipalFinal" component = {TelaPrincipalFinal}/>

        </Stack.Navigator>
    );
}

type LoginFinalProps = NativeStackScreenProps<RootStackParamList, 'TelaLoginFinal'>
type PrincipalFinalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipalFinal'>

export default Navegacao;
export type {LoginFinalProps, PrincipalFinalProps};