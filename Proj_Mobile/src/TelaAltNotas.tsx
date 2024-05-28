import { useEffect, useState } from "react";
import Carregamento from "./Carregamento";
import firestore from '@react-native-firebase/firestore'
import {AltNotaProps} from "../navigation/HomeNavigator";
import { INotas } from "./INotas";

const TelaAltNota = ({navigation, route}: AltNotaProps) => {
    const [id,] = useState(route.params.id);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function carregar() {
        setIsCarregando(true);
        const resultado = await firestore()
        .collection('notas')
        .doc(id)
        .get();

        const nota = {
            id: resultado.id,
            ...resultado.data()
        } as INotas;

        setTitulo(nota.titulo);
        setDescricao(nota.descricao);
        setIsCarregando(false);

    };

    useEffect(() => {
        carregar();
    }, [])

    function alterar(){
        setIsCarregando(true)

        firestore()
            .collection('notas')
            .doc(id)
            .update({
                titulo,
                descricao,
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                
            })
    }
} 