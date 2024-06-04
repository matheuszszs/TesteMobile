import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type IClientes = {
    id: string,
    nome: string,
    cpf: string,
    endereco: string,
    created_at: FirebaseFirestoreTypes.FieldValue
}

export type {
    IClientes
};