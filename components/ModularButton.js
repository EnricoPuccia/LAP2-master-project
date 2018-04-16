import React, { Component } from 'react';
import {  View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class ModularButton extends Component {
    
  styles = StyleSheet.create({
      container: {
          backgroundColor: this.props.background,
          flex: this.props.flexGrow,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'darkgrey',
          borderWidth: 1,
        }
    }); 
  render() {
    return (
      <TouchableOpacity 
        style = {this.styles.container}
        // Non può chiamarsi whenOnPress perchè qui usiamo la proprietà già esistente
        onPress = {()=>this.props.whenOnPress(this.props.title)}
      >
        <Text style = {{color: 'white'}}> {this.props.title} </Text>
      </TouchableOpacity>
    );
  }
}




