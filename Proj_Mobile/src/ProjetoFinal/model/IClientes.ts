import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type IClientes = {
    id: string,
    nome: string,
    cpf: string,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    complemento: string,
    dataNasc: string,
    created_at: FirebaseFirestoreTypes.FieldValue
}

export type {
    IClientes
};