import { View, Text, StyleSheet, TextInput, TouchableOpacity,FlatList } from "react-native";
import React, {useState} from "react";
import { FontAwesome } from '@expo/vector-icons';


import Tarefa from "./src/Tarefa";

export default function App() {
  const [tarefa, setTarefa] = useState('');

  const [list, setList] = useState([])


  function handleAdd(){
    if(tarefa === ''){
      return;
    }
    // Criando um objeto para ser usado no useState
    let dados = {
      key: Date.now(),
      item: tarefa
    }
  
    // Adicionando a nova tarefa à lista
    setList(oldArray => [dados, ...oldArray]);
  
    // Limpando o campo de entrada
    setTarefa('');
  }
  

  function handleDelete(item){
    //retornando todas as tarefas que são diferentes da que eu cliquei, retirando a que eu cliquei e esse retorno vai 
    //para a variavel filtroItem
    //coloco ela no useState
    let filtroItem = list.filter((tarefa) => {
      return (tarefa.item !== item)
    })

    setList(filtroItem);

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <View style={styles.containerInput}>
        <TextInput placeholder="digite sua tarefa" style={styles.input} value={tarefa} onChangeText={(text) => setTarefa(text)}>

        </TextInput>

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <FontAwesome name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
      <FlatList style={styles.list} data={list} keyExtractor={(item) => item.key} renderItem={({ item }) => <Tarefa data={item} deleteItem={() => handleDelete(item.item)} />} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22272e',
    paddingTop: 28,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: "#FFF",
    marginTop: '5%',
    paddingStart: '5%',
    marginBottom: 12
  },
  containerInput: {
    flexDirection: 'row',
    width:'100%',
    height:44,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:22,
    
    
  },
  input:{
    width:'75%',
    backgroundColor:"#FBFBFB",
    height:44,
    borderRadius:4,
    paddingHorizontal:8,

  },
  buttonAdd:{
    width:'15%',
    height:44,
    backgroundColor:'#73f7ff',
    marginLeft:8,
    alignItems:'center',
    justifyContent:'center', 
    borderRadius:4
  },
  list:{
    flex:1,
    backgroundColor:'#FFF',
    paddingStart:'4%',
    paddingEnd:'4%',
    backgroundColor:'white'
  }
});
