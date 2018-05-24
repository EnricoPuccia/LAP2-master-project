import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, FlatList, ActivityIndicator } from 'react-native';


import ToDoList from './components/ToDoList'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfTasks: [],
      loading: true,
    }
  }

  //cosa fare dopo che il componente in cui siamo viene caricato
  componentDidMount() {
    this._takeTasks()
  }

  render() {
    const {listOfTasks, loading} = this.state;
    return (
      <View style={styles.container}>
        {
          loading === true ? <ActivityIndicator/> : 
            <ToDoList data = {listOfTasks} />
        }
      </View>
    
    );
  }

  _takeTasks() {
    try {
      const tasks = require("./data/tasks.json");
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

  createTask = () => {
    const task = {
      title: this.state.newTask,
      completed: false,
      id: (this.state.lastId+1)
    };
    const listOfTasks2 = [...this.state.listOfTasks]
    //push l'equivalente di append
    listOfTasks2.push(task);
    this.setState({
      listOfTasks: listOfTasks2,
      lastId: (this.state.lastId+1)
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 24,
  },
});

//allignItems funzione per la direzione secondaria

/* Codice di un prova all'interno di render:
      <View style={styles.container}>
        {
          loading === true ?  <ActivityIndicator/> :
            listOfTasks.map(task => (
              <Text> {task.title} </Text>
            ))
  }
      </View>
*/