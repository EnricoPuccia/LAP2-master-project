import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default class ToDo extends Component {
  render() {
    const { item } = this.props
    const iconName = item.done ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"
    return(
      <TouchableOpacity style={styles.task} onPress={() => this.props.onToggle(item.id)}>
        <Ionicons style={styles.icon} name={iconName} size={24} color="deepskyblue"/>
        <Text>{item.title}</Text>
        <TouchableHighlight onPress={() => this.props.onEdit(item)}>
          <MaterialIcons name="chevron-right" size={24} color="black" /> 
        </TouchableHighlight>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
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
})