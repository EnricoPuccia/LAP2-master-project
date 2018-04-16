import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';

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
      <View style = {this.styles.container}>
          <Text style = {{color: 'white'}}>{this.props.title}</Text>
      </View>
    );
  }
}




