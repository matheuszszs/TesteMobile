import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type IAtendimento = {
    id: string,
    nome: string,
    cpf: string,
    data: string,
    hora: string,
    descricao: string,
    created_at: FirebaseFirestoreTypes.FieldValue
}

export type {
    IAtendimento
};