import React, { Component } from 'react';
import {  FlatList, StyleSheet, View } from 'react-native';

import ToDo from './ToDo'

export default class ToDoList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          listOfTasks: this.props.data
      }
  }
  render() {
    const { listOfTasks } = this.state
    return (
        <FlatList
            data={listOfTasks}
            renderItem= {this._renderTask}
            keyExtractor={task => task.id.toString()}
            ItemSeparatorComponent={this._renderSeparator}
        />
    );
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
        index = listOfTasks2.findIndex(t => t.id === id);
        listOfTasks2[index].completed = !listOfTasks2[index].completed;
        this.setState({
            listOfTasks: listOfTasks2
        });
    }    
    _renderSeparator() {
        return(
          <View style={styles.separator}/>
        )
      }
                                                      
}

const styles = StyleSheet.create({
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