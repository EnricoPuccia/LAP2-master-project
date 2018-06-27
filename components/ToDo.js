import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default class ToDo extends Component {
  render() {
    const { item } = this.props
    const iconName = item.done ? "check-box" : "check-box-outline-blank"
    return(
      <TouchableOpacity style={styles.task} onPress={() => this.props.onToggle(item.key)}>
        <MaterialIcons style={styles.icon} name={iconName} size={24} color="#f4511e"/>
        <Text>{item.title}</Text>
        <TouchableHighlight onPress={() => this.props.onEdit(item)}>
          <MaterialIcons style={styles.icon} name="chevron-right" size={20} color="black" /> 
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