import React, { Component } from 'react';
import {  View, TextInput, Text, StyleSheet, Switch } from 'react-native';

export default class AddToDo extends Component {
  constructor(props){
    super(props)
    const { params } = this.props.navigation.state
    console.log(params);
    
    this.state={ 
      title: params.task.title,
      remindMe: params.task.remindMe || false,
      id: params.task.id,
      done: params.task.done,
      key: params.task.key
    }
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          /* Non c'è bisogno di "title: title" perché si chiamano allo stesso modo  */
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder='new name of task'
          onSubmitEditing={this._save}
        />
        <View style={styles.rowSwitch}>
          <Text>Remind me</Text>
          <Switch value={this.state.remindMe} onValueChange={(remindMe) => this.setState({remindMe})}/>
        </View>
      </View>
    );
  }

  _save = () => {
    const item = {
      title: this.state.title,
      remindMe: this.state.remindMe,
      done: this.state.done,
      id: this.state.id,
      key: this.state.key
    }
    this.props.navigation.state.params.onEdit(item)
    this.props.navigation.goBack()
  }
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 10,
  },
  rowSwitch: {
    flexDirection: 'row',
  }
})
