import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';

type Animal = {
    nome: String,
    especie: String,
}

let listaAnimais = [] as Animal[];

let animal1 = {nome: 'Princesa Pipoca', especie: 'Gato' } as Animal;
let animal2 = {nome: 'Juarez', especie: 'Tartaruga'} as Animal;
let animal3 = {nome: 'Jeffersson Caminhões', especie: 'Tatu'} as Animal;
let animal4 = {nome: 'Ricardo', especie: 'Coelho'} as Animal;
let animal5 = {nome: 'Anaíz', especie: 'Coelha'} as Animal;

listaAnimais.push(animal1);
listaAnimais.push(animal2);
listaAnimais.push(animal3);
listaAnimais.push(animal4);
listaAnimais.push(animal5);

const lista = [
    { descricao: 'Cachorro'},
    { descricao: 'Gato'},
    { descricao: 'Galinha'},
    { descricao: 'Papagaio'},
    { descricao: 'Cachorro'}
];

type ItemProps ={
    animal: Animal
}

const ItemLista = (props: ItemProps) => {
    return(
        <View>
            <Text style={styles.item2}>
                {props.animal.especie + ' '+ props.animal.nome}
            </Text>
        </View>
    );
}

const ListaFlat = () => {
    return (
        <FlatList 
            data={listaAnimais} 
            renderItem={({item}) => <ItemLista animal={item}></ItemLista>}/> 
    )
     
}

export default ListaFlat;

const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    item2: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
  });