import React, { Component } from 'react';
import {  FlatList, StyleSheet, View, ActivityIndicator, Button, AsyncStorage } from 'react-native';

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
    this.props.navigation.setParams({ onAddTask: this._createTask })
  }

  _createTask = task => {
    //console.log(task)
    const listOfTasks2 = [...this.state.listOfTasks]
    //push l'equivalente di append
    task.id = this.state.lastId+1;
    listOfTasks2.push(task);
    this.setState({
      listOfTasks: listOfTasks2,
      lastId: (this.state.lastId+1)
    });
    AsyncStorage.setItem('todolist', JSON.stringify(this.state.listOfTasks));
    AsyncStorage.setItem('lastid', task.id)
  }

  //cosa fare dopo che il componente in cui siamo viene caricato
  componentDidMount() {
    AsyncStorage.getItem('lastid').then(response => this.setState({
      lastId: response ? JSON.parse(response) : 0
    }))
    AsyncStorage.getItem('todolist').then(response => this.setState({
      listOfTasks: response ? JSON.parse(response) : [],
      loading: false
    }))

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

  _takeTasks() {
    try {
      const tasks = require("../data/tasks.json");
      //la map trasforma l'array di oggetti in un array di interi (id)
      const lastId = Math.max(...tasks.map(t => t.id));
      //console.log(lastId);
      this.setState({
        listOfTasks: tasks,
        loading: false,
        lastId: lastId
      })
    }
    catch (err){
      console.log("something went wrong!");
      console.error(err);
    }
  }

  _goToAddTask = () => {
    console.log("pressed +");
  }

  _renderTask = ({item}) => {
    //console.log(item)
    return(
        <ToDo item={item} onToggle={this._toggleTask}/>
    )
  }

  _toggleTask = (id) => {
    //Copia/spread dell'array listOfTask in modo tale da averlo fuori da state
    const listOfTasks2 =  [...this.state.listOfTasks];
    //L'arrow function è necessaria perché lui non sa quale proprietà deve essere uguale a id
    index = listOfTasks2.findIndex(t => t.id == id);
    listOfTasks2[index].completed = !listOfTasks2[index].completed;
    this.setState({
        listOfTasks: listOfTasks2
    });
    AsyncStorage.setItem('todolist', JSON.stringify(this.state.listOfTasks));
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