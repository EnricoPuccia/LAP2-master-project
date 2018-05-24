import React, { Component } from 'react';
import {  View, TextInput, Text, StyleSheet, Switch } from 'react-native';

export default class AddToDo extends Component {
  state = {
    title: '',
    remindMe: false,
  }
  
  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          /* Non c'è bisogno di "title: title" perché si chiamano allo stesso modo  */
          onChangeText={(title) => this.setState({title})}
          placeholder='name of task'
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
      done: false
    }
    this.props.navigation.state.params.onAdd(item)
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
