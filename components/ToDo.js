import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class ToDo extends Component {
  render() {
    const { item } = this.props
    const iconName = item.completed ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"
    return(
      <TouchableOpacity style={styles.task} onPress={() => this.props.onToggle(item.id)}>
        <Ionicons style={styles.icon} name={iconName} size={24} color="deepskyblue"/>
        <Text>{item.title}</Text>
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