import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';

export default class ResultView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>{this.props.result}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        //flex: 2,
        paddingTop: 20,
        height: 200,
    },
    resultText: {
        color: 'white',
        fontSize: 50,
    }
});