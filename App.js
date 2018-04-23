import React from 'react';
import { StyleSheet, Text, Image, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfTasks: [],
      loading: true
    }
    /* Alternativaente a rendere renderTask una arrow function:
    this.renderTask = this.renderTask.bind(this); */
  }

  componentDidMount() {
    this.takeTasks()
  }

  render() {
    const {listOfTasks, loading} = this.state;
    return (
      <View style={styles.container}>
        {
          loading === true ? <ActivityIndicator/> : 
            <FlatList
              data={listOfTasks}
              renderItem={this.renderTask}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={task=>task.id.toString()}
            />
  }
      </View>
    
    );
  }

  takeTasks() {
    try {
      const tasks = require("./data/tasks.json");
      this.setState({
        listOfTasks: tasks,
        loading: false
      })
    }
    catch (err){
      console.log("something went wrong!");
      console.error(err);
    }
  }

  /* DEVE CHIAMARSI OBBLIGATORIAMENTE ITEM  
    per capire effettuare il console.log più sotto  */
  renderTask = ({item}) => {
    //console.log(item)
    const iconName = item.completed ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"
    return(
      <TouchableOpacity style={styles.task} onPress={() => this.toggleTask(item.id)}>
        <Ionicons style={styles.icon} name={iconName} size={24} color="skyblue"/>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  toggleTask = (id) => {
    //Copia/spread dell'array listOfTask in modo tale da averlo fuori da state
    const listOfTasks2 =  [...this.state.listOfTasks];
    //L'arrow functin è necessaria perché lui non sa quale proprietà deve essere uguale a id
    index = listOfTasks2.findIndex(t => t.id === id);
    listOfTasks2[index].completed = !listOfTasks2[index].completed;
    this.setState({
      listOfTasks: listOfTasks2
    });
  }

  renderSeparator() {
    return(
      <View style={styles.separator}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 24,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    //padding: 10
  },
  icon: {
    paddingRight: 10,
    paddingLeft: 12
  },
  separator: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    height: 0.5,
    //padding: 18,
    backgroundColor: "#1f82ad"
  }
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