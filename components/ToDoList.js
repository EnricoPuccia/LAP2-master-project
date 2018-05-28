import React, { Component } from 'react';
import {  FlatList, StyleSheet, View, ActivityIndicator, Button, AsyncStorage } from 'react-native';

import * as firebase from 'firebase';

import ToDo from './ToDo'

export default class ToDoList extends Component {
  /* Nelle funzioni statiche il this non esiste, pertanto
  usiamo i parametri all'interno di navigation */
  static navigationOptions = ({navigation}) => {
    /* Il giusto ordine di renderizzazione è prima ToDoList e dopo navigationOptions. Ciò 
    però non è garantito e, pertanto, per evitare un params=undefined si inserisce "|| {}" */
    const params = navigation.state.params || {}
    /* Siamo costretti a utilizzare i parametri presenti in navigation perché, non essendoci 
    il this, è l'unico modo per accedere alle funzioni e alle proprietà (oggetti) di ToDoList */
    
    return ({
      title: 'To-Do list',
      //headerTitle: <TitleComponent/>, 
      headerTintColor: 'deepskyblue',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <Button 
          onPress = {() => 
            {
              navigation.navigate('AddToDo', {onAdd: params.onAddTask})
            }
          } 
          title='+' />
      )
    })
  }

  componentWillMount() {
    /* Aggiungiamo il parametro onAddTast il cui unico scopo è richiamare createTask  */
    this.props.navigation.setParams({ onAddTask: this._createTask });
  }

  //cosa fare dopo che il componente in cui siamo viene caricato
  componentDidMount() {
    // .ref permette di spostarsi sull'oggetto passatogli come argomento
    const todolistRef = firebase.database().ref('todolist');
    
    // .on + 'value' fa si che la funzione scritta dopo parta al cambiare di un qualcosa nella todolist nel database
    todolistRef.on('value', snap =>{
      // Firebase accetta soltanto oggeti, ma noi vogliamo una lista in quanto più logico
      let list = [];
      snap.forEach(child => {
        list.push({...child.val(), key: child.key});
      });
      //console.log(list);
      const lastId = list[list.length-1].id + 1;
      this.setState({
        listOfTasks: list,
        lastId,
        loading: false
      });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      listOfTasks: [],
      loading: true,
    }
    this._createTask.bind(this)
  }

  render() {
    const {listOfTasks, loading} = this.state;
    return (
      <View style={styles.container}>
        {
          loading === true ? <ActivityIndicator/> : 
          <FlatList
            data={listOfTasks}
            renderItem= {this._renderTask}
            keyExtractor={(item, index) => String(index)}
            ItemSeparatorComponent={this._renderSeparator}
          />
        }
      </View>
    
    );
  }
  _createTask = task => {
    task.id = this.state.lastId + 1;
    firebase.database().ref('todolist').push(task);
  }

  _renderTask = ({item}) => {
    //console.log(item)
    return(
        <ToDo item={item} onToggle={this._toggleTask} onEdit={ () => {
          this.props.navigation.navigate('EditToDo', {onEdit: this._edit, task:item})
        }}/>
    )
  }

  _edit = task => {
    /*//Copia/spread dell'array listOfTask in modo tale da averlo fuori da state
    const listOfTasks2 =  [...this.state.listOfTasks];
    //L'arrow function è necessaria perché lui non sa quale proprietà deve essere uguale a id
    const index = listOfTasks2.findIndex(t => t.id == task.id);
    listOfTasks2[index] = task;
    this.setState({
        listOfTasks: listOfTasks2
    });
    AsyncStorage.setItem('todolist', JSON.stringify(this.state.listOfTasks));*/
    
    let updates = {}
    // updates è vuoto ma in js quando si fa riferimento a una proprietà non esistente essa viene creata
    updates[task.key] = task
    firebase.database().ref('todolist').update(updates)
  }

  _toggleTask = (key) => {
    // filter restituisce una lista perché più elementi potrebbero soddisfare la condizione
    // noi sappiamo che ne verrà restituito uno solo e pertanto mettiamo [0]
    let updatedTask = this.state.listOfTasks.filter(el => el.key === key)[0];
    updatedTask.done = !updatedTask.done;
    console.log(updatedTask);
    let updates = {};
    updates[key] = updatedTask;
    console.log(updates);
    firebase.database().ref('todolist').update(updates);
  }    
  _renderSeparator() {
    return(
        <View style={styles.separator}/>
    )
  }                                                   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        //marginTop: 24,
        backgroundColor: 'white',
    },    
    text: {
        width: '85%'
    },
    separator: {
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        height: 0.5,
        //padding: 18,
        backgroundColor: "#1f82ad"
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        justifyContent: 'space-around',
    },
})