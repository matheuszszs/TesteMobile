
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import Avaliativa1 from "./Avaliativa1";
import Avaliativa2 from "./Avaliativa2";
import Avaliativa3 from "./Avaliativa3";

type RootStackParamList = {
    Avaliativa1: undefined;
    Avaliativa2: undefined;
    Avaliativa3: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navegacao = () => {
    return (
        <Stack.Navigator
            initialRouteName = "Avaliativa3"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Avaliativa3" component={Avaliativa3} />
            <Stack.Screen name="Avaliativa1" component={Avaliativa1} />
            <Stack.Screen name="Avaliativa2" component={Avaliativa2} />
        </Stack.Navigator>
    );
}

type Aval3Props = NativeStackScreenProps<RootStackParamList, 'Avaliativa3'>;
type Aval1Props = NativeStackScreenProps<RootStackParamList, 'Avaliativa1'>;
type Aval2Props = NativeStackScreenProps<RootStackParamList, 'Avaliativa2'>;


export default Navegacao;
export type {Aval3Props, Aval2Props, Aval1Props};